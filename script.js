let add = document.getElementById('add');
let alltasks = document.getElementById('tasks');
let check = document.getElementById('check');
let task = document.getElementById('task');
let delete1 = document.getElementById('delete');

let tasks = [
  {
    title: 'task1',
    date: '15/10/2030',
    isDone: false,
  },
  {
    title: 'task2',
    date: '15/10/2030',
    isDone: false,
  },
  {
    title: 'task3',
    date: '15/10/2030',
    isDone: false,
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

  for (task of tasks) {
    let content = `<div  id="task" class='task ${task.isDone ? 'done' : ''}'>
                <div style='width: 70%'>
                  <h2>${task.title}</h2>
  
                  <div>
                    <span>
                      <span
                        class='material-symbols-outlined'
                        style='line-height: 0'
                      >
                        calendar_month </span
                      >${task.date}
                    </span>
                  </div>
                </div>
             
                <div
                  id="${index}"
                  style='
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 20%;
                  '
                >
                  <button
                  onclick="deleteTask(${index})"
                    id="delete"
                    class='circular'
                    style='background-color: rgb(114, 0, 0); color: white'
                  >
                    <span class='material-symbols-outlined'> delete </span>
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
                   <span class="material-symbols-outlined">
close
</span>
                  </button>
                    
                    `
                      : `
                     <button
                    onclick="toggleTaskCompletion(${index})"
                    id='check'
                    class='circular'
                    style='background-color: rgb(0, 150, 30); color: white'
                  >
                    <span class='material-symbols-outlined'> check </span>
                  </button>
                    `
                  }
                 
                  <button
                  onclick="editTask(${index})"
                    id="edit"
                    class='circular'
                    style='background-color: rgb(0, 16, 197, 0.692); color: white'
                  >
                    <span class='material-symbols-outlined'> edit </span>
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

const storeTasks = () => {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksString);
};
