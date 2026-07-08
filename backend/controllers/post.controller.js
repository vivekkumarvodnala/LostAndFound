import Post from "../models/Post.js";
import path from "path";
import { semanticSearch } from "../services/semanticSearch.service.js";
import { generateEmbedding } from "../services/embedding.service.js";
import { findSimilarPosts } from "../services/matching.service.js";
export const createPost = async (req, res, next) => {
  try {
    const { title, description, category, location } = req.body;

    const text = `
      Title: ${title}
      Description: ${description}
      Location: ${location}
    `;

    const embedding = await generateEmbedding(text);
    const matches = await findSimilarPosts(embedding, category);

    const post = new Post({
      title,
      description,
      category,
      user: req.user.id,
      location,
      embedding,
    });

    if (req.file) {
      post.image = `/uploads/${req.file.filename}`;
    }

    const savedPost = await post.save();

    res.status(201).json({
  post: savedPost,
  matches,
});
  } catch (err) {
    next(err);
  }
};

// UPDATE POST (no Cloudinary)
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post || post.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Unauthorized or post not found");
    }

    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    post.location = req.body.location || post.location;
      post.category = req.body.category || post.category;

    if (req.file) {
      post.image = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};


// controllers/postController.js

export const getLostPosts = async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "";

    const posts = await semanticSearch(searchQuery, "lost");

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

export const getFoundPosts = async (req, res, next) => {
  try {
    const searchQuery = req.query.search || "";

    const posts = await semanticSearch(searchQuery, "found");

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};


// @desc    Get single post
export const getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", "name email phone");
    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post || post.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Unauthorized or post not found");
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("user", "name"); // 👈 This line is essential

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user posts" });
  }
};


