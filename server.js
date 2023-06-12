import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync, writeFileSync } from "fs";

const app = express();

// Port Number
const port = 3000;

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the "public" directory
app.use(express.static(join(__dirname, "public")));

// Read tasks from the JSON file
const readTask = () => {
  try {
    const taskData = readFileSync(join(__dirname, "task.json"), "utf-8");
    const tasks = JSON.parse(taskData);
    return tasks;
  } catch {
    console.log(`Error reading tasks from file`);
    return [];
  }
};

// Write tasks to the JSON file
const saveTasksToFile = (tasks) => {
  try {
    const tasksData = JSON.stringify(tasks);
    writeFileSync(join(__dirname, "task.json"), tasksData, "utf-8");
  } catch (error) {
    console.log(`Error saving tasks to file: ${error}`);
  }
};

// Define the API endpoint for the GET request
app.get("/tasks-data", (req, res) => {
  const tasks = readTask();
  res.json(tasks);
});

// Define the API endpoint for the POST request to add a new task
app.post("/tasks-data", express.json(), (req, res) => {
  const tasks = readTask();
  const newTask = req.body.task;

  if (!newTask) {
    return res.status(400).json({ error: "Task is required" });
  }

  tasks.push(newTask);
  saveTasksToFile(tasks);

  res.status(201).json(tasks);
});

// Connect to the front end
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
