import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function EditTaskModal({
  isModalOpen,
  setIsModalOpen,
  selectedTask,
  updateTask,
}) {
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    updateTask(selectedTask.id, editTitle, editDescription);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedTask) {
      setEditTitle(selectedTask.title);
      setEditDescription(selectedTask.description);
    }
  }, [selectedTask]);

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      sx={{ background: "#242424" }}
    >
      <Box sx={style} component="form" onSubmit={onSubmit} autoComplete="off">
        <h2 style={{ color: "white" }}>Edit Task</h2>
        <TextField
          fullWidth
          required
          inputProps={{ minLength: 3 }}
          label="Title"
          variant="outlined"
          size="small"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <TextField
          fullWidth
          required
          label="Description"
          variant="outlined"
          size="small"
          sx={{ marginTop: "1em" }}
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
        <Button
          fullWidth
          sx={{ marginTop: "1em" }}
          type="submit"
          variant="contained"
        >
          EDIT
        </Button>
      </Box>
    </Modal>
  );
}

export default EditTaskModal;
