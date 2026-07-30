import express from "express";
import authorsRouter from "./routes/authors.js";
import postsRouter from "./routes/posts.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API MiniBlog funcionando");
});

app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);

export default app;
