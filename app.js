// UI Vars
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListener();

function loadEventListener() {
  //DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task
  tasklist.addEventListener('click', removeTask);
  // Clear tasks
  clearBtn.addEventListener('click', clearTasks);
  //Filter
  filter.addEventListener('keyup', filterTasks);
}
// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    // Create li Element
    const li = document.createElement("li");
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link Element
    const link = document.createElement("a");
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-trash"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    tasklist.appendChild(li);
  })
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }
  // Create li Element
  const li = document.createElement("li");
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link Element
  const link = document.createElement("a");
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-trash"></i>';
  // Append link to li
  li.appendChild(link);
  // Append li to ul
  tasklist.appendChild(li);

  // Store tasks in local storage
  storeTaskInLS(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLS(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains("delete-item")) {
    if(confirm("Are you sure you want to delete?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLS(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.innerHTML === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // tasklist.innerHTML = '';

  while(tasklist.firstChild) {
    tasklist.removeChild(tasklist.firstChild);
  }

  // clear tasks form Ls
  clearTasksFromLS();
}
// clear tasks form Ls
function clearTasksFromLS() {
  localStorage.clear();
}
// Filter
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;

    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}