import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import api from "./utils/axiosInstance";
import Swal from "sweetalert2";
import EditTaskModal from "./components/EditTaskModal";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const [completedTasks, setCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);

  const [tabValue, setTabValue] = useState("1");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isArchivedChecked, setIsArchivedChecked] = useState(true);
  const [isLoaderOpen, setIsLoaderOpen] = useState(true);

  const getTasks = async () => {
    try {
      const response = await api.get("/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const saveTask = async (title, description) => {
    try {
      await api.post("/", { title, description, status: false });
      getTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#242424",
      color: "white",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/${taskId}`);
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error deleting task:", error);
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        background: "#242424",
        color: "white",
      });
    }
  };

  const updateTask = async (taskId, title, description) => {
    try {
      await api.put(`/${taskId}`, {
        title,
        description,
      });
      getTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const updateTaskStatus = async (taskId) => {
    try {
      const updatedTasks = tasks.map((currentTask) => {
        return currentTask.id === taskId
          ? { ...currentTask, status: !currentTask.status }
          : currentTask;
      });
      setTasks(updatedTasks);

      await api.patch(`/${taskId}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      console.log(`Running in ${import.meta.env.MODE}`);
      try {
        const res = await api.get("/check");
        setIsLoaderOpen(false);
        console.log("Connected to api", res);
      } catch (error) {
        console.log("Could not connect to api");
        console.log("error", error);
      }
    };
    checkConnection();

    getTasks();
  }, []);

  useEffect(() => {
    if (!isArchivedChecked) {
      setUncompletedTasks(tasks);
      setCompletedTasks([]);
      return;
    }
    const completed = tasks.filter((task) => task.status);
    const uncompleted = tasks.filter((task) => !task.status);
    setCompletedTasks(completed);
    setUncompletedTasks(uncompleted);
  }, [tasks, isArchivedChecked]);

  return (
    <>
      <Paper
        className="main-box"
        sx={{
          background: "oklch(21.1484% 0.01165 254.087939 / 1)",
        }}
        elevation={8}
      >
        <header className="header">
          <span>Task Management</span>
          <span>
            {new Date().toLocaleDateString("en-PH", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </header>

        <AddTaskForm saveTask={saveTask} />

        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label="Active" value="1" />
              <Tab label="Archived" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: "0" }}>
            <TaskList
              tasks={uncompletedTasks}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
              setSelectedTask={setSelectedTask}
              setIsModalOpen={setIsEditModalOpen}
            />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: "0" }}>
            <TaskList
              tasks={completedTasks}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
              setSelectedTask={setSelectedTask}
              setIsModalOpen={setIsEditModalOpen}
            />
          </TabPanel>
        </TabContext>

        <Box className="footer">
          <FormControlLabel
            control={<Checkbox />}
            label="Hide Completed Tasks"
            onChange={(e) => setIsArchivedChecked(e.target.checked)}
            checked={isArchivedChecked}
          />
        </Box>
      </Paper>

      <EditTaskModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        selectedTask={selectedTask}
        updateTask={updateTask}
      />

      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoaderOpen}
      >
        <div className="backdrop">
          <CircularProgress color="inherit" />
          <span>Please wait</span>
          <span className="info">
            This could take upto 50 seconds if the server had a coldstart
          </span>
        </div>
      </Backdrop>
    </>
  );
}

export default App;
