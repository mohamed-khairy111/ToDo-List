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

const fillTasksOnThePage = () => {
  alltasks.innerHTML = '';

  for (task of tasks) {
    let content = `<div id="task" class='task'>
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
                  style='
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 20%;
                  '
                >
                  <button
                    id="delete"
                    class='circular'
                    style='background-color: rgb(114, 0, 0); color: white'
                  >
                    <span class='material-symbols-outlined'> delete </span>
                  </button>
                  <button
                    onclick="deleteTask()"
                    id='check'
                    class='circular'
                    style='background-color: rgb(0, 150, 30); color: white'
                  >
                    <span class='material-symbols-outlined'> check </span>
                  </button>
                  <button
                    id="edit"
                    class='circular'
                    style='background-color: rgb(0, 16, 197, 0.692); color: white'
                  >
                    <span class='material-symbols-outlined'> edit </span>
                  </button>
                </div>
                
              </div>`;

    alltasks.innerHTML += content;
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
  if (task) {
    tasks.push(takobj);
    fillTasksOnThePage();
  }
});

const deleteTask = () => {};
