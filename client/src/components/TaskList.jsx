import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskList({
  tasks,
  setIsModalOpen,
  updateTaskStatus,
  deleteTask,
  setSelectedTask,
}) {
  return (
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
                  <Typography sx={{ fontSize: "1.2em", userSelect: "none" }}>
                    {task.title}
                  </Typography>
                }
              />
              <span className="task__description">{task.description}</span>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  setSelectedTask(task);
                  setIsModalOpen(true);
                }}
                color="warning"
              >
                <EditIcon />
              </IconButton>

              <IconButton onClick={() => deleteTask(task.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </div>
          </Box>
        ))}
    </div>
  );
}

export default TaskList;
