import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(140).required(),
  content: Joi.string().min(1).required(),
  tags: Joi.array().items(Joi.string().trim()).default([]),
  published: Joi.boolean().default(true),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(140),
  content: Joi.string().min(1),
  tags: Joi.array().items(Joi.string().trim()),
  published: Joi.boolean(),
}).min(1);

export const getPostByIdSchema = {
  schema: Joi.object({
    params: Joi.object({ id: Joi.string().hex().length(24).required() }),
  }),
};

export const listPostsSchema = {
  schema: Joi.object({
    query: Joi.object({
      q: Joi.string().allow(""),
      tag: Joi.string(),
      author: Joi.string().hex().length(24),
      page: Joi.number().integer().min(1).default(1),
      limit: Joi.number().integer().min(1).max(100).default(10),
      sort: Joi.string().valid("new", "old", "title"),
    }),
  }),
};
