// UI muuttujien määrittelyt
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Lataa kaikki event listenerit
loadEventListeners();

// Lataa kaikki event listenerit
function loadEventListeners() {
  // DOM lataa tapahtuma
  document.addEventListener('DOMContentLoaded', getTasks);
  // Lisää tapahtuma
  form.addEventListener('submit', addTask);
  // Poista tapahtuma
  taskList.addEventListener('click', removeTask);
  // Poista tapahtumat
  clearBtn.addEventListener('click', clearTasks);
  // Filtteri tapahtuma
  filter.addEventListener('keyup', filterTasks);
}

// Hae tapahtumat Local Storegesta
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Luo li elementti
    const li = document.createElement('li');
    // Lisää luokka
    li.className = 'collection-item';
    // Luo text node ja lisää li
    li.appendChild(document.createTextNode(task));
    // Luo uusi linkkielementti
    const link = document.createElement('a');
    // Lisää luokka
    link.className = 'delete-item secondary-content';
    // Lisää icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Lisää linkki li
    li.appendChild(link);

    //Lisää linkki ul
    taskList.appendChild(li);
  });
}

// Lisää tapahtuma
function addTask(e) {
  if(taskInput.value === '') {
    alert('Lisää tapahtuma');
  }

  // Luo li elementin
  const li = document.createElement('li');
  // Lisää luokka
  li.className = 'collection-item';
  // Luo text node ja lisää li
  li.appendChild(document.createTextNode(taskInput.value));
  // Luo uusi linkkielementti
  const link = document.createElement('a');
  // Lisää luokka
  link.className = 'delete-item secondary-content';
  // Lisää icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Lisää linkki li
  li.appendChild(link);

  // Lisää li ul
  taskList.appendChild(li);

  // Tallenna Local Storegeen
  storeTaskInLocalStorage(taskInput.value);

  // Tyhjennä input
  taskInput.value = '';

  e.preventDefault();
}

// Tallenna tapahtumat
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Poista tapahtuma ja varmistus siihen
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Oletko varma?')) {
      e.target.parentElement.parentElement.remove();

      // Poista Local Storegesta
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Poista Local Storegesta
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Poista tapahtumat
function clearTasks() {
  // taskList.innerHTML = '';

  // Testi - nopeampi
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild

  // Poista Local Storegesta
  clearTasksFromLocalStorage();
}

// Poista Local Storegesta
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Haku/Filtteröinti
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}