# 🌸 MiniBlog API

API REST desarrollada con **Node.js**, **Express** y **PostgreSQL** como proyecto integrador del Módulo 2 de **Soy Henry**.

---

# 💜 Sobre el proyecto

MiniBlog API fue desarrollada con el objetivo de construir un backend completo siguiendo buenas prácticas de desarrollo.

La aplicación permite gestionar **autores** y **posts** mediante una API REST, implementando operaciones CRUD, persistencia de datos, validaciones, documentación y pruebas automatizadas.

Durante el desarrollo se trabajó aplicando conceptos de:

- Arquitectura REST.
- Express.
- PostgreSQL.
- Validaciones.
- Testing.
- Documentación con OpenAPI.
- Deployment en Railway.

---

# ✨ Funcionalidades

- 📚 CRUD completo de autores.
- 📝 CRUD completo de posts.
- 🛡️ Validación de datos de entrada.
- 🗄️ Persistencia con PostgreSQL.
- 📖 Documentación interactiva con Swagger.
- 🧪 Tests automatizados con Vitest.
- 🚂 Deploy en Railway.

---

# 🌐 Demo

### API

_Pendiente_

### Documentación Swagger

_Pendiente_

---

# 🚀 Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- Vitest
- Supertest
- Swagger UI Express
- OpenAPI 3.1

---

# 📋 Requisitos

Antes de ejecutar el proyecto necesitás tener instalado:

- Node.js
- PostgreSQL
- npm

---

# 📦 Instalación

Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta

```bash
cd ProyectoM2_SolangeAimery
```

Instalar dependencias

```bash
npm install
```

---

# ⚙️ Variables de entorno

Crear un archivo `.env`

```env
PORT=3000

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
```

---

# 🗄️ Base de datos

Crear la base de datos en PostgreSQL y ejecutar los archivos SQL del proyecto:

```sql
setup.sql
```

Luego cargar los datos iniciales:

```sql
seed.sql
```

---

# ▶️ Ejecutar el proyecto

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

---

# 🧪 Ejecutar los tests

```bash
npm test
```

---

# 📖 Documentación

Con el servidor en ejecución:

```
http://localhost:3000/api-docs
```

Cuando el proyecto esté desplegado:

```
Pendiente
```

---

# 📌 Endpoints

## 👩‍💻 Authors

| Método | Endpoint     |
| ------ | ------------ |
| GET    | /authors     |
| GET    | /authors/:id |
| POST   | /authors     |
| PUT    | /authors/:id |
| DELETE | /authors/:id |

---

## 📝 Posts

| Método | Endpoint                |
| ------ | ----------------------- |
| GET    | /posts                  |
| GET    | /posts/:id              |
| GET    | /posts/author/:authorId |
| POST   | /posts                  |
| PUT    | /posts/:id              |
| DELETE | /posts/:id              |

---

# 🚂 Deploy

API

_Pendiente_

Swagger

_Pendiente_

---

# 🤖 Uso de Inteligencia Artificial

Durante el desarrollo del proyecto utilicé ChatGPT como herramienta de apoyo para:

- Resolver dudas sobre Express.
- Trabajar con PostgreSQL.
- Comprender errores y depurarlos.
- Revisar consultas SQL.
- Mejorar la documentación.
- Resolver inconvenientes durante el deployment.
- Comprender conceptos vistos durante el desarrollo.

Las decisiones finales de implementación, estructura y funcionamiento del proyecto fueron realizadas y verificadas por mí.

---

# 👩🏻‍💻 Autora

**Solange Aimery**

GitHub

https://github.com/solangeAimery98
