import { Together } from "together-ai";
import dotenv from "dotenv";
dotenv.config();

const together = new Together();

async function generateSQL(question) {
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

  const table = data.tables.join(", ");
  const columns = data.columns.join(", ");

const prompt = `You are an expert in SQL. Based on the user's natural language question and the provided database schema, generate the most relevant SQL query. 
Your job is to understand the user's intent, map it to the correct columns, and write a clean and efficient SQL query.

Schema:
Table: ${table}
Columns: ${columns}

Guidelines:
- Do NOT use SELECT * unless the user explicitly says "all details", "everything", or "all data".
- If the question refers to specific data, include only that column in the SELECT clause (e.g., use Product_Name when asking about products).
- If the question asks for a list of unique entities like:
  • "suppliers" → return DISTINCT Supplier_Name  
  • "categories" → return DISTINCT Category  
  • "warehouses" → return DISTINCT Warehouse  
- If the input includes a **location, keyword, or descriptive term** (e.g., "central", "wireless", "north", "printer"), then:
  → ALWAYS use LIKE '%keyword%' on the matching text column (such as Warehouse, Product_Name, Category, or Supplier_Name).
  → NEVER use '=' for partial keywords or vague references. Only use '=' if the user provides an exact value like "Warehouse = 'WH-East'".
- Use '<', '>', or '=' only for numeric comparisons or fully specific values.
- Do not include explanations, assumptions, or comments — return only valid, clean MySQL syntax.

User Question: ${question}`;






  console.log("Prompt:", prompt);

  const response = await together.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content.trim();
}

export default generateSQL;
