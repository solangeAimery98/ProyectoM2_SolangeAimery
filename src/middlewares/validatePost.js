const validatePost = (req, res, next) => {
  const { title, content, author_id } = req.body;

  // Campos obligatorios
  if (!title || !content || !author_id) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Campos vacíos
  if (title.trim() === "" || content.trim() === "") {
    return res.status(400).json({
      message: "Fields cannot be empty",
    });
  }

  // author_id debe ser un número
  if (isNaN(author_id)) {
    return res.status(400).json({
      message: "Author ID must be a number",
    });
  }

  next();
};

export default validatePost;
