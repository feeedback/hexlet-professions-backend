/* eslint-disable react/prop-types */
/* eslint-disable max-classes-per-file */
// sc: https://ru.hexlet.io/courses/js-react/lessons/nested-components/exercise_unit

// Реализуйте простой Todo, с возможностью добавлять и удалять заметки.

// src/TodoBox.js
// Основной компонент, который выводит форму для добавления новой записи и выводит
// список заметок на экран.

// Начальный HTML:

// <div>
//   <div class="mb-3">
//     <form class="todo-form form-inline mx-3">
//       <div class="form-group">
//         <input type="text" value="" required="" class="form-control mr-3" placeholder="I am going...">
//       </div>
//       <button type="submit" class="btn btn-primary">add</button>
//     </form>
//   </div>
// </div>

// src/Item.jsx
// Отрисовывает конкретный элемент списка. Принимает на вход свойства:

// task
// onRemove
// HTML с добавленными заметками:

// <div>
//   <div class="mb-3">
//     <form class="todo-form form-inline mx-3">
//       <div class="form-group">
//         <input type="text" value="" required="" class="form-control mr-3" placeholder="I am going...">
//       </div>
//       <button type="submit" class="btn btn-primary">add</button>
//     </form>
//   </div>
//   <div>
//     <div class="row">
//       <div>
//         <button type="button" class="btn btn-primary btn-sm">-</button>
//       </div>
//       <div class="col-10">second</div>
//     </div>
//     <hr>
//   </div>
//   <div>
//     <div class="row">
//       <div>
//         <button type="button" class="btn btn-primary btn-sm">-</button>
//       </div>
//       <div class="col-10">first</div>
//     </div>
//     <hr>
//   </div>
// </div>
// Добавление элементов происходит в обратном порядке. Новые всегда сверху.

// Подсказки
// Для получения нового id используйте функцию uniqueId.

// src/TodoBox.jsx
import { uniqueId } from 'lodash';
import React from 'react';
// import Item from './Item.jsx';

// BEGIN (write your solution here)
export default class TodoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTaskText: '', tasks: [] };
  }

  handleAddTask = (event) => {
    event.preventDefault();
    const { currentTaskText, tasks } = this.state;

    const newTask = { id: uniqueId(), text: currentTaskText };
    this.setState({ currentTaskText: '', tasks: [newTask, ...tasks] });
  };

  handleRemoveTask = (id) => () => {
    const { tasks } = this.state;
    this.setState({ tasks: tasks.filter((item) => item.id !== id) });
  };

  handleChangeTask = (event) => {
    const { value } = event.target;
    this.setState({ currentTaskText: value });
  };

  renderForm() {
    const { currentTaskText } = this.state;
    return (
      <form onSubmit={this.handleAddTask} className="todo-form form-inline mx-3">
        <div className="form-group">
          <input
            type="text"
            value={currentTaskText}
            required
            className="form-control mr-3"
            placeholder="I am going..."
            onChange={this.handleChangeTask}
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

    return (
      <div>
        <div className="mb-3">{this.renderForm()}</div>
        {tasks.map((task) => (
          <div key={task.id}>
            <Item task={task} onRemove={this.handleRemoveTask(task.id)} />
            <hr />
          </div>
        ))}
      </div>
    );
  }
}
// END

// src/Item.jsx
/* eslint-disable react/prefer-stateless-function */
// import React from 'react';

// BEGIN (write your solution here)
class Item extends React.Component {
  render() {
    const { task, onRemove } = this.props;

    return (
      <div className="row">
        <div>
          <button type="button" className="btn btn-primary btn-sm" onClick={onRemove}>
            -
          </button>
        </div>
        <div className="col-10">{task.text}</div>
      </div>
    );
  }
}
// export default Item;
// END
