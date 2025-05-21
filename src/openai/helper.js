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

  const tableInfo = `Tables: ${data.tables.join(
    ", "
  )} | Columns: ${data.columns.join(", ")}`;

  const prompt = `You are a MySQL expert. Given a natural language question, write a syntactically correct SQL query. Only return the SQL code and nothing else.
Question: ${question}
This is the database structure: ${tableInfo}
Write the correct SQL command:`;

  console.log("Prompt:", prompt);

  const response = await together.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content.trim();
}

export default generateSQL;