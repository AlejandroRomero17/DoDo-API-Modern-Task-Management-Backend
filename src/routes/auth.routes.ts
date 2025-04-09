import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para el registro e inicio de sesión
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               firstName: "Juan"
 *               lastName: "Pérez"
 *               userName: "juanperez"
 *               password: "password123"
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *       400:
 *         description: Datos inválidos o usuario ya existe.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/register", AuthController.registerUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Autentica un usuario e inicia sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               userName: "juanperez"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Autenticación exitosa y token JWT devuelto.
 *       404:
 *         description: Usuario no encontrado.
 *       401:
 *         description: Contraseña incorrecta.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/login", AuthController.loginUser);

export default router;
