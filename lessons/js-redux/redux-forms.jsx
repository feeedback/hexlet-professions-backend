/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-redux/lessons/redux-forms/exercise_unit

// src/components/NewTaskForm.jsx
// Реализуйте недостающие части компонента <NewTaskForm />.

import React from 'react';
// import _ from 'lodash';
// import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
// import * as actions from '../actions/index.js';

const mapStateToProps = () => {
  const props = {};
  return props;
};

const actionCreators = {
  addTask: actions.addTask,
};

class NewTaskForm extends React.Component {
  // BEGIN (write your solution here)
  handleSubmit = ({ text }) => {
    const { addTask, reset } = this.props;
    const task = { id: _.uniqueId(), text, state: 'active' };
    reset();
    addTask({ task });
  };
  // END

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="form-inline" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group mx-3">
          <Field name="text" required component="input" type="text" />
        </div>
        <input type="submit" className="btn btn-primary btn-sm" value="Add" />
      </form>
    );
  }
}

const ConnectedNewTaskForm = connect(mapStateToProps, actionCreators)(NewTaskForm);
// BEGIN (write your solution here)
export default reduxForm({ form: 'newTask' })(ConnectedNewTaskForm);
// END

// src/reducers/index.js
// Подключите редьюсер библиотеки redux-form

// import _ from 'lodash';
// import { combineReducers } from 'redux';
// import { handleActions } from 'redux-actions';
// import { reducer as formReducer } from 'redux-form';
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
    [actions.toggleTaskState](state, { payload: { id } }) {
      const task = state.byId[id];
      const newState = task.state === 'active' ? 'finished' : 'active';
      const updatedTask = { ...task, state: newState };
      return {
        ...state,
        byId: { ...state.byId, [task.id]: updatedTask },
      };
    },
  },
  { byId: {}, allIds: [] }
);

// export default combineReducers({
//     tasks,
//     // BEGIN (write your solution here)
//     form: formReducer,
//     // END
// });
