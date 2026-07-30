import express from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../services/authors.js";

const router = express.Router();

// Obtener todos los autores
router.get("/", async (req, res) => {
  const authors = await getAllAuthors();

  res.json(authors);
});

// Obtener un autor por ID
router.get("/:id", async (req, res) => {
  const author = await getAuthorById(req.params.id);

  if (!author) {
    return res.status(404).json({
      message: "Author not found",
    });
  }

  res.json(author);
});

// Crear un autor
router.post("/", async (req, res) => {
  const author = await createAuthor(req.body);

  res.status(201).json(author);
});

// Actualizar un autor
router.put("/:id", async (req, res) => {
  const author = await updateAuthor(req.params.id, req.body);

  if (!author) {
    return res.status(404).json({
      message: "Author not found",
    });
  }

  res.json(author);
});

// Eliminar un autor
router.delete("/:id", async (req, res) => {
  const author = await deleteAuthor(req.params.id);

  if (!author) {
    return res.status(404).json({
      message: "Author not found",
    });
  }

  res.status(204).send();
});

export default router;
