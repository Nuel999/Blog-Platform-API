// src/routes/postRoutes.js
import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { authenticate, admin } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js"; // Joi validator
import {
  createPostSchema,
  updatePostSchema,
} from "../validation/postValidation.js";

const router = express.Router();

// Create post (protected)
router.post("/", authenticate,  validate(createPostSchema), createPost);

// Get all posts (public)
router.get("/", getPosts);

// Get single post by ID (public)
router.get("/:id", getPostById);

// Update post (protected - only owner or admin)
router.put(
  "/:id",
  authenticate,
  validate(updatePostSchema),
  updatePost
);

// Delete post (protected - only owner or admin)
router.delete("/:id", authenticate, admin, deletePost);

export default router;
