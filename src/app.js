import express from "express";
import authorsRouter from "./routes/authors.js";
import postsRouter from "./routes/posts.js";
import errorHandler from "./middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./openapi.yaml");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API MiniBlog funcionando");
});

app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
