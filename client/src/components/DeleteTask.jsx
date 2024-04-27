import React from "react";
import api from "../utils/axiosInstance";

function DeleteTask({ taskId, onDelete }) {
  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      // Call onDelete function passed from parent component (ViewTask)
      onDelete(taskId);
    }
  };

  return (
    <button onClick={confirmDelete}>Delete</button>
  );
}

export default DeleteTask;