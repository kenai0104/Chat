import express from "express";
import { generateSQL, generateAnswerFromResult } from "../openai/helper.js";
import db from "../config/db.js";

const router = express.Router();

router.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Question is required and must be a string." });
  }

  try {
    const sqlQuery = await generateSQL(question);


    const [queryResult] = await db.query(sqlQuery);

    const finalAnswer = await generateAnswerFromResult(question, queryResult);

    return res.json({ result: finalAnswer });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "An error occurred while processing your query." });
  }
});

export default router;