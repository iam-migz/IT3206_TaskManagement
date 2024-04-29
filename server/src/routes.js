import { Router } from "express";
import {
  getAllTasks,
  createTask,
  editTask,
  deleteTask,
} from "./controllers/task.controller.js";
import validateResource from "./middlewares/validateResource.js";
import {
  createTaskSchema,
  deleteTaskSchema,
  updateTaskSchema,
} from "./schemas/task.schema.js";

const router = Router();

router.get("/", getAllTasks);
router.post("/", validateResource(createTaskSchema), createTask);
router.put("/:taskId", validateResource(updateTaskSchema), editTask);
router.delete("/:taskId", validateResource(deleteTaskSchema), deleteTask);

export default router;
