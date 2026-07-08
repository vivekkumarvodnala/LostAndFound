import dotenv from "dotenv";
dotenv.config();

import { generateEmbedding } from "./services/embedding.service.js";

const test = async () => {
  try {
    const embedding = await generateEmbedding(
      "Black leather wallet lost near library"
    );

  } catch (err) {
    console.error(err);
  }
};

test();