/* eslint-disable react/prop-types */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-react/lessons/component-lifecycle/exercise_unit

// В этом упражнении необходимо реализовать записную книжку, которая
// взаимодействует с бекендом по следующим урлам:

// GET /tasks - получить список задач.
// Формат ответа -
// [{"id":1,"text":"asdf","state":"finished"},{"id":2,"text":"asdasd","state":"active"}]

// POST /tasks - создать новую задачу.
// Формат запроса - {"text": "new task"}
// Формат ответа - {"id":4,"text":"new task","state":"active"}
// PATCH /tasks/:id/finish - завершить задачу.
// Формат ответа - {"id":1,"text":"asdf","state":"finished"}
// PATCH /tasks/:id/activate - переоткрыть завершенную задачу -
// {"id":1,"text":"asdf","state":"active"}

// Начальный HTML:
// <div>
//   <div class="mb-3">
//     <form class="todo-form form-inline mx-3">
//       <div class="form-group">
//         <input type="text" value="" required=""
//            class="form-control mr-3" placeholder = "I am going..." >
//       </div>
//       <button type="submit" class="btn btn-primary">add</button>
//     </form>
//   </div>
// </div>

// HTML после того как добавлены последовательно три задачи "first task", "second
// task" и "another task".
// <div>
//   <div class="mb-3">
//     <form class="todo-form form-inline mx-3">
//       <div class="form-group">
//         <input type="text" value="" required=""
//             class="form-control mr-3" placeholder = "I am going..." >
//       </div>
//       <button type="submit" class="btn btn-primary">add</button>
//     </form>
//   </div>
//   <div class="todo-active-tasks">
//     <div class="row">
//       <div class="col-1">3</div>
//       <div class="col">
//         <a href="#" class="todo-task">another task</a>
//       </div>
//     </div>
//     <div class="row">
//       <div class="col-1">2</div>
//       <div class="col">
//         <a href="#" class="todo-task">second task</a>
//       </div>
//     </div>
//     <div class="row">
//       <div class="col-1">1</div>
//       <div class="col">
//         <a href="#" class="todo-task">first task</a>
//       </div>
//     </div>
//   </div>
// </div>

// На последнюю добавленную был совершен клик, который перевел задачу в выполненные:
// <div>
//   <div class="mb-3">
//     <form class="todo-form form-inline mx-3">
//       <div class="form-group">
//         <input type="text" value="" required=""
//              class="form-control mr-3" placeholder = "I am going..." >
//       </div>
//       <button type="submit" class="btn btn-primary">add</button>
//     </form>
//   </div>
//   <div class="todo-active-tasks">
//     <div class="row">
//       <div class="col-1">2</div>
//       <div class="col">
//         <a href="#" class="todo-task">second task</a>
//       </div>
//     </div>
//     <div class="row">
//       <div class="col-1">1</div>
//       <div class="col">
//         <a href="#" class="todo-task">first task</a>
//       </div>
//     </div>
//   </div>
//   <div class="todo-finished-tasks">
//     <div class="row">
//       <div class="col-1">3</div>
//       <div class="col">
//         <s><a href="#" class="todo-task">another task</a></s>
//       </div>
//     </div>
//   </div>
// </div>

// src/Item.jsx
// Реализуйте компонент <Item> отвечающий за вывод конкретной записи.
/* eslint-disable react/prefer-stateless-function, jsx-a11y/anchor-is-valid */
// import React from 'react';
// BEGIN (write your solution here)
// END

// src/TodoBox.jsx
// Реализуйте компонент <TodoBox>.

// Первоначальная подгрузка задач с сервера должна происходить сразу после
// монтирования компонента в DOM.

import axios from 'axios';
import React from 'react';
import update from 'immutability-helper';
// import Item from './Item.jsx';
import routes from './routes.js';

const Item = ({ task, onClick }) => {
  const taskLink = (
    <a href="#" className="todo-task" onClick={onClick}>
      {task.text}
    </a>
  );
  const taskEl = task.state === 'finished' ? <s>{taskLink}</s> : taskLink;
  return (
    <div className="row">
      <div className="col-1">{task.id}</div>
      <div className="col">{taskEl}</div>
    </div>
  );
};
// export default Item;

// BEGIN (write your solution here)
export default class TodoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newTaskValue: '', tasks: [] };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = async () => {
    const response = await axios.get(routes.tasksPath());
    this.setState({ tasks: response.data });
  };

  handleChangeValue = (event) => {
    const { value: newTaskValue } = event.target;
    this.setState({ newTaskValue });
  };

  handleAddNewTask = async (event) => {
    event.preventDefault();
    const { newTaskValue } = this.state;
    const response = await axios.post(routes.tasksPath(), { text: newTaskValue });
    const { tasks } = this.state;
    this.setState({ newTaskValue: '', tasks: [response.data, ...tasks] });
  };

  changeTaskState = (id, taskNewState) => {
    const { tasks } = this.state;
    const taskIndex = tasks.findIndex((item) => item.id === id);
    const updatedTasks = update(tasks, {
      [taskIndex]: { $merge: { state: taskNewState } },
    });
    this.setState({ tasks: updatedTasks });
  };

  handleCompleteTask = (id) => () => {
    this.changeTaskState(id, 'finished');
    axios.patch(routes.finishTaskPath(id));
  };

  handleReactiveTask = (id) => () => {
    this.changeTaskState(id, 'active');
    axios.patch(routes.activateTaskPath(id));
  };

  renderActiveTasks(tasks) {
    return (
      <div className="todo-active-tasks">
        {tasks.map((task) => (
          <Item key={task.id} task={task} onClick={this.handleCompleteTask(task.id)} />
        ))}
      </div>
    );
  }

  renderFinishedTasks(tasks) {
    return (
      <div className="todo-finished-tasks">
        {tasks.map((task) => (
          <Item key={task.id} task={task} onClick={this.handleReactiveTask(task.id)} />
        ))}
      </div>
    );
  }

  renderForm() {
    const { newTaskValue } = this.state;

    return (
      <form onSubmit={this.handleAddNewTask} className="todo-form form-inline mx-3">
        <div className="form-group">
          <input
            type="text"
            value={newTaskValue}
            required
            className="form-control mr-3"
            placeholder="I am going..."
            onChange={this.handleChangeValue}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          add
        </button>
      </form>
    );
  }

  render() {
    const { tasks } = this.state;
    const activeTasks = tasks.filter((task) => task.state === 'active');
    const finishedTasks = tasks.filter((task) => task.state === 'finished');

    return (
      <div>
        <div className="mb-3">{this.renderForm()}</div>
        {activeTasks.length ? this.renderActiveTasks(activeTasks) : null}
        {finishedTasks.length ? this.renderFinishedTasks(finishedTasks) : null}
      </div>
    );
  }
}
// END

// Подсказки
// Для генерации урлов в файле routes.js созданы специальные хелперы
