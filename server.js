import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readTask } from "./public/scripts/taskUtils.js";

const app = express();

//Port Number
const port = 3000;

// Get the directory path of the current module
//I NEEDED HELP WITH THIS PART I WAS STUCK FOR SO LONG I FINALLY GOT IT TO WOTRK BUT THIS IS STILL VERY CONFUSING TO ME :/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the "public" directory
//THIS WAS ALSO ANOTHER ISSUE I HAD AND WAS VERY LOST, I NEEDED TO USE MY RESOURCES TO FIGURE THIS ONE OUT BUT I AM STILL NOT 100% ON WHY I AM NEEDING TO DO THIS :?
app.use(express.static(join(__dirname, "public")));

// Define the API endpoint for the GET request
app.get("/tasks", (req, res) => {
  const tasks = readTask();
  res.json(tasks);
});

// Connect to the front end
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

app.get("/tasks-data", (req, res) => {
  const tasks = readTask();
  res.json(tasks);
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
