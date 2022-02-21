var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
  //Stops browser default behavior of refreshing
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  console.dir(taskNameInput);

  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  console.log(taskTypeInput);

  // Create List Item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // Create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");

  // Give it a class name
  taskInfoEl.className = "task-info";

  // Add HTML content to div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskNameInput +
    "</h3><span class='task-type'>" +
    taskTypeInput +
    "</span>";

  listItemEl.appendChild(taskInfoEl);
  // Add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  console.dir(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);
