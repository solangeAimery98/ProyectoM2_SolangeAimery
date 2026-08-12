import {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost,
} from "../services/posts.js";

import { getAuthorById } from "../services/authors.js";

// GET ALL POST
export async function getPostsController(req, res, next) {
  try {
    const posts = await getAllPosts();

    res.json(posts);
  } catch (error) {
    next(error);
  }
}

// GET POST BY ID
export async function getPostByIdController(req, res, next) {
  try {
    const post = await getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
}

// Get a post by an author
export async function getPostsByAuthorController(req, res, next) {
  try {
    const author = await getAuthorById(req.params.authorId);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    const posts = await getPostsByAuthor(req.params.authorId);

    res.json(posts);
  } catch (error) {
    next(error);
  }
}

// Create a post
export async function createPostController(req, res, next) {
  try {
    const post = await createPost(req.body);

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
}

// Update post
export async function updatePostController(req, res, next) {
  try {
    const post = await updatePost(req.params.id, req.body);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
}

// Delete a post
export async function deletePostController(req, res, next) {
  try {
    const post = await deletePost(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
