// sc: https://ru.hexlet.io/courses/js-frontend-architecture/lessons/shape-of-state/exercise_unit

// Эта задача не сложная алгоритмически, но довольно объемная. На решение
// потребуется время и это хорошая прокачка

// В этой задаче вам предстоит сделать список задач похожий на Reminders из MacOS.
// Reminder позволяет планировать задачи и создавать списки задач. По умолчанию, в
// нашей реализации сразу должен быть создан канал General. Начальный HTML
// доступен в public/index.html. После инициализации js он становится таким (туда
// добавляется General):

// <div class="row">
//   <div class="col-2">
//     <h3>Lists</h3>
//     <div data-container="lists"><ul><li><b>General</b></li></ul></div>
//     <form data-container="new-list-form">
//       <input type="text" class="form-control mb-2" name="name">
//       <input type="submit" class="btn btn-primary btn-sm" value="Add">
//     </form>
//   </div>
//   <div class="col-10">
//     <h3>Tasks</h3>
//     <form class="form-inline" data-container="new-task-form">
//       <input type="text" class="form-control mr-2" name="name">
//       <input type="submit" class="btn btn-primary" value="Add">
//     </form>
//     <div data-container="tasks">
//     </div>
//   </div>
// </div>
// После добавления первой задачи в канал General:

// <div class="row">
//   <div class="col-2">
//     <h3>Lists</h3>
//     <div data-container="lists"><ul><li><b>General</b></li></ul></div>
//     <form data-container="new-list-form">
//       <input type="text" class="form-control mb-2" name="name">
//       <input type="submit" class="btn btn-primary btn-sm" value="Add">
//     </form>
//   </div>
//   <div class="col-10">
//     <h3>Tasks</h3>
//     <form class="form-inline" data-container="new-task-form">
//       <input type="text" class="form-control mr-2" name="name">
//       <input type="submit" class="btn btn-primary" value="Add">
//     </form>
//     <div data-container="tasks"><ul><li>My First Task</li></ul></div>
//   </div>
// </div>
// После создания нового канала (но до переключения на него):

// <div class="row">
//   <div class="col-2">
//     <h3>Lists</h3>
//     <div data-container="lists">
//       <ul><li><b>General</b></li><li><a href="#random">Random</a></li></ul>
//     </div >
//     <form data-container="new-list-form">
//       <input type="text" class="form-control mb-2" name="name">
//       <input type="submit" class="btn btn-primary btn-sm" value="Add">
//     </form>
//   </div>
//   <div class="col-10">
//     <h3>Tasks</h3>
//     <form class="form-inline" data-container="new-task-form">
//       <input type="text" class="form-control mr-2" name="name">
//       <input type="submit" class="btn btn-primary" value="Add">
//     </form>
//     <div data-container="tasks"><ul><li>My First Task</li></ul></div>
//   </div>
// </div>
// После переключения на канал Random:

// <div class="row">
//   <div class="col-2">
//     <h3>Lists</h3>
//     <div data-container="lists">
//     <ul><li><a href="#general">General</a></li><li><b>Random</b></li></ul>
//     </div>
//     <form data-container="new-list-form">
//       <input type="text" class="form-control mb-2" name="name">
//       <input type="submit" class="btn btn-primary btn-sm" value="Add">
//     </form>
//   </div>
//   <div class="col-10">
//     <h3>Tasks</h3>
//     <!-- Форма добавления задачи добавляет задачу в текущий активный канал -->
//     <form class="form-inline" data-container="new-task-form">
//       <input type="text" class="form-control mr-2" name="name">
//       <input type="submit" class="btn btn-primary" value="Add">
//     </form>
//     <div data-container="tasks"></div>
//   </div>
// </div>

// src/application.js
// Экспортируйте функцию по умолчанию, которая реализует всю необходимую логику.

// BEGIN (write your solution here)
const mapElementView = {
    list: (name, state) => {
        const listState = {
            current: `<b>${name}</b>`,
            inactive: `<a href="#${name.toLowerCase()}">${name}</a>`,
        };
        return name === state.currentList ? listState.current : listState.inactive;
    },
    task: (name) => `${name}`,
};

const renderNew = (elements, type, newName, state) => {
    const wrapper = elements[`${type}sContainer`];
    let ul = wrapper.querySelector('ul');
    if (!ul) {
        wrapper.append(document.createElement('ul'));
        ul = wrapper.querySelector('ul');
    }

    const li = document.createElement('li');
    li.innerHTML = mapElementView[type](newName, state);
    ul.append(li);
};

const renderAll = (elements, state) => {
    elements.listsContainer.innerHTML = '';
    elements.tasksContainer.innerHTML = '';

    state.lists.forEach((list) => renderNew(elements, 'list', list.name, state));
    const currentListTasks = state.tasks.filter(
        (task) => task.listName === state.currentList
    );
    currentListTasks.forEach((task) => renderNew(elements, 'task', task.name, state));
};

export default () => {
    const elements = {
        listsContainer: document.querySelector('[data-container="lists"]'),
        tasksContainer: document.querySelector('[data-container="tasks"]'),
        listAddForm: document.querySelector('[data-container="new-list-form"]'),
        taskAddForm: document.querySelector('[data-container="new-task-form"]'),
    };

    const state = {
        lists: [{ name: 'General' }],
        currentList: 'General',
        tasks: [],
    };

    const fabric = {
        createList: (name) => ({ name }),
        createTask: (name, currentList) => ({ name, listName: currentList }),
    };

    elements.listAddForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newListName = new FormData(event.target).get('name');
        if (newListName === '') {
            return;
        }
        state.lists.push(fabric.createList(newListName));
        renderNew(elements, 'list', newListName, state);
    });
    elements.taskAddForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTaskName = new FormData(event.target).get('name');
        if (newTaskName === '') {
            return;
        }
        state.tasks.push(fabric.createTask(newTaskName, state.currentList));
        renderNew(elements, 'task', newTaskName, state);
    });

    elements.listsContainer.addEventListener('click', (event) => {
        const element = event.target;
        if (element.nodeName !== 'A') {
            return;
        }
        event.preventDefault();
        state.currentList = element.textContent;
        renderAll(elements, state);
    });
    renderAll(elements, state);
};
// END
