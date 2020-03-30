/* eslint-disable no-unused-vars */
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

/* eslint-disable no-param-reassign */

import _ from 'lodash';

// BEGIN (write your solution here)
const mapStateView = {
    list: (name, state) => {
        if (name === state.currentList) {
            return `<ul><li><b>${name}</b></li></ul>`;
        }
        return `<li><a href="#${name.lowercase()}">${name}</a></li></ul>`;
    },
    task: (name) => `<ul><li>${name}</li></ul>`,
    // <div data-container="tasks">
};
const render = (type, newName, state) => {
    const wrapper = document.querySelector(`[data-container="${type}s"]`);
    const html = mapStateView[type](newName, state);
    wrapper.innerHTML += html;
};
export default () => {
    const state = {
        lists: [
            { name: 'General' },
            { name: 'Today task' },
            { name: 'AnyRandomSomething' },
        ],
        currentList: 'General',
        tasks: [
            { listName: 'General', name: 'Открой редактор!' },
            { listName: 'General', name: 'Открой!' },
            { listName: 'Any', name: 'Открой редактор!' },
        ],
    };
    const currentTasks = state.tasks.filter(
        (task) => task.listName === state.currentList
    );

    const formList = document.querySelector('[data-container="new-list-form"]');
    const formTask = document.querySelector('[data-container="new-task-form"]');

    formList.addEventListener('submit', (event) => {
        event.preventDefault();
        const newListName = new FormData(formList).get('name');
        state.lists.push({ name: newListName });
        render(newListName, state);
    });
    formTask.addEventListener('submit', '');
};

// END
