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

// Mantener estructura similar a auth.routes.ts
router.post("/create-to-do", rateLimiter, authenticateToken, createToDo);
router.get("/get-all-to-do/:userId", authenticateToken, getAllToDo);
router.delete("/delete-to-do/:id", authenticateToken, deleteToDo);
router.patch("/update-to-do/:id", authenticateToken, updateToDo);

export default router;
