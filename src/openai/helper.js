import { Together } from "together-ai";
import dotenv from "dotenv";
dotenv.config();

const together = new Together();

async function generateSQL(question) {
  console.log("question", question);
  const prompt = `You are a MySQL expert. Given a natural language question, write a syntactically correct SQL query. Only return the SQL code and nothing else.
Question: ${question}
SQL:`;

  const response = await together.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    messages: [{ role: "user", content: prompt }],
  });
  console.log("question", question);

  return response.choices[0].message.content.trim();
}

export default generateSQL;
