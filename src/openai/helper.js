import { Together } from "together-ai";
import dotenv from "dotenv";
dotenv.config();

const together = new Together();

export async function generateSQL(question) {
  const data = {
    tables: ["products"],
    columns: [
      "Product_ID",
      "Product_Name",
      "Category",
      "Stock_Qty",
      "Unit_Price",
      "Warehouse",
      "Supplier_Name",
      "Last_updated",
    ],
  };

  const prompt = `You are a MySQL expert. Given a natural language question, write a syntactically correct SQL query. Only return the SQL code and nothing else.

Use the following database structure:
Tables: ${data.tables.join(", ")}
Columns: ${data.columns.join(", ")}

IMPORTANT:
- When the question is about a product name, or asks for products similar to a name or keyword (e.g., "laptop", "keyboard", etc.), you MUST use the SQL LIKE operator with wildcards.
- NEVER use = for Product_Name. Always use: WHERE Product_Name LIKE '%<keyword>%'
- Do NOT match exact values. Always do partial matching with LIKE and wildcards.

Question: ${question}
Write ONLY the correct SQL query with LIKE if product names are mentioned:`;

  const response = await together.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content.trim();
}

export async function generateAnswerFromResult(question, sqlResult) {
  const prompt = `
You are a concise assistant. Based on the user's question and the SQL result, provide a **brief, direct answer**.

Keep it short and to the point. Do not include any additional phrases like "Based on the SQL query" or "Is there anything else I can help you with?"

Question:
${question}

SQL Result (as JSON):
${JSON.stringify(sqlResult, null, 2)}

Answer (keep it very short and clear):
`;


  const response = await together.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content.trim();
}
