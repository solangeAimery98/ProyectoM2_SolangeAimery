import { describe, test, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import pool from "../src/config/db.js";

beforeEach(async () => {
  await pool.query("TRUNCATE posts, authors RESTART IDENTITY CASCADE");

  await pool.query(`
    INSERT INTO authors (name, email, bio)
    VALUES
      ('Ana García', 'ana@example.com', 'Desarrolladora Full Stack'),
      ('Carlos Ruiz', 'carlos@example.com', 'Escritor Técnico');

  `);

  await pool.query(`
    INSERT INTO posts (title, content, author_id)
    VALUES
      ('Primer Post', 'Contenido del primer post', 1),
      ('Segundo Post', 'Contenido del segundo post', 2);

  `);
});

afterAll(async () => {
  await pool.end();
});

describe("GET /posts", () => {
  test("debe devolver todos los posts", async () => {
    const response = await request(app).get("/posts");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0]).toHaveProperty("content");
    expect(response.body[0]).toHaveProperty("author_id");
  });
});

describe("GET /posts/:id", () => {
  test("debe devolver un post existente", async () => {
    const response = await request(app).get("/posts/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("title", "Primer Post");
    expect(response.body).toHaveProperty("content");
    expect(response.body).toHaveProperty("author_id", 1);
  });

  test("debe devolver 404 si el post no existe", async () => {
    const response = await request(app).get("/posts/999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Post not found");
  });
});

describe("GET /posts/author/:authorId", () => {
  test("debe devolver los posts de un autor", async () => {
    const response = await request(app).get("/posts/author/1");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("author_id", 1);
  });

  test("debe devolver un arreglo vacío si el autor no tiene posts", async () => {
    await pool.query(`

      INSERT INTO authors (name, email, bio)
      VALUES ('Pedro Gómez', 'pedro@example.com', 'Backend Developer');

    `);

    const response = await request(app).get("/posts/author/3");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("POST /posts", () => {
  test("debe crear un nuevo post", async () => {
    const newPost = {
      title: "Nuevo Post",
      content: "Contenido del nuevo post",
      author_id: 1,
    };

    const response = await request(app).post("/posts").send(newPost);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title", newPost.title);
    expect(response.body).toHaveProperty("content", newPost.content);
    expect(response.body).toHaveProperty("author_id", newPost.author_id);
  });

  test("debe devolver 400 si falta un campo obligatorio", async () => {
    const response = await request(app).post("/posts").send({
      title: "Nuevo Post",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "All fields are required");
  });
});

describe("PUT /posts/:id", () => {
  test("debe actualizar un post existente", async () => {
    const updatedPost = {
      title: "Post Actualizado",
      content: "Contenido actualizado",
      author_id: 2,
    };

    const response = await request(app).put("/posts/1").send(updatedPost);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("title", updatedPost.title);
    expect(response.body).toHaveProperty("content", updatedPost.content);
    expect(response.body).toHaveProperty("author_id", updatedPost.author_id);
  });

  test("debe devolver 404 si el post no existe", async () => {
    const response = await request(app).put("/posts/999").send({
      title: "Post",
      content: "Contenido",
      author_id: 1,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Post not found");
  });
});

describe("DELETE /posts/:id", () => {
  test("debe eliminar un post existente", async () => {
    const response = await request(app).delete("/posts/1");
    expect(response.statusCode).toBe(204);
  });

  test("debe devolver 404 si el post no existe", async () => {
    const response = await request(app).delete("/posts/999");
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Post not found");
  });
});
