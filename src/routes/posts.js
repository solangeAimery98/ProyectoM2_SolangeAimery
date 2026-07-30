import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../services/posts.js";

const router = express.Router();

// Obtener todos los posts
router.get("/", async (req, res) => {
  const posts = await getAllPosts();

  res.json(posts);
});

// Obtener un post por ID
router.get("/:id", async (req, res) => {
  const post = await getPostById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.json(post);
});

// Crear un post
router.post("/", async (req, res) => {
  const post = await createPost(req.body);

  res.status(201).json(post);
});

// Actualizar un post
router.put("/:id", async (req, res) => {
  const post = await updatePost(req.params.id, req.body);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.json(post);
});

// Eliminar un post
router.delete("/:id", async (req, res) => {
  const post = await deletePost(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.status(204).send();
});

export default router;
