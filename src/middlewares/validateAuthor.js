const validateAuthor = (req, res, next) => {
  const { name, email, bio } = req.body;

  // required fields
  if (!name || !email || !bio) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // empty fields
  if (name.trim() === "" || email.trim() === "" || bio.trim() === "") {
    return res.status(400).json({
      message: "Fields cannot be empty",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  next();
};

export default validateAuthor;
