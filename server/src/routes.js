import { Router } from "express";
import {
  getAllTasks,
  createTask,
  editTask,
  deleteTask,
  updateTaskStatus,
} from "./controllers/task.controller.js";
import validateResource from "./middlewares/validateResource.js";
import {
  createTaskSchema,
  taskIdParams,
  updateTaskSchema,
} from "./schemas/task.schema.js";

const router = Router();

router.get("/", getAllTasks);
router.post("/", validateResource(createTaskSchema), createTask);
router.put("/:taskId", validateResource(updateTaskSchema), editTask);
router.delete("/:taskId", validateResource(taskIdParams), deleteTask);
router.patch("/:taskId", validateResource(taskIdParams), updateTaskStatus);

// Health Check
router.get("/check", (req, res) => res.sendStatus(200));

export default router;
