var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
  //Stops browser default behavior of refreshing
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  console.dir(taskNameInput);

  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  console.log(taskTypeInput);

  // Packages up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };

  // Send it as an argument to createTaskEl

  createTaskEl(taskDataObj);
};

var createTaskEl = function (taskDataObj) {
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
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";

  listItemEl.appendChild(taskInfoEl);
  // Add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
};
formEl.addEventListener("submit", taskFormHandler);
