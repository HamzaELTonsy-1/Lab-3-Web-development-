const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("task-count");
const filters = document.querySelectorAll(".filter");
const clearButton = document.getElementById("clear-completed");

let todos = [];
let currentFilter = "all";

// Add a new task
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    input.focus();
    return;
  }

  todos.push({
    id: Date.now() + Math.random(),
    text: text,
    completed: false,
  });

  input.value = "";
  renderTodos();
});

// Show tasks on the page
function renderTodos() {
  list.innerHTML = "";

  const filteredTodos = todos.filter(function (todo) {
    if (currentFilter === "active") {
      return !todo.completed;
    }

    if (currentFilter === "completed") {
      return todo.completed;
    }

    return true;
  });

  if (filteredTodos.length === 0) {
    const message = document.createElement("li");
    message.className = "empty-message";
    message.textContent = "No tasks to show.";
    list.appendChild(message);
  }

  filteredTodos.forEach(function (todo) {
    const item = document.createElement("li");
    item.className = "todo-item";

    if (todo.completed) {
      item.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", function () {
      todo.completed = checkbox.checked;
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      todos = todos.filter(function (task) {
        return task.id !== todo.id;
      });

      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    list.appendChild(item);
  });

  const remaining = todos.filter(function (todo) {
    return !todo.completed;
  }).length;

  count.textContent =
    remaining + " task" + (remaining === 1 ? "" : "s") + " left";
}

// Change task filter
filters.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    filters.forEach(function (filter) {
      filter.classList.remove("active");
    });

    button.classList.add("active");
    renderTodos();
  });
});

// Remove all completed tasks
clearButton.addEventListener("click", function () {
  todos = todos.filter(function (todo) {
    return !todo.completed;
  });

  renderTodos();
});

// Initial display
renderTodos();
