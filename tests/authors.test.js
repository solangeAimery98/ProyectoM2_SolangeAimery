import { describe, test, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import pool from "../src/config/db.js";

beforeEach(async () => {
  // Limpiar la base de datos antes de cada test
  await pool.query("TRUNCATE posts, authors RESTART IDENTITY CASCADE");

  // Insertar autores de prueba
  await pool.query(`
    INSERT INTO authors (name, email, bio)
    VALUES
      ('Ana García', 'ana@example.com', 'Desarrolladora Full Stack'),
      ('Carlos Ruiz', 'carlos@example.com', 'Escritor Técnico'),
      ('Pedro Gómez', 'pedro@example.com', 'Backend Developer');
  `);

  // Insertar posts de prueba
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

describe("GET /authors", () => {
  test("debe devolver todos los autores", async () => {
    const response = await request(app).get("/authors");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("email");
    expect(response.body[0]).toHaveProperty("bio");
  });
});

describe("GET /authors/:id", () => {
  test("debe devolver un autor existente", async () => {
    const response = await request(app).get("/authors/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("name", "Ana García");
    expect(response.body).toHaveProperty("email", "ana@example.com");
    expect(response.body).toHaveProperty("bio");
  });

  test("debe devolver 404 si el autor no existe", async () => {
    const response = await request(app).get("/authors/999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Author not found");
  });
});

describe("POST /authors", () => {
  test("debe crear un nuevo autor", async () => {
    const newAuthor = {
      name: "Lucia pepa",
      email: "Luciapepa@example.com",
      bio: "Backend Developer",
    };

    const response = await request(app).post("/authors").send(newAuthor);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", newAuthor.name);
    expect(response.body).toHaveProperty("email", newAuthor.email);
    expect(response.body).toHaveProperty("bio", newAuthor.bio);
  });

  test("debe devolver 400 si falta un campo obligatorio", async () => {
    const newAuthor = {
      name: "Pedro Gómez",
      email: "pedro@example.com",
    };

    const response = await request(app).post("/authors").send(newAuthor);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "All fields are required");
  });
});

describe("PUT /authors/:id", () => {
  test("debe actualizar un autor existente", async () => {
    const updatedAuthor = {
      name: "Ana García Actualizada",
      email: "ana.actualizada@example.com",
      bio: "Nueva biografía",
    };

    const response = await request(app).put("/authors/1").send(updatedAuthor);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("name", updatedAuthor.name);
    expect(response.body).toHaveProperty("email", updatedAuthor.email);
    expect(response.body).toHaveProperty("bio", updatedAuthor.bio);
  });

  test("debe devolver 404 si el autor no existe", async () => {
    const updatedAuthor = {
      name: "Autor",
      email: "autor@example.com",
      bio: "Bio",
    };

    const response = await request(app).put("/authors/999").send(updatedAuthor);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Author not found");
  });
});

describe("DELETE /authors/:id", () => {
  test("debe eliminar un autor existente", async () => {
    const response = await request(app).delete("/authors/3");

    expect(response.statusCode).toBe(204);
  });

  test("debe devolver 404 si el autor no existe", async () => {
    const response = await request(app).delete("/authors/999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message", "Author not found");
  });
});
