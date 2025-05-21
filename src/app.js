import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes/askRoutes.js";
import db from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.query("SELECT 1");
    console.log("✅ Connected to the database successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    process.exit(1); 
  }
}

startServer();
