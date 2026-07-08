import Post from "../models/Post.js";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";

export const findSimilarPosts = async (
  embedding,
  category,
  threshold = 0.6
) => {
  // Compare with opposite category
  const oppositeCategory = category === "lost" ? "found" : "lost";

  const posts = await Post.find({
    category: oppositeCategory,
  });

  const matches = [];

 for (const post of posts) {
  if (!post.embedding || post.embedding.length === 0) continue;

  const similarity = cosineSimilarity(embedding, post.embedding);


  if (similarity >= threshold) {

    matches.push({
      post,
      similarity,
    });
  }
}
  matches.sort((a, b) => b.similarity - a.similarity);

  return matches;
};