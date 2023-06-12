"use strict";
import { readTask } from "./scripts/taskUtils.js";


const tasks = readTask();
//Render into the HTML

const renderTasks = () => {
  // Make an HTTP GET request to the server's API endpoint
  //This also a promise
  fetch("/tasks-data")
    .then((res) => res.json())
    .then((task) => {
      //Clears any existing tasks
      listContainer.innerHTML = "";

      //writes the li and span using the ForEach loop method
      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task;
        //Writes the close logo on my task
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        //Inserts the LI and SPAN into the HTML
        li.appendChild(span);
        listContainer.appendChild;
      });
    })
    .catch((error) => {
      console.log("Error fetching tasks data:", error);
    });
};

//Writes and Saves the information to the JSON file
function saveTasksToFile() {
  try {
    const tasksData = JSON.stringify(tasks);
    fs.writeFileSync("tasks.json", tasksData, "utf8");
  } catch (error) {
    console.log("Error saving tasks to file:", error);
  }
}

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
//Retreaving the JSON file

renderTasks();

const addTask = function () {
  if (inputBox.value === "") {
    alert("Please enter a value!");
  } else {
    const newTask = inputBox.value;
    // Add the new task to the tasks array
    tasks.push(newTask);

    // Save the updated tasks to the JSON file
    saveTasksToFile();

    // Update the HTML document with the new task
    renderTasks();
  }
  //Resets the the input to have nothing once the button is pressed
  inputBox.value = "";
};
