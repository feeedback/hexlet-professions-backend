/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
// sc: https://ru.hexlet.io/courses/js-redux/lessons/redux-actions/exercise_unit

// Допишите добавление и удаление задач используя redux-actions

// src/actions/index.js
// Реализуйте необходимые действия

// import { createAction } from 'redux-actions';

// export const updateNewTaskText = createAction('TEXT_UPDATE');

// BEGIN (write your solution here)
// END

// export default combineReducers({
//     taskText,
//     tasks,
// });

// src/components/NewTaskForm.jsx
// Реализуйте необходимые обработчики
import React from 'react';
import _ from 'lodash';

export const addTask = createAction('TASK_ADD');
export const removeTask = createAction('TASK_REMOVE');
// END

// src/reducers/index.js
// Реализуйте редьюсеры
// import { combineReducers } from 'redux';
// import { handleActions } from 'redux-actions';
// import * as actions from '../actions/index.js';

// BEGIN (write your solution here)
const defaultState = {
  taskText: '',
  tasks: [],
};
const taskText = handleActions(
  {
    [actions.updateNewTaskText](state, { payload: { text } }) {
      return text;
    },
    [actions.addTask]() {
      return '';
    },
  },
  defaultState.taskText
);

const tasks = handleActions(
  {
    [actions.addTask](state, { payload: { task } }) {
      return [task, ...state];
    },
    [actions.removeTask](state, { payload: { id } }) {
      return state.filter((t) => t.id !== id);
    },
  },
  defaultState.tasks
);
// import { connect } from 'react-redux';
// import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { taskText } = state;
  return { text: taskText };
};

const actionCreators = {
  updateNewTaskText: actions.updateNewTaskText,
  addTask: actions.addTask,
};

class NewTaskForm extends React.Component {
  // BEGIN (write your solution here)
  handleUpdateNewTaskText = (event) => {
    const { updateNewTaskText } = this.props;
    const newValue = event.target.value;
    updateNewTaskText({ text: newValue });
  };

  handleAddTask = (event) => {
    event.preventDefault();
    const { text, addTask } = this.props;
    const task = { id: _.uniqueId(), text };
    addTask({ task });
  };
  // END

  render() {
    const { text } = this.props;

    return (
      <form action="" className="form-inline" onSubmit={this.handleAddTask}>
        <div className="form-group mx-sm-3">
          <input
            type="text"
            data-testid="input"
            required
            value={text}
            onChange={this.handleUpdateNewTaskText}
          />
        </div>
        <input type="submit" data-testid="submit" className="btn btn-primary btn-sm" value="Add" />
      </form>
    );
  }
}

// export default connect(mapStateToProps, actionCreators)(NewTaskForm);

// src/components/Tasks.jsx
// Реализуйте необходимые обработчики
// import React from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions/index.js';

// const mapStateToProps = (state) => {
//   const { tasks } = state;
//   return { tasks };
// };

// const actionCreators = {
//   removeTask: actions.removeTask,
// };

class Tasks extends React.Component {
  // BEGIN (write your solution here)
  handleRemoveTask = (id) => () => {
    const { removeTask } = this.props;
    removeTask({ id });
  };
  // END

  render() {
    const { tasks } = this.props;

    if (tasks.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        <ul className="list-group">
          {tasks.map(({ id, text }) => (
            <li key={id} className="list-group-item d-flex">
              <span className="mr-auto">{text}</span>
              <button type="button" className="close" onClick={this.handleRemoveTask(id)}>
                <span>&times;</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// export default connect(mapStateToProps, actionCreators)(Tasks);
