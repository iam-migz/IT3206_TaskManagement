import { Router } from "express";
import {
  getAllTasks,
  createTask,
  editTask,
  deleteTask,
} from "./controllers/task.controller.js";
const router = Router();

router.get("/", getAllTasks);
router.patch("/", editTask);
router.post("/", createTask);
router.delete("/", deleteTask);

export default router;
