import express from "express";
import authors from "../data/authors.js";

const router = express.Router();

// todos los autores
router.get("/", (req, res) => {
  res.json(authors);
});

// un autor por ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const author = authors.find((author) => author.id === id);

  if (!author) {
    return res.status(404).json({
      message: "Author not found",
    });
  }

  res.json(author);
});

// Crear un autor
router.post("/", (req, res) => {
  const { name, email, bio } = req.body;

  const newAuthor = {
    id: authors.length + 1,
    name,
    email,
    bio,
  };

  authors.push(newAuthor);

  res.status(201).json(newAuthor);
});

// Actualizar un autor
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const author = authors.find((author) => author.id === id);

  if (!author) {
    return res.status(404).json({
      message: "Author not found",
    });
  }

  const { name, email, bio } = req.body;

  author.name = name;
  author.email = email;
  author.bio = bio;

  res.json(author);
});

// Eliminar un autor
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = authors.findIndex((author) => author.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Author not found",
    });
  }

  authors.splice(index, 1);

  res.status(204).send();
});

export default router;
