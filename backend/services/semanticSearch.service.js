import Post from "../models/Post.js";
import { generateEmbedding } from "./embedding.service.js";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";

export const semanticSearch = async (searchText, category) => {
  // If search box is empty, return all posts
  if (!searchText.trim()) {
  const posts = await Post.find({ category }).populate("user", "name email");

  return posts.map((post) => ({
    post,
    similarity: null,
  }));
}

  // Generate embedding for search query
  const searchEmbedding = await generateEmbedding(searchText);

  // Get all posts of the selected category
  const regex = new RegExp(searchText, "i");

// Exact matches
const exactMatches = await Post.find({
  category,
  $or: [
    { title: regex },
    { description: regex }
  ],
}).populate("user", "name email");

// Semantic search
const posts = await Post.find({ category }).populate("user", "name email");

const semanticResults = [];

for (const post of posts) {
  if (!post.embedding || post.embedding.length === 0) continue;

  const similarity = cosineSimilarity(searchEmbedding, post.embedding);

 if (similarity >= 0.60) {
  semanticResults.push({
    post,
    similarity,
  });
}
}

semanticResults.sort((a, b) => b.similarity - a.similarity);

const seen = new Set();
const finalResults = [];

// Exact matches
for (const post of exactMatches) {
  seen.add(post._id.toString());

  finalResults.push({
    post,
    similarity: 1.0, // 100% because it's an exact keyword match
  });
}

// Semantic matches
for (const item of semanticResults) {
  if (!seen.has(item.post._id.toString())) {
    finalResults.push({
      post: item.post,
      similarity: item.similarity,
    });
  }
}

return finalResults;
};