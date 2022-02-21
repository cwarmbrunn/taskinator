var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var tasks = [];

var taskFormHandler = function (event) {
  //Stops browser default behavior of refreshing
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;

  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // Checks if the input values are empty strings

  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  // Reset form after task is submitted

  formEl.reset();
  // Packages up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
    status: "to do",
  };

  var isEdit = formEl.hasAttribute("data-task-id");
  // Has data attribute, so get task ID and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  // No data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
    };
    // Send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
  }
};

var completeEditTask = function (taskName, taskType, taskId) {
  // Find the matching task list item
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // Set New Values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  // Reset form by removing the task ID and changing button text back to normal
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";

  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // Loop through tasks array and task object with new content
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }
  saveTasks();
};

var createTaskEl = function (taskDataObj) {
  // Create List Item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // Add Task ID as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

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
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // Add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  taskDataObj.id = taskIdCounter;

  // Local Storage
  saveTasks();
  tasks.push(taskDataObj);
  // Increase task counter for next unique ID
  taskIdCounter++;

  console.log(taskDataObj);
  console.log(taskDataObj.status);
};
formEl.addEventListener("submit", taskFormHandler);

var createTaskActions = function (taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // Create Edit Button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // Create Delete Button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    // Create Option Element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // Append to Select

    statusSelectEl.appendChild(statusOptionEl);
  }
  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;
};

var taskButtonHandler = function (event) {
  // Get target element from event
  var targetEl = event.target;

  // Edit button was clicked

  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  // Delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

pageContentEl.addEventListener("click", taskButtonHandler);

// Delete Button Function
var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

  // Create new array to hold updated list of tasks
  var updatedTaskArr = [];

  //Loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    // If tasks[i] doesn't march the value of taskId, let's keep that task
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  //Reassign tasks array to be the same as updatedTasks Arr
  tasks = updatedTaskArr;

  saveTasks();
};

// Edit Button Function
var editTask = function (taskId) {
  console.log("editing task #" + taskId);

  // Get task list item element
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // Get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
};

var taskStatusChangeHandler = function (event) {
  // Get the task item's ID
  var taskId = event.target.getAttribute("data-task-id");

  // Get the currently selected option's value and conver to lowercase
  var statusValue = event.target.value.toLowerCase();

  // Find the parent task item element based on the id
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  // If status value is "To Do", move accordingly
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);

    // Else if status value is "In Progress". move accordingly
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);

    // Else if status value is "Completed", move accordingly
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  // Update the task's in the tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  console.log(tasks);

  saveTasks();
};
// Save Tasks in Local Storage
var saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
pageContentEl.addEventListener("change", taskStatusChangeHandler);
