import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

export const generateEmbedding = async (text) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  return response.embeddings[0].values;
};