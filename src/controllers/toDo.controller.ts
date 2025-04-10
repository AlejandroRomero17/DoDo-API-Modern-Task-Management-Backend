import { Request, Response } from "express";
import ToDo from "../model/todolist.model";
import logger from "../config/logger";

// Definir mensajes de respuesta centralizados
const MESSAGES = {
  TASK_CREATED: "Created New Task!",
  TASK_UPDATED: "Task updated successfully",
  TASK_DELETED: "Task deleted successfully",
  TASK_NOT_FOUND: "Task not found",
  FETCH_ERROR: "Error fetching tasks",
  SERVER_ERROR: "Internal server error",
};

export const createToDo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Datos recibidos:", req.body); // Agrega este log
    const data = {
      ...req.body,
      createdBy: req.user?.userId, // Usa el usuario autenticado
    };
    console.log("Datos a guardar:", data); // Agrega este log
    const todo = new ToDo(data);
    const result = await todo.save();
    res.status(201).json({
      message: MESSAGES.TASK_CREATED,
      data: result,
    });
  } catch (err) {
    logger.error("Error en operación de tarea", {
      operation: "createToDo",
      error: err instanceof Error ? err.message : "Unknown error",
      userId: req.user?.userId,
    });
    res.status(500).json({
      message: MESSAGES.SERVER_ERROR,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const getAllToDo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const result = await ToDo.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      count: result.length,
      data: result,
    });
  } catch (err) {
    logger.error("Error en operación de tarea", {
      operation: "getAllToDo",
      error: err instanceof Error ? err.message : "Unknown error",
      userId: req.user?.userId,
    });
    res.status(500).json({
      message: MESSAGES.FETCH_ERROR,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const updateToDo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = req.params.id;
    const updateData = req.body;

    const updatedTodo = await ToDo.findByIdAndUpdate(
      taskId,
      { $set: updateData },
      { new: true, runValidators: true } // 'new: true' asegura que regresa el documento actualizado
    );

    if (!updatedTodo) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({
      message: "Tarea actualizada correctamente",
      data: updatedTodo,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error al actualizar la tarea",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};


export const deleteToDo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = req.params.id;
    const deletedTodo = await ToDo.findByIdAndDelete(taskId);

    if (!deletedTodo) {
      res.status(404).json({ message: MESSAGES.TASK_NOT_FOUND });
      return;
    }

    res.json({
      message: MESSAGES.TASK_DELETED,
      data: deletedTodo,
    });
  } catch (err) {
    logger.error("Error en operación de tarea", {
      operation: "deleteToDo",
      error: err instanceof Error ? err.message : "Unknown error",
      userId: req.user?.userId,
    });
    res.status(500).json({
      message: MESSAGES.SERVER_ERROR,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
