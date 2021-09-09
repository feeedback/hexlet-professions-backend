/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// sc: https://ru.hexlet.io/courses/js-redux/lessons/connect-actions/exercise_unit

// Реализуйте компонент <Panel />, который добавит в наше приложение две кнопки:

// Generate - создает 5 новых (и случайных) задач взамен уже добавленных
// Clean - очищает текущий список задач
// actions/index.js
// Реализуйте необходимые действия.

// export default combineReducers({
//   text,
//   tasks,
// });

// components/Panel.js
// Реализуйте необходимую логику.

import React from 'react';

export const updateNewTaskText = (text) => ({
  type: 'TEXT_UPDATE',
  payload: {
    text,
  },
});

export const addTask = (task) => ({
  type: 'TASK_ADD',
  payload: {
    task,
  },
});

export const removeTask = (id) => ({
  type: 'TASK_REMOVE',
  payload: {
    id,
  },
});

// BEGIN (write your solution here)
export const removeAllTasks = () => ({
  type: 'TASK_REMOVE_ALL',
  payload: {},
});

export const replaceTasksBy = (tasks) => ({
  type: 'TASK_REPLACE',
  payload: {
    tasks,
  },
});
// END

// reducers/index.js
// Реализуйте необходимые обработчики.
// @ts-check

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

const tasks = (state = [], action) => {
  switch (action.type) {
    case 'TASK_ADD': {
      return [action.payload.task, ...state];
    }
    case 'TASK_REMOVE': {
      return state.filter((t) => t.id !== action.payload.id);
    }
    // BEGIN (write your solution here)
    case 'TASK_REMOVE_ALL': {
      return [];
    }
    case 'TASK_REPLACE': {
      return action.payload.tasks;
    }
    // END
    default:
      return state;
  }
};
// import _ from 'lodash';
// import { connect } from 'react-redux';
// import faker from '../faker.js';
// import * as actions from '../actions/index.js';

// BEGIN (write your solution here)
const actionCreators = {
  removeAllTasks: actions.removeAllTasks,
  replaceTasksBy: actions.replaceTasksBy,
};

class Panel extends React.Component {
  handleGenerateTasks = () => {
    const { replaceTasksBy } = this.props;
    const getNewTask = () => ({
      id: _.uniqueId(),
      text: faker.lorem.sentence(),
    });
    const newTasks = _.times(5, getNewTask);
    replaceTasksBy(newTasks);
  };

  render() {
    const { removeAllTasks } = this.props;

    return (
      <div className="py-3">
        <button
          type="button"
          data-test="clean"
          className="btn btn-warning btn-sm mr-3"
          onClick={removeAllTasks}
        >
          Clean
        </button>
        <button
          type="button"
          data-test="generate"
          className="btn btn-primary btn-sm"
          onClick={this.handleGenerateTasks}
        >
          Generate
        </button>
      </div>
    );
  }
}

export default connect(null, actionCreators)(Panel);
// END

// components/Tasks.js
// Реализуйте компонент <Tasks />, отвечающий за вывод добавленных задач.
// BEGIN (write your solution here)
// import React from 'react';
// import _ from 'lodash';
// import { connect } from 'react-redux';
// import * as actions from '../actions/index.js';

// const mapStateToProps = (state) => {
//     const props = {
//         tasks: state.tasks,
//     };
//     return props;
// };

// const actionCreators = {
//     removeTask: actions.removeTask,
// };

// class Tasks extends React.Component {
//     handleDeleteTask = (id) => () => {
//         const { removeTask } = this.props;
//         removeTask(id);
//     };

//     render() {
//         const { tasks } = this.props;
//         if (tasks.length === 0) {
//             return null;
//         }
//         return (
//             <div className="mt-3">
//                 <ul className="list-group">
//                     {tasks.map((task) => (
//                         <li key={task.id} className="list-group-item d-flex">
//                             <span className="mr-auto">{task.text}</span>
//                             <button
//                                 type="button"
//                                 className="close"
//                                 onClick={this.handleDeleteTask(task.id)}
//                             >
//                                 <span>&times;</span>
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     }
// }
// export default connect(mapStateToProps, actionCreators)(Tasks);
// END
// Для создания новой задачи используйте такую конструкцию:

// { id: _.uniqueId(), text: faker.lorem.sentence() };
// HTML
// <div class="col-5">
//   <form action="" class="form-inline">
//     <div class="form-group mx-sm-3">
//       <input type="text" required="" value="">
//     </div>
//     <input type="submit" class="btn btn-primary btn-sm" value="Add">
//   </form>
//   <div class="py-3">
//     <button type="button" data-test="clean" class="btn btn-warning btn-sm mr-3">
//            Clean</button >
//     <button type="button" data-test="generate" class="btn btn-primary btn-sm">
//            Generate</button >
//   </div>
//   <div class="mt-3">
//     <ul class="list-group">
//       <li class="list-group-item d-flex">
//         <span class="mr-auto">Quia voluptatem quia et vel assumenda rerum quas.</span>
//         <button type="button" class="close"><span>×</span></button>
//       </li>
//     </ul>
//   </div>
// </div>
