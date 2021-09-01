// UI Vars
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListener();

function loadEventListener() {
  // Add task event
  form.addEventListener('submit', addTask);

  // Remove task
  tasklist.addEventListener('click', removeTask);
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  const li = document.createElement("li");

  li.className = 'collection-item';

  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");

  link.className = 'delete-item secondary-content';

  link.innerHTML = '<i class="fa fa-trash"></i>';

  li.appendChild(link);

  tasklist.appendChild(li);

  taskInput.value = '';

  e.preventDefault();
}

