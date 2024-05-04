import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

function AddTaskForm({ saveTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    setTitle("");
    setDescription("");
    saveTask(title, description);
  };

  return (
    <Box
      className="form-group"
      component="form"
      onSubmit={onSubmit}
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
  );
}

export default AddTaskForm;
