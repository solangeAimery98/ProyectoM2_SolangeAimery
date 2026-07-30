const validatePost = (req, res, next) => {
  const { title, content, author_id } = req.body;

  if (!title || !content || !author_id) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  next();
};

export default validatePost;
