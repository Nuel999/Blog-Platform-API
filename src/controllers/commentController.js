import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import {ErrorResponse} from "../utils/errorResponse.js"

// @desc    Create a comment on a post
// @route   POST /api/comments/:postId
// @access  Private
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentCommentId } = req.body; // request from body
    if (!postId) {
      return res.status(404).json({ message: "PostId is required" });
    } // check if post exits
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let parentComment = null;
    if (parentCommentId) {
      parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }
    }

    const comment = await Comment.create({
      post: postId,
      content,
      author: req.user.id,
      parentComment: parentComment ? parentComment._id : null, 
    });

    res.status(201).json({
      success: true,
      message: "Comment Created successful",
      data: comment,
    });
  } catch (err) {
    next(new ErrorResponse(err.message, 500));
};
};

// @desc    Get all comments for a post
// @route   GET /api/comments/:postId
// @access  Public
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "username email")
      .populate("parentComment", "content")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Comments retrieved successfully",
      count: comments.length,
      data: comments,
    });
  } catch (err) {
    next(new ErrorResponse(err.message, 500));
};
};

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({ message: "Not authorized" });
    }

    comment.content = req.body.content || comment.content;
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  } catch (error) {
    next(new ErrorResponse(err.message, 500));
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({ message: "Not authorized" });
    }

    await comment.deleteOne();

    res.status(200).json({       success: true,
      message: "Comment deleted successfully" });
  } catch (error) {
        next(new ErrorResponse(err.message, 500));
  }
};
