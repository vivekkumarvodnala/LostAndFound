import express from "express";
import {
  createPost,
  getLostPosts,
  getFoundPosts,
  getSinglePost,
  deletePost,
  updatePost,
  getUserPosts
} from "../controllers/post.controller.js";
import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

  router.post("/", protect, upload.single("image"), createPost);
  router.get("/lost", getLostPosts);
  router.get("/found", getFoundPosts);
    router.get("/user", protect, getUserPosts)
  router.get("/:id", getSinglePost);
  router.delete("/:id", protect, deletePost);
  router.put("/:id", protect, upload.single("image"), updatePost);


export default router;
