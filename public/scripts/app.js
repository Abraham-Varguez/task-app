"use strict";
"use strict";
import { readTask } from "./taskUtils.js";

const tasks = readTask();
//Render into the HTML

("use strict");
import { readTask } from "./taskUtils.js";

//Render into the HTML
const renderTasks = () => {
  let tasks = readTask(); // Move the declaration and initialization here

  //THIS WAS THE BIGEST HEADACHE IN THE WORLD
  fetch("/tasks-data")
    .then((res) => res.json())
    .then((fetchedTasks) => {
      tasks = fetchedTasks; // Update the tasks variable with fetched tasks

      listContainer.innerHTML = "";
      tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task;
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
      });
    })
    .catch((error) => {
      console.log("Error fetching tasks data:", error);
    });
};

// The rest of your code...

renderTasks(); // Call renderTasks to fetch and render the tasks

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

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
