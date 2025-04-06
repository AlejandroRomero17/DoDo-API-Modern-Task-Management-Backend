import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../config/logger";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload;
    }
  }
}

const secretKey = process.env.JWT_SECRET;
if (!secretKey) throw new Error("JWT_SECRET no está definido");

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    logger.warn("Intento de acceso sin token", { path: req.path });
    res.status(401).json({ message: "Authentication Failed!" });
    return; // Solo return sin valor
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      logger.error("Error de autenticación", {
        error: err.message,
        path: req.path,
      });
      res.status(403).json({ message: "Token inválido" });
      return; // Solo return sin valor
    }

    if (decoded && typeof decoded === "object" && "userId" in decoded) {
      logger.debug("Acceso autorizado", {
        userId: decoded.userId,
        path: req.path,
      });
      req.user = decoded;
      next();
    } else {
      logger.warn("Estructura de token inválida", { decoded });
      res.status(403).json({ message: "Estructura de token inválida" });
      // No necesitas return aquí
    }
  });
};

export default authenticateToken;
