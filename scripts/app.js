"use strict";
"use strict";
import { readTask } from "./taskUtils.js";

const tasks = readTask();
//THIS IS HOW ORGINALLY HAD MY CODE BUT IT WAS NOT WORKIGG SO I NEEDED TO CONNECT IT TO THE SERVER.JS FILE BUT I WAS STRGULLING HOW TO DO IT I FOUND THE ASNWER BUT IT WAS COMPLEX FOR ME TO UNDERSTNAD FULLY
//I JUST WANTED TO BE TRANSPARETNT CAUSE I AM DEFINETELY NOT AN EXPERT CODER
// //Render into the HTML
// const renderTasks = () => {
//   let tasks = readTask();
// Move the declaration and initialization here

//   //THIS WAS THE BIGEST HEADACHE IN THE WORLD
//   fetch("/tasks-data")
//     .then((res) => res.json())
//     .then((fetchedTasks) => {
//       tasks = fetchedTasks; // Update the tasks variable with fetched tasks

//       listContainer.innerHTML = "";
//       tasks.forEach((task) => {
//         const li = document.createElement("li");
//         li.textContent = task;
//         const span = document.createElement("span");
//         span.innerHTML = "\u00d7";
//         li.appendChild(span);
//         listContainer.appendChild(li);
//       });
//     })
//     .catch((error) => {
//       console.log("Error fetching tasks data:", error);
//     });
// };
const renderTasks = () => {
  fetch("/tasks-data")
    .then((res) => res.json())
    .then((tasks) => {
      listContainer.innerHTML = "";

      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.addEventListener("click", () => deleteTask(index)); // Add click event listener

        li.appendChild(span);
        listContainer.appendChild(li);
      });
    })
    .catch((error) => {
      console.log("Error fetching tasks data:", error);
    });
};

renderTasks(); // Call renderTasks to fetch and render the tasks

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

//THIS IS HOW ORGINALLY HAD MY CODE BUT IT WAS NOT WORKIGG SO I NEEDED TO CONNECT IT TO THE SERVER.JS FILE BUT I WAS STRGULLING HOW TO DO IT I FOUND THE ASNWER BUT IT WAS COMPLEX FOR ME TO UNDERSTNAD FULLY
//I JUST WANTED TO BE TRANSPARETNT CAUSE I AM DEFINETELY NOT AN EXPERT CODER
// const addTask = function () {
//   if (inputBox.value === "") {
//     alert("Please enter a value!");
//   } else {
//     const newTask = inputBox.value;
//     // Add the new task to the tasks array
//     tasks.push(newTask);

//     // Save the updated tasks to the JSON file
//     saveTasksToFile();

//     // Update the HTML document with the new task
//     renderTasks();
//   }
//   //Resets the the input to have nothing once the button is pressed
//   inputBox.value = "";
// };

const addTask = () => {
  const inputBox = document.getElementById("input-box");
  const newTask = inputBox.value.trim();

  if (newTask === "") {
    alert("Please enter a value!");
    return;
  }

  fetch("/tasks-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: newTask }),
  })
    .then((res) => res.json())
    .then((tasks) => {
      inputBox.value = ""; // Clear the input box
      renderTasks(tasks); // Render the updated tasks
    })
    .catch((error) => {
      console.log("Error adding task:", error);
    });
};

const deleteTask = (index) => {
  fetch(`/tasks-data/${index}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((tasks) => {
      renderTasks();
    })
    .catch((error) => {
      console.log("Error deleting task:", error);
    });
};
// Get the "Add Task" button element
const addButton = document.getElementById("add-button");

// Add a click event listener to the button
addButton.addEventListener("click", addTask);
