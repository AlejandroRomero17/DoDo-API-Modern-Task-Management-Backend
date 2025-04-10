import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { ZodError } from "zod";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/auth.routes";
import toDoRoutes from "./routes/todo.routes";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app: Application = express();

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Dodo Task Manager API",
      version: "1.0.0",
      description: "Documentación de la API para gestionar tareas",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://taskflow-api-modern-task-management.onrender.com"
            : "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

// Configuración CORS mejorada
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://dodotaskmanager.netlify.app",
  "http://localhost:5000",
  "https://taskflow-api-modern-task-management.onrender.com",
];


const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ Rechazado por CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },

  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Middlewares de seguridad y configuración básica
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || "15") * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || "100"),
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

// Logging de peticiones (podrías extraer esta lógica en un middleware aparte)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.info(`${req.method} ${req.path}`);
  next();
});

// Endpoint de bienvenida y documentación detallada
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "¡Bienvenido a DoDo! - Modern Task Management API",
    description:
      "Esta API te permite gestionar usuarios y tareas (To-Do) de manera moderna y segura. " +
      "Para explorar la documentación interactiva y probar los endpoints, visita la URL de documentación indicada.",
    documentation:
      process.env.NODE_ENV === "production"
        ? "https://taskflow-api-modern-task-management.onrender.com/api-docs"
        : "http://localhost:5000/api-docs",
    author: {
      name: "Alejandro Gonzalez Romero",
      email: "gonzalez.romero.alejandroo@gmail.com",
      github: "https://github.com/AlejandroRomero17",
    },
  });
});

// Integración de Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas principales
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

// Manejo de errores general
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
};
app.use(errorHandler);

export default app;
