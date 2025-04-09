import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import winston from "winston";

// Cargar variables de entorno
dotenv.config();

const PORT: number = parseInt(process.env.PORT || "5000", 10);
const DB_URL: string | undefined = process.env.DB_URL;

// Configuración de logger (puedes mover esto a un módulo dedicado en config/)
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [new winston.transports.Console()],
});

// Conexión a MongoDB
if (!DB_URL) {
  logger.error("DB_URL is not defined in the environment variables");
  process.exit(1);
}

mongoose
  .connect(DB_URL)
  .then(() => logger.info("DB connection established"))
  .catch((err) => {
    logger.error("Error connecting to the database:", err);
    process.exit(1);
  });

// Inicio del servidor
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Manejo del cierre de la conexión
process.on("SIGINT", () => {
  mongoose.connection
    .close()
    .then(() => {
      logger.info("MongoDB connection closed");
      process.exit(0);
    })
    .catch((err) => {
      logger.error("Error closing MongoDB connection:", err);
      process.exit(1);
    });
});
