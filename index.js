const taskInput = document.getElementById("task");
const addButton = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const quote = document.getElementById("quote");
let tasks = [];

addButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = { id: Date.now(), text: taskText, completed: false };
    tasks.push(task);
    renderTasks();
    taskInput.value = "";
  } else {
    alert("Please enter a task.");
  }
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
    }
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));
    li.appendChild(deleteBtn);
    li.addEventListener("click", () => toggleCompleted(task.id));
    taskList.appendChild(li);
  });
}

function toggleCompleted(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

allBtn.addEventListener("click", () => filterTasks("all"));
activeBtn.addEventListener("click", () => filterTasks("active"));
completedBtn.addEventListener("click", () => filterTasks("completed"));
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

function filterTasks(filter) {
  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "active"
      ? tasks.filter((task) => !task.completed)
      : tasks.filter((task) => task.completed);
  renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
  taskList.innerHTML = "";
  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
    }
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));
    li.appendChild(deleteBtn);
    li.addEventListener("click", () => toggleCompleted(task.id));
    taskList.appendChild(li);
  });
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

fetch("https://type.fit/api/quotes")
  .then(function (response) {
   return response.json();
  })
  .then(function (data) {
      console.log(data)
      quote.innerHTML = `<b>Quote of the day-</b>"${data[Math.floor(Math.random()*15)].text}"`;
  });

