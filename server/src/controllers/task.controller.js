import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit
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
    return res.json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, description, status } = req.body;

    // check if title already exists
    const q = query(tasksRef, where("title", "==", title), limit(1));
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      return res.status(400).json({ message: "Title already exists" });
    }

    await addDoc(tasksRef, {
      title,
      description,
      status,
    });

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

export async function editTask(req, res, next) {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;
    const taskRef = doc(tasksRef, taskId);

    // Check if task exists before updating
    const taskSnap = await getDoc(taskRef);
    if (!taskSnap.exists()) {
      return res.status(404).json({ message: "Task not found" });
    }

    await updateDoc(taskRef, {
      title,
      description,
      status
    });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const { taskId } = req.params;
    const taskRef = doc(tasksRef, taskId);

    // Check if task exists before deleting
    const taskSnap = await getDoc(taskRef);
    if (!taskSnap.exists()) {
      return res.status(404).json({ message: "Task not found" });
    }
    console.log('taskSnap.exists', taskSnap.exists)

    await deleteDoc(taskRef);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}
