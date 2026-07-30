import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../services/posts.js";
import validatePost from "../middlewares/validatePost.js";

const router = express.Router();

// Obtener todos los posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await getAllPosts();

    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Obtener un post por ID
router.get("/:id", async (req, res, next) => {
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
});

// Crear un post
router.post("/", validatePost, async (req, res, next) => {
  try {
    const post = await createPost(req.body);

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

// Actualizar un post
router.put("/:id", validatePost, async (req, res, next) => {
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
});

// Eliminar un post
router.delete("/:id", async (req, res, next) => {
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
});

export default router;
