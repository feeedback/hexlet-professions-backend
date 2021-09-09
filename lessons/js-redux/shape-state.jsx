/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// sc: https://ru.hexlet.io/courses/js-redux/lessons/shape-state/exercise_unit

// Продолжаем улучшать наш todo. Добавим в него возможность изменять состояние
// завершенности задачи по клику. Если задача завершена, то она перечеркивается.

// src/reducers/index.js
// Реализуйте редьюсеры используя подход, описанный в теории

import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

// src/components/Tasks.jsx
// Реализуйте функцию mapStateToProps

/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions/index.js';

const tasks = handleActions(
  {
    [actions.addTask](state, { payload: { task } }) {
      const { byId, allIds } = state;
      return {
        byId: { ...byId, [task.id]: task },
        allIds: [task.id, ...allIds],
      };
    },
    [actions.removeTask](state, { payload: { id } }) {
      const { byId, allIds } = state;
      return {
        byId: _.omit(byId, id),
        allIds: _.without(allIds, id),
      };
    },
    // BEGIN (write your solution here)
    [actions.toggleTaskState](state, { payload: { id } }) {
      // NO lodash version
      // const task = state.byId[id];
      // const newState = task.state === 'active' ? 'finished' : 'active';
      // const updatedTask = { ...task, state: newState };
      // return {
      //     ...state,
      //     byId: { ...state.byId, [task.id]: updatedTask },
      // };

      const { byId, allIds } = state;
      const newById = _.update(byId, [id, 'state'], (taskState) =>
        taskState === 'active' ? 'finished' : 'active'
      );
      return {
        byId: newById,
        allIds,
      };
    },
    // END
  },
  { byId: {}, allIds: [] }
);

const text = handleActions(
  {
    [actions.addTask]() {
      return '';
    },
    [actions.updateNewTaskText](_state, { payload }) {
      return payload.text;
    },
  },
  ''
);

export default combineReducers({
  tasks,
  text,
});
// import * as actions from '../actions/index.js';

// BEGIN (write your solution here)
const mapStateToProps = (state) => {
  const {
    tasks: { byId, allIds },
  } = state;
  const tasks = allIds.map((id) => byId[id]);
  return { tasks };
};
// END

const actionCreators = {
  removeTask: actions.removeTask,
  toggleTaskState: actions.toggleTaskState,
};

class Tasks extends React.Component {
  handleRemoveTask = (id) => () => {
    const { removeTask } = this.props;
    removeTask({ id });
  };

  handleToggleTaskState = (id) => () => {
    const { toggleTaskState } = this.props;
    toggleTaskState({ id });
  };

  render() {
    const { tasks } = this.props;

    if (tasks.length === 0) {
      return null;
    }

    return (
      <div className="mt-3">
        <ul className="list-group">
          {tasks.map(({ id, text, state }) => (
            <li key={id} className="list-group-item d-flex">
              <span className="mr-auto">
                <a href="#" data-test="task-toggle-state" onClick={this.handleToggleTaskState(id)}>
                  {state === 'active' ? text : <s>{text}</s>}
                </a>
              </span>
              <button
                type="button"
                data-test="task-remove"
                className="close"
                onClick={this.handleRemoveTask(id)}
              >
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
