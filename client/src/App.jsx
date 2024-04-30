import { useEffect, useState } from "react";
import ViewTask from "./components/ViewTask";
import AddTask from "./components/AddTask";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import api from "./utils/axiosInstance";
import EditIcon from "@mui/icons-material/Edit";
import EditTaskModal from "./components/EditTaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tabValue, setTabValue] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      // TODO toast errors
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // TODO warning toast
      await api.delete(`/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
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

  useEffect(() => {
    getTasks();
    console.log("tasks", tasks);
  }, []);

  return (
    <>
      <Paper className="main-box" elevation={8}>
        <header className="header">
          <span>April 29, 2024</span>
          <span>Task Management</span>
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
            <div className="task-list">
              {tasks &&
                tasks.map((task) => (
                  <Box className="task-list__task" key={task.title}>
                    <div className="divider">
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            onChange={() => updateTaskStatus(task.id)}
                            checked={task.status}
                          />
                        }
                        label={
                          <Typography
                            sx={{ fontSize: "1.2em", userSelect: "none" }}
                          >
                            {task.title}
                          </Typography>
                        }
                      />
                      <span className="task__description">
                        {task.description}
                      </span>
                    </div>
                    <div>
                      <IconButton
                        onClick={() => {
                          setIsModalOpen(true);
                          setEditId(task.id);
                          setEditTitle(task.title);
                          setEditDescription(task.description);
                        }}
                        color="warning"
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => deleteTask(task.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </Box>
                ))}
            </div>
          </TabPanel>
          <TabPanel value="2">Archived</TabPanel>
        </TabContext>

        <Box className="footer">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Hide Completed Tasks"
          />
        </Box>
      </Paper>

      {/* isModalOpen, setIsModalOpen */}
      <EditTaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={editTitle}
        description={editDescription}
        setTitle={setEditTitle}
        setDescription={setEditDescription}
        onSubmit={updateTask}
      />
    </>
  );
}

export default App;
