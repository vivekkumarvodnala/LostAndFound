import dotenv from "dotenv";
dotenv.config();

console.log("API Key:", process.env.GEMINI_API_KEY);
import { generateEmbedding } from "./services/embedding.service.js";

const test = async () => {
  try {
    const embedding = await generateEmbedding(
      "Black leather wallet lost near library"
    );

    console.log("Embedding length:", embedding.length);
    console.log("First 10 values:", embedding.slice(0, 10));
  } catch (err) {
    console.error(err);
  }
};

test();