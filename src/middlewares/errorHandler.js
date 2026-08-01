const errorHandler = (err, req, res, next) => {
  console.error(err);

  switch (err.code) {
    case "23505":
      return res.status(400).json({
        message: "Email already exists",
      });

    case "23503":
      return res.status(400).json({
        message: "Referenced author does not exist",
      });

    case "23502":
      return res.status(400).json({
        message: "Required fields are missing",
      });

    default:
      return res.status(500).json({
        message: "Internal server error",
      });
  }
};

export default errorHandler;
