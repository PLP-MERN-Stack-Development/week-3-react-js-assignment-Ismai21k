import express from "express";
import { createTask, getAllTasks, updateTask, deleteTask } from "../controller/TaskController.js";

const router = express.Router();

router.post("/create", createTask);
router.get("/tasks", getAllTasks);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
