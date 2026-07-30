import express from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../services/authors.js";
import validateAuthor from "../middlewares/validateAuthor.js";

const router = express.Router();

// Obtener todos los autores
router.get("/", async (req, res, next) => {
  try {
    const authors = await getAllAuthors();

    res.json(authors);
  } catch (error) {
    next(error);
  }
});

// Obtener un autor por ID
router.get("/:id", async (req, res, next) => {
  try {
    const author = await getAuthorById(req.params.id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.json(author);
  } catch (error) {
    next(error);
  }
});

// Crear un autor
router.post("/", validateAuthor, async (req, res, next) => {
  try {
    const author = await createAuthor(req.body);

    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
});

// Actualizar un autor
router.put("/:id", validateAuthor, async (req, res, next) => {
  try {
    const author = await updateAuthor(req.params.id, req.body);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.json(author);
  } catch (error) {
    next(error);
  }
});

// Eliminar un autor
router.delete("/:id", async (req, res, next) => {
  try {
    const author = await deleteAuthor(req.params.id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
