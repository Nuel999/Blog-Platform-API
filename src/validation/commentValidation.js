// src/validation/commentValidation.js
import Joi from "joi";

// Validation schema for creating a new comment
export const createCommentSchema = Joi.object({
  content: Joi.string().min(1).max(500).required().messages({
    "string.base": "Comment must be text",
    "string.empty": "Comment cannot be empty",
    "string.min": "Comment must be at least 1 character long",
    "string.max": "Comment cannot exceed 500 characters",
    "any.required": "Comment content is required",
  }),
  parentCommentId: Joi.string().optional().allow(null).messages({
    "string.base": "Parent Comment ID must be a string",
  }),
});

// Validation schema for updating a comment
export const updateCommentSchema = Joi.object({
  content: Joi.string().min(1).max(500).required().messages({
    "string.base": "Comment must be text",
    "string.empty": "Comment cannot be empty",
    "string.min": "Comment must be at least 1 character long",
    "string.max": "Comment cannot exceed 500 characters",
    "any.required": "Updated comment content is required",
  }),
});
