const validateAuthor = (req, res, next) => {
  const { name, email, bio } = req.body;

  if (!name || !email || !bio) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  next();
};

export default validateAuthor;
