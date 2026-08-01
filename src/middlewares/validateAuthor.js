const validateAuthor = (req, res, next) => {
  const { name, email, bio } = req.body;

  // Campos obligatorios
  if (!name || !email || !bio) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Campos vacíos
  if (name.trim() === "" || email.trim() === "" || bio.trim() === "") {
    return res.status(400).json({
      message: "Fields cannot be empty",
    });
  }

  // Validar formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  next();
};

export default validateAuthor;
