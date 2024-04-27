import React from "react";
import "./App.css";
import ViewTask from "./components/ViewTask";
import AddTask from "./components/AddTask";

function App() {
  return (
    <div>
      <h1>Task Manager</h1>
      <AddTask />
      <ViewTask />
    </div>
  );
}

export default App;
