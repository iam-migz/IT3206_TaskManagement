import React, { useState, useEffect } from "react";
import api from "../utils/axiosInstance";

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

  return (
    <div>
      <div>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.title} - {task.description} (ID: {task.id})
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
