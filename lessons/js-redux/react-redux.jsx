/* eslint-disable */
// sc: https://ru.hexlet.io/courses/js-redux/lessons/react-redux/exercise_unit

// Реализуйте приложение "список задач", которое умеет две вещи:

// Добавлять задачи в список
// Удалять задачи из списка
// src/index.jsx
// Оберните приложение в провайдер и примонтируйте к элементу с идентификатором container.

import React from 'react';
// END

// export default combineReducers({
//     text,
//     tasks,
// });

// src/components/App.jsx
// Реализуйте компонент <App>

// import React from 'react';
// import { connect } from 'react-redux';
import _ from 'lodash';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import reducers from './reducers/index.js';
// import App from './components/App.jsx';

/* eslint-disable no-underscore-dangle */
// const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );

// BEGIN (write your solution here)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
);
// END

// src/actions/index.js
// Реализуйте необходимые действия.
export const updateNewTaskText = (text) => ({
  type: 'TEXT_UPDATE',
  payload: {
    text,
  },
});

// BEGIN (write your solution here)
export const addTask = (task) => ({
  type: 'TASK_ADD',
  payload: {
    task,
  },
});
export const removeTask = (id) => ({
  type: 'TEXT_REMOVE',
  payload: {
    id,
  },
});
// END

// src/reducers/index.js
// Реализуйте необходимую логику.

// import { combineReducers } from 'redux';

const text = (state = '', action) => {
  switch (action.type) {
    case 'TEXT_UPDATE': {
      return action.payload.text;
    }
    case 'TASK_ADD': {
      return '';
    }
    default:
      return state;
  }
};

// BEGIN (write your solution here)
const tasks = (state = [], action) => {
  switch (action.type) {
    case 'TASK_ADD': {
      return [action.payload.task, ...state];
    }
    case 'TEXT_REMOVE': {
      return state.filter((task) => task.id !== action.payload.id);
    }
    default:
      return state;
  }
};
// import { updateNewTaskText, addTask, removeTask } from '../actions/index.js';

// BEGIN (write your solution here)
// Эта функция, берет нужные данные из контейнера и отдаёт их компоненту
// Компоненту TasksBox нужны задачи
const mapStateToProps = (state) => {
  const props = {
    text: state.text,
    tasks: state.tasks,
  };
  return props;
};

class App extends React.Component {
  handleChangeValue = (event) => {
    const { dispatch } = this.props;
    const newValue = event.target.value;
    dispatch(updateNewTaskText(newValue));
  };

  handleAddTask = (event) => {
    event.preventDefault();
    const { dispatch, text } = this.props;
    const task = { id: _.uniqueId(), text };
    dispatch(addTask(task));
  };

  handleDeleteTask = (id) => () => {
    const { dispatch } = this.props;
    dispatch(removeTask(id));
  };

  renderForm() {
    const { text } = this.props;
    return (
      <form action="" className="form-inline" onSubmit={this.handleAddTask}>
        <div className="form-group mx-sm-3">
          <input type="text" required value={text} onChange={this.handleChangeValue} />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Add
        </button>
      </form>
    );
  }

  renderTask() {
    const { tasks } = this.props;
    if (tasks.length === 0) {
      return null;
    }
    return (
      <div className="mt-3">
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item d-flex">
              <span className="mr-auto">{task.text}</span>
              <button type="button" className="close" onClick={this.handleDeleteTask(task.id)}>
                <span>&times;</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="col-5">
        {this.renderForm()}
        {this.renderTask()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
// END

// HTML
// Начальный
// <div class="col-5">
//   <form action="" class="form-inline">
//     <div class="form-group mx-sm-3">
//       <input type="text" required value="">
//     </div>
//     <button type="submit" class="btn btn-primary btn-sm">Add</button>
//   </form>
// </div>
// HTML после добавления двух задач
// <div class="col-5">
//   <form action="" class="form-inline">
//     <div class="form-group mx-sm-3">
//       <input type="text" required value="">
//     </div>
//     <button type="submit" class="btn btn-primary btn-sm">Add</button>
//   </form>
//   <div class="mt-3">
//     <ul class="list-group">
//       <li class="list-group-item d-flex">
//         <span class="mr-auto">second Task!</span>
//         <button type="button" class="close">
//           <span>&times;</span>
//         </button>
//       </li>
//       <li class="list-group-item d-flex">
//         <span class="mr-auto">first Task!</span>
//         <button type="button" class="close">
//           <span>&times;</span>
//         </button>
//       </li>
//     </ul>
//   </div>
// </div>
