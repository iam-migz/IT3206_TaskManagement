import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import api from "./utils/axiosInstance";
import EditTaskModal from "./components/EditTaskModal";
import Swal from "sweetalert2";
import TaskList from "./components/TaskList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [completedTasks, setCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);

  const [tabValue, setTabValue] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchivedChecked, setIsArchivedChecked] = useState(true);

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const getTasks = async () => {
    try {
      const response = await api.get("/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const saveTask = async (event) => {
    event.preventDefault();
    try {
      await api.post("/", { title, description, status: false });
      setTitle("");
      setDescription("");
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
      });
    }
  };

  const updateTask = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/${editId}`, {
        title: editTitle,
        description: editDescription,
      });
      getTasks();
      setIsModalOpen(false);
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

  const openModal = (id, title, description) => {
    setIsModalOpen(true);
    setEditId(id);
    setEditTitle(title);
    setEditDescription(description);
  };

  useEffect(() => {
    // get tasks when component first renders
    getTasks();
  }, []);

  useEffect(() => {
    // Update completed and uncompleted tasks whenever tasks change
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
      <ThemeProvider theme={darkTheme}>
        <Paper className="main-box" elevation={8}>
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

          <Box
            className="form-group"
            component="form"
            onSubmit={saveTask}
            autoComplete="off"
          >
            <TextField
              required
              inputProps={{ minLength: 3 }}
              id="form-group__title"
              label="Title"
              variant="outlined"
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              required
              inputProps={{ minLength: 3 }}
              id="form-group__description"
              label="Description"
              variant="outlined"
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Create
            </Button>
          </Box>

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
                openModal={openModal}
                updateTaskStatus={updateTaskStatus}
                deleteTask={deleteTask}
              />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: "0" }}>
              <TaskList
                tasks={completedTasks}
                openModal={openModal}
                updateTaskStatus={updateTaskStatus}
                deleteTask={deleteTask}
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
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={editTitle}
          description={editDescription}
          setTitle={setEditTitle}
          setDescription={setEditDescription}
          onSubmit={updateTask}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
