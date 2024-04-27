import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../firebase.js";

const tasksRef = collection(db, "tasks");

export async function getAllTasks(req, res, next) {
  try {
    const tasksSnapshot = await getDocs(tasksRef);
    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error fetching tasks");
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, description } = req.body;

    await addDoc(tasksRef, {
      title,
      description,
    });

    return res.status(201).send("Task created successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error creating task");
  }
}

export async function editTask(req, res, next) {
  try {
    const { id, title, description } = req.body;
    const taskRef = doc(tasksRef, id);

    // Check if task exists before updating
    const taskSnap = await getDoc(taskRef);
    if (!taskSnap.exists) {
      return res.status(404).send("Task not found");
    }

    await updateDoc(taskRef, {
      title,
      description,
    });

    return res.status(200).send("Task updated successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error updating task");
  }
}

export async function deleteTask(req, res, next) {
  try {
    const { id } = req.body;
    const taskRef = doc(tasksRef, id);

    // Check if task exists before deleting
    const taskSnap = await getDoc(taskRef);
    if (!taskSnap.exists) {
      return res.status(404).send("Task not found");
    }

    await deleteDoc(taskRef);

    return res.status(200).send("Task deleted successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error deleting task");
  }
}
