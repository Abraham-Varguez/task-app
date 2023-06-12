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
    console.log("Error reading tasks from file");
    return [];
  }
};

// Write tasks to the JSON file
const saveTasksToFile = (tasks) => {
  try {
    const tasksData = JSON.stringify(tasks);
    writeFileSync(join(__dirname, "task.json"), tasksData, "utf-8");
  } catch (error) {
    console.log("Error saving tasks to file:", error);
  }
};


//THIS IS HOW ORGINALLY HAD MY CODE BUT IT WAS NOT WORKIGG SO I NEEDED TO CONNECT IT TO THE SERVER.JS FILE BUT I WAS STRGULLING HOW TO DO IT I FOUND THE ASNWER BUT IT WAS COMPLEX FOR ME TO UNDERSTNAD FULLY
//I JUST WANTED TO BE TRANSPARETNT CAUSE I AM DEFINETELY NOT AN EXPERT CODER 
// Define a new API endpoint for the DELETE request to handle task deletion.
app.delete("/tasks-data/:index", (req, res) => {
  const tasks = readTask();

  const index = parseInt(req.params.index);
  // Extract the task index from the request parameters and remove the corresponding task from the tasks array.
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    return res.status(400).json({ error: "Invalid task index" });
  }
  // Update the JSON file with the modified tasks array.
  tasks.splice(index, 1);
  saveTasksToFile(tasks);
  // Return the updated tasks array as the response.
  res.json(tasks);
});

// Define the API endpoint for the GET request to fetch tasks
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
