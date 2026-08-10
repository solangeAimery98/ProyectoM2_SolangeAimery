import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../services/authors.js";

// get all authors
export async function getAuthorsController(req, res, next) {
  try {
    const authors = await getAllAuthors();

    res.json(authors);
  } catch (error) {
    next(error);
  }
}

// get author by id
export async function getAuthorByIdController(req, res, next) {
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
}

// Create a author
export async function createAuthorController(req, res, next) {
  try {
    const author = await createAuthor(req.body);

    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
}

// update author
export async function updateAuthorController(req, res, next) {
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
}

// delete author
export async function deleteAuthorController(req, res, next) {
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
}
