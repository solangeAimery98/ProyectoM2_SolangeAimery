import express from "express";
import {
  getPostsController,
  getPostByIdController,
  getPostsByAuthorController,
  createPostController,
  updatePostController,
  deletePostController,
} from "../controllers/postsController.js";

import validatePost from "../middlewares/validatePost.js";

const router = express.Router();

// Get all post
router.get("/", getPostsController);

// get post by author
router.get("/author/:authorId", getPostsByAuthorController);

// get post by id
router.get("/:id", getPostByIdController);

// create a post
router.post("/", validatePost, createPostController);

// update a post
router.put("/:id", validatePost, updatePostController);

// delete a post
router.delete("/:id", deletePostController);

export default router;
