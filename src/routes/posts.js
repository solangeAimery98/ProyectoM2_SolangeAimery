import express from "express";
import posts from "../data/posts.js";

const router = express.Router();

// Obtener todos los posts
router.get("/", (req, res) => {
  res.json(posts);
});

// Obtener un post por ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.json(post);
});

// Crear un post
router.post("/", (req, res) => {
  const { title, content, author_id } = req.body;

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author_id,
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

// Actualizar un post
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const { title, content, author_id } = req.body;

  post.title = title;
  post.content = content;
  post.author_id = author_id;

  res.json(post);
});

// Eliminar un post
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  posts.splice(index, 1);

  res.status(204).send();
});

export default router;
