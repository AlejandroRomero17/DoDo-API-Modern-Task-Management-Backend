import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import winston from "winston";
import { ZodError } from "zod";
import authRoutes from "./routes/auth.routes";
import toDoRoutes from "./routes/todo.routes";

// Configuración de entorno
dotenv.config();

// Configuración de logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Inicialización de Express
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "5000", 10);
const DB_URL: string | undefined = process.env.DB_URL;

// Configuración CORS mejorada
const allowedOrigins = [
  "http://localhost:3000", // React tradicional
  "http://localhost:5173", // Vite
  "http://127.0.0.1:5173", // Alternativa local
  "https://dodotaskmanager.netlify.app"
  // Agrega aquí otros dominios en producción
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Middlewares de seguridad
app.use(helmet());
app.use(cors(corsOptions)); // Usamos la configuración personalizada

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || "15") * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || "100"),
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging de peticiones
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Rutas
app.use("/api", authRoutes);
app.use("/api/todo", toDoRoutes);

// Manejo de errores de Zod
const zodErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      errors: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }
  next(err);
};
app.use(zodErrorHandler);

// Error handling centralizado
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
};
app.use(errorHandler);

// Conexión a MongoDB
if (!DB_URL) {
  logger.error("DB_URL is not defined in the environment variables");
  process.exit(1);
}

mongoose
  .connect(DB_URL)
  .then(() => logger.info("DB connection established"))
  .catch((err) => logger.error("Error connecting to the database:", err));

// Inicio del servidor
app
  .listen(PORT, () => {
    logger.info(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
    logger.info(`Allowed CORS origins: ${allowedOrigins.join(", ")}`);
  })
  .on("error", (err) => {
    logger.error("Server error:", err);
    process.exit(1);
  });

// Manejo de cierre
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
