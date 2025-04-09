import express from "express";
import {
  createToDo,
  getAllToDo,
  deleteToDo,
  updateToDo,
} from "../controllers/toDo.controller";
import authenticateToken from "../middleware/authJwt";
import { rateLimiter } from "../middleware/rateLimiter";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Endpoints para la gestión de tareas (to-do)
 */

/**
 * @swagger
 * /api/todo/create-to-do:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               title: "Nueva Tarea"
 *               description: "Descripción de la tarea"
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/create-to-do", rateLimiter, authenticateToken, createToDo);

/**
 * @swagger
 * /api/todo/get-all-to-do/{userId}:
 *   get:
 *     summary: Obtiene todas las tareas de un usuario
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de tareas devuelta exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/get-all-to-do/:userId", authenticateToken, getAllToDo);

/**
 * @swagger
 * /api/todo/delete-to-do/{id}:
 *   delete:
 *     summary: Elimina una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada con éxito.
 *       404:
 *         description: Tarea no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/delete-to-do/:id", authenticateToken, deleteToDo);

/**
 * @swagger
 * /api/todo/update-to-do/{id}:
 *   patch:
 *     summary: Actualiza una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               title: "Tarea actualizada"
 *               description: "Nueva descripción de la tarea"
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente.
 *       404:
 *         description: Tarea no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch("/update-to-do/:id", authenticateToken, updateToDo);

export default router;
