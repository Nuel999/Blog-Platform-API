import express from "express";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { authenticate, admin } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import {
  createCommentSchema,
  updateCommentSchema,
} from "../validation/commentValidation.js";

const router = express.Router();

// Create a new comment (authenticated)
router.post(
  "/:postId",
  authenticate,
  validate(createCommentSchema),
  createComment
);

// Get all comments for a specific post (public)
router.get("/:postId", getCommentsByPost);

// Update a comment (authenticated & owner only)
router.put(
  "/:commentId",
  authenticate,
  validate(updateCommentSchema),
  updateComment
);

// Delete a comment (authenticated & owner only)
router.delete("/:commentId", authenticate, deleteComment);

export default router;
