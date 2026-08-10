import express from "express";
import {
  getAuthorsController,
  getAuthorByIdController,
  createAuthorController,
  updateAuthorController,
  deleteAuthorController,
} from "../controllers/authorsController.js";

import validateAuthor from "../middlewares/validateAuthor.js";

const router = express.Router();

// Get all authors
router.get("/", getAuthorsController);

// Get author by id
router.get("/:id", getAuthorByIdController);

// Create author
router.post("/", validateAuthor, createAuthorController);

// Update author
router.put("/:id", validateAuthor, updateAuthorController);

// Delete author
router.delete("/:id", deleteAuthorController);

export default router;
