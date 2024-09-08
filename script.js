let add = document.getElementById('add');
let alltasks = document.getElementById('tasks');
let check = document.getElementById('check');
let task = document.getElementById('task');
let delete1 = document.getElementById('delete');
let closeModalBtn = document.querySelector('.close-modal');
let modalWindow = document.querySelector('.modal-window');
let overlay = document.querySelector('.overlay');
let alarm = document.getElementById('alarm');
let setBtn = document.getElementById('setBtn');
let timer = document.getElementById('timer');
let alarmAudio = new Audio('mixkit-digital-clock-digital-alarm-buzzer-992.wav');

let alarmInterval = null; // Store the alarm interval so it can be canceled

let tasks = [
  {
    title: 'task1',
    date: '15/10/2030',
    isDone: false,
    setTimer: false,
    alarmTime: null, // Added to store the alarm time
  },
  {
    title: 'task2',
    date: '15/10/2030',
    isDone: false,
    setTimer: false,
    alarmTime: null,
  },
  {
    title: 'task3',
    date: '15/10/2030',
    isDone: false,
    setTimer: false,
    alarmTime: null,
  },
];

const getTasksFromStorage = () => {
  let retrievedTasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = retrievedTasks || [];
};

getTasksFromStorage();

const fillTasksOnThePage = () => {
  alltasks.innerHTML = '';

  let index = 0;

  for (let task of tasks) {
    let content = `<div  id="task" class='task ${task.isDone ? 'done' : ''}'>
                <div style='width: 70%'>
                  <h2>${task.title}</h2>
  
                  <div>
                    <span>
                      <span class='material-symbols-outlined' style='line-height: 0'>
                        calendar_month
                      </span>${task.date}
                    </span>
                  </div>
                  ${
                    task.setTimer && task.alarmTime
                      ? `<div>Alarm set for: ${task.alarmTime}</div>`
                      : ''
                  }
                </div>
             
                <div id="${index}" style='display: flex; justify-content: space-between; align-items: center; width: 20%;'>
                  ${
                    task.setTimer
                      ? `
                      <button
                        onclick="cancelAlarm(${index})"
                        id='check'
                        class='circular'
                        style='background-color: rgb(114, 0, 0); color: white'
                      >
                        <span class="material-symbols-outlined">close</span>
                      </button>
                    `
                      : `  
                      <button
                        onclick="toggleTimerTask(${index})"
                        id="timer"
                        class='circular'
                        style='background-color: rgba(56, 55, 55, 0.667); color: white'
                      >
                        <span class="material-symbols-outlined">timer</span>
                      </button>
                    `
                  }

                  <button
                    onclick="deleteTask(${index})"
                    id="delete"
                    class='circular'
                    style='background-color: rgb(114, 0, 0); color: white'
                  >
                    <span class='material-symbols-outlined'>delete</span>
                  </button>

                  ${
                    task.isDone
                      ? `
                      <button
                        onclick="toggleTaskCompletion(${index})"
                        id='check'
                        class='circular'
                        style='background-color: rgb(114, 0, 0); color: white'
                      >
                        <span class="material-symbols-outlined">close</span>
                      </button>
                    `
                      : `
                      <button
                        onclick="toggleTaskCompletion(${index})"
                        id='check'
                        class='circular'
                        style='background-color: rgb(0, 150, 30); color: white'
                      >
                        <span class='material-symbols-outlined'>check</span>
                      </button>
                    `
                  }

                  <button
                    onclick="editTask(${index})"
                    id="edit"
                    class='circular'
                    style='background-color: rgb(0, 16, 197, 0.692); color: white'
                  >
                    <span class='material-symbols-outlined'>edit</span>
                  </button>
                </div>
              </div>`;

    alltasks.innerHTML += content;
    index++;
  }
};

fillTasksOnThePage();

add.addEventListener('click', () => {
  let now = new Date();
  let date =
    now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
  let taskname = prompt('write your task: ');
  let takobj = {
    title: taskname,
    date: date,
    isDone: false,
    setTimer: false,
    alarmTime: null,
  };
  if (taskname == '') {
    return;
  } else if (taskname) {
    tasks.push(takobj);
    storeTasks();
    fillTasksOnThePage();
  }
});

const deleteTask = (index) => {
  let task = tasks[index];
  let confirmation = confirm('are you sure you want to delete ' + task.title);
  if (confirmation) {
    tasks.splice(index, 1);
    storeTasks();
    fillTasksOnThePage();
  }
};

const editTask = (index) => {
  let task = tasks[index];
  let newTaskName = prompt('what is the new name: ', task.title);

  if (newTaskName === '') {
    return task.title;
  } else if (newTaskName) {
    task.title = newTaskName;
  } else if (!newTaskName) {
    return task.title;
  }

  task.title = newTaskName;
  storeTasks();
  fillTasksOnThePage();
};

const toggleTaskCompletion = (index) => {
  let task = tasks[index];
  task.isDone = !task.isDone;
  storeTasks();
  fillTasksOnThePage();
};

//#############################################
//timer and alarm functionality
const toggleTimerTask = (index) => {
  let task = tasks[index];

  viewModal();

  setBtn.onclick = (event) => {
    let alarmTime = alarm.value;
    event.preventDefault(); // Prevent default form submission behavior

    if (alarmTime === '') {
      alert('Please select a time for the alarm!');
      return;
    }

    // Update the task with the alarm time and set the timer
    task.setTimer = true;
    task.alarmTime = alarmTime;

    let now = new Date();
    let alarmDate = new Date(now.toDateString() + ' ' + alarmTime);
    let timeDifference = alarmDate - now;

    if (timeDifference > 0) {
      // Set the timer to play the alarm sound when the time difference is over
      alarmInterval = setTimeout(() => {
        playAlarmSound();
        /*   alert(`Time's up for ${task.title}!`); */
      }, timeDifference);
    } else {
      alert('Please select a future time for the alarm!');
    }

    storeTasks();
    fillTasksOnThePage();
    closeModal();
  };

  closeModalBtn.onclick = closeModalAndResetTimer;
  overlay.onclick = closeModalAndResetTimer;
};

const closeModalAndResetTimer = () => {
  closeModal();
  resetTimer();
};

// Function to close the modal
let closeModal = () => {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Function to view the modal
let viewModal = () => {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Function to cancel an alarm
const cancelAlarm = (index) => {
  let task = tasks[index];
  task.setTimer = false;
  task.alarmTime = null;

  if (alarmInterval) {
    clearTimeout(alarmInterval);
    alarmInterval = null;
  }

  storeTasks();
  fillTasksOnThePage();
};

// Function to play the alarm sound
const playAlarmSound = () => {
  alarmAudio.play().catch((error) => {
    console.log('Error playing audio:', error);
    alert('Please allow audio playback for alarms.');
  });
};

// Store tasks in local storage
const storeTasks = () => {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksString);
};
