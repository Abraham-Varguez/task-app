const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

//Here is a function that adds task value into the html document
const addTask = function () {
  //If nothing is entered it will receive an error alert
  if (inputBox.value === "") {
    alert("Please enter a value!");
  } else {
    //This is where the task will add a li element when something is written
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
};
