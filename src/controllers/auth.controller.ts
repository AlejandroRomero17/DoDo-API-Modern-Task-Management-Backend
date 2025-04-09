import { Request, Response } from "express";
import User from "../model/user.model";
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../config/logger";

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;
const jwtExpiresIn: string = process.env.JWT_EXPIRES_IN ?? "7d";

// Mensajes de respuesta
const MESSAGES = {
  USER_EXISTS: "User already registered with this username",
  REGISTRATION_SUCCESS: "User registered successfully",
  SERVER_ERROR: "Internal server error",
  INVALID_DATA: "Invalid user data",
  LOGIN_FAILED: "Authentication failed",
  INVALID_PASSWORD: "Wrong password",
};

// Controlador para registrar un usuario
const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, userName, password } = req.body;

  if (!firstName || !lastName || !userName || !password) {
    res.status(400).json({ message: MESSAGES.INVALID_DATA });
    return;
  }

  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      res.status(400).json({ message: MESSAGES.USER_EXISTS });
      return;
    }

    const user = new User({ firstName, lastName, userName, password });
    await user.save();

    res.status(201).json({ message: MESSAGES.REGISTRATION_SUCCESS });
    console.log("Usuario registrado:", user);
  } catch (error) {
    logger.error("Error registering user", {
      error: error instanceof Error ? error.message : "Unknown error",
      userName: req.body.userName,
    });
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

// Controlador para iniciar sesión
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(404).json({ message: MESSAGES.LOGIN_FAILED });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: MESSAGES.INVALID_PASSWORD });
      return;
    }

    if (!secretKey) {
      res.status(500).json({ message: "Secret key not defined" });
      return;
    }

    const signOptions: SignOptions = {
      expiresIn: jwtExpiresIn as any, // Se fuerza a que sea "any" para evitar el error de tipos
    };

    const token = jwt.sign({ userId: user._id }, secretKey, signOptions);

    res.json({
      userId: user._id,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    });
  } catch (error) {
    logger.error("Error en login", {
      error: error instanceof Error ? error.message : "Unknown error",
      userName: req.body.userName,
    });
    res.status(500).json({ message: MESSAGES.SERVER_ERROR });
  }
};

export default { registerUser, loginUser };
