import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    content: { type: String, required: [true, "Content is required"] },
    tags: [{ type: String, trim: true }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to user model
      required: true,
    },
    published: { type: Boolean, default: true },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const Post = mongoose.model("Post", postSchema);
export default Post;
