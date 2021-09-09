/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-redux/lessons/async-actions/exercise_unit

// Реализуйте взаимодействие с бекендом для создания задач.

// Доступные урлы описаны в файле routes.js

// src/actions/index.js
// Реализуйте необходимые действия

// import axios from 'axios';
// import { createAction } from 'redux-actions';

// import routes from '../routes.js';

// src/components/NewTaskForm.jsx
// Реализуйте вывод формы и ее обработчик. Учтите следующие моменты:

// Поле для ввода должно быть заблокировано во время отправки формы.
// Кнопка должна быть заблокирована во время отправки и до начала каких-либо
// действий с формой.
// Вам не нужно отслеживать эти состояния руками. Для этого redux_form передает
// соответствующие пропсы:
// submitting
// pristine

import React from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
// import * as actions from '../actions/index.js';

// const mapStateToProps = (state) => {
//   const props = {};
//   return props;
// };

const actionCreators = {
  addTask: actions.addTask,
};

class NewTaskForm extends React.Component {
  // BEGIN (write your solution here)
  handleSubmit = async (values) => {
    const { addTask, reset } = this.props;
    try {
      await addTask({ task: values });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  };
  // END

  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;
    // BEGIN (write your solution here)
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className="form-inline">
        <div className="form-group mx-3">
          <Field component="input" name="text" required type="text" value="" disabled={submitting} />
        </div>
        <input
          type="submit"
          disabled={submitting || pristine}
          className="btn btn-primary btn-sm"
          value="Add"
        />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
    // END
  }
}

const ConnectedNewTaskForm = connect(null, actionCreators)(NewTaskForm);
export default reduxForm({
  form: 'newTask',
})(ConnectedNewTaskForm);

// src/index.jsx
// Подключите мидлвару thunk.

// import React from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { createStore, applyMiddleware, compose } from 'redux';
// import reducers from './reducers/index.js';
// import App from './components/App.jsx';
// import { fetchTasks } from './actions/index.js';

// src/reducers/index.js
// Добавьте редьюсер для отслеживания состояния удаления

// import React from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { createStore, applyMiddleware, compose } from 'redux';
// import reducers from './reducers/index.js';
// import App from './components/App.jsx';
// import { fetchTasks } from './actions/index.js';

// eslint-disable-next-line no-underscore-dangle
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

const store = createStore(
  reducers,
  compose(
    // BEGIN (write your solution here)
    applyMiddleware(thunk),
    // END
    devtoolMiddleware
  )
);

store.dispatch(fetchTasks());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
);

export const fetchTasksRequest = createAction('TASKS_FETCH_REQUEST');
export const fetchTasksSuccess = createAction('TASKS_FETCH_SUCCESS');
export const fetchTasksFailure = createAction('TASKS_FETCH_FAILURE');

export const removeTaskRequest = createAction('TASK_REMOVE_REQUEST');
export const removeTaskSuccess = createAction('TASK_REMOVE_SUCCESS');
export const removeTaskFailure = createAction('TASK_REMOVE_FAILURE');

// BEGIN (write your solution here)
export const addTaskSuccess = createAction('TASK_ADD_SUCCESS');

export const addTask = ({ task }) => async (dispatch) => {
  const response = await axios.post(routes.tasksUrl(), { task });
  dispatch(addTaskSuccess({ task: response.data }));
};

export const removeTask = ({ id }) => async (dispatch) => {
  dispatch(removeTaskRequest());
  try {
    const url = routes.taskUrl(id);
    const response = await axios.delete(url);
    dispatch(removeTaskSuccess({ id }));
  } catch (e) {
    dispatch(removeTaskFailure());
    throw e;
  }
};
// END

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const url = routes.tasksUrl();
    const response = await axios.get(url);
    dispatch(fetchTasksSuccess({ tasks: response.data }));
  } catch (e) {
    dispatch(fetchTasksFailure());
    throw e;
  }
};

// BEGIN (write your solution here)
const taskRemovingState = handleActions(
  {
    [actions.removeTaskRequest]() {
      return 'requested';
    },
    [actions.removeTaskFailure]() {
      return 'failed';
    },
    [actions.removeTaskSuccess]() {
      return 'finished';
    },
  },
  'none'
);
// END

const tasksFetchingState = handleActions(
  {
    [actions.fetchTasksRequest]() {
      return 'requested';
    },
    [actions.fetchTasksFailure]() {
      return 'failed';
    },
    [actions.fetchTasksSuccess]() {
      return 'finished';
    },
  },
  'none'
);

const tasks = handleActions(
  {
    [actions.fetchTasksSuccess](state, { payload }) {
      return {
        byId: _.keyBy(payload.tasks, 'id'),
        allIds: payload.tasks.map((t) => t.id),
      };
    },
    [actions.addTaskSuccess](state, { payload: { task } }) {
      const { byId, allIds } = state;
      return {
        byId: { ...byId, [task.id]: task },
        allIds: [task.id, ...allIds],
      };
    },
    [actions.removeTaskSuccess](state, { payload: { id } }) {
      const { byId, allIds } = state;
      return {
        byId: _.omit(byId, id),
        allIds: _.without(allIds, id),
      };
    },
  },
  { byId: {}, allIds: [] }
);

// export default combineReducers({
//   taskRemovingState,
//   tasksFetchingState,
//   tasks,
//   form: formReducer,
// });

// HTML
// Начальный вариант формы
// <form class="form-inline">
//   <div class="form-group mx-3">
//     <input name="text" required="" type="text" value="">
//   </div>
//   <input type="submit" disabled="" class="btn btn-primary btn-sm" value="Add">
// </form>
// После ввода данных
// <form class="form-inline">
//   <div class="form-group mx-3">
//     <input name="text" required="" type="text" value="new tasks">
//   </div>
//   <input type="submit" class="btn btn-primary btn-sm" value="Add">
// </form>
