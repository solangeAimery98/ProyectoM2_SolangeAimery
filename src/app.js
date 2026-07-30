import express from "express";
import authorsRouter from "./routes/authors.js";
import postsRouter from "./routes/posts.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API MiniBlog funcionando");
});

app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);

app.use(errorHandler);

export default app;
