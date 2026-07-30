import "dotenv/config";
import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 3000;

pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("Conexión a PostgreSQL exitosa");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar con PostgreSQL:", error);
  });
