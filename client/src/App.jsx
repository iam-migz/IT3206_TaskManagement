import { useEffect, useState } from "react";
import api from "./utils/axiosInstance";
import "./App.css";

function App() {
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
  }, []);

  return (
    <div>
      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.description} (ID: {task.id})
            </li>
          ))}
        </ul>
      )}
      {tasks.length === 0 && <p>No tasks found.</p>}
    </div>
  );
}

export default App;
