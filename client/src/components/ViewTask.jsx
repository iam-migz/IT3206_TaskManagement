import React, { useState, useEffect } from "react";
import api from "../utils/axiosInstance";
import DeleteTask from "./DeleteTask";

function ViewTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/");
        setTasks(response.data);
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();

    const taskAddedListener = () => fetchTasks();
    window.addEventListener("taskAdded", taskAddedListener);

    return () => {
      window.removeEventListener("taskAdded", taskAddedListener);
    };
  }, []);

  const handleDelete = async (taskId, fetchTasks) => {
    try {
      await api.delete("/", { data: { id: taskId } }); // Send task ID in request body
      console.log("Task deleted successfully");
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
      console.log("Error response:", error.response);
    }
  };
  

  return (
    <div>
      <div>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.title} - {task.description} (ID: {task.id})
                <DeleteTask taskId={task.id} onDelete={handleDelete} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewTask;
