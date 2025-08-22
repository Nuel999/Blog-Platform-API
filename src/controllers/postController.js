// controllers/postController.js
import Post from "../models/Post.js";
import { ErrorResponse } from "../utils/errorResponse.js";

// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body; // get title and content from request body

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    } // validate title and content

    const post = await Post.create({
      title,
      content,
      author: req.user.id, // comes from auth middleware
    }); // create new post with author from authenticated user

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(new ErrorResponse(err.message, 500));
};
};
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email"); // populate author details
    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(new ErrorResponse(err.message, 500));
  }
}; // get all posts with author details

// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email"
    ); // populate author details

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } // check if post exits

    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    next(new ErrorResponse(err.message, 500));
  } // get single post by ID with author details
};

// @route   PUT /api/posts/:id
// @access  Private (only author)
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // find post by ID

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } // check is post exits

    // only author can update
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    } // check if authenticated user is the author

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); // update post with new data and return updated post

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    next(new ErrorResponse(err.message, 500));
  }
}; // update post by ID with new data and return updated post

// @route   DELETE /api/posts/:id
// @access  Private (only author)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // Find post by ID

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } // check if post exits

    // only author can delete
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    } // check if authenticated user is the author

    await post.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    next(new ErrorResponse(err.message, 500));
  } // delete post by ID and return success message
};
