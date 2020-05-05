/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-redux/lessons/reducers/exercise_unit

// reducers.js
// Реализуйте в Store следующую структуру состояния:

// {
//   comments: {
//     1: { id: 1, taskId: 1, body: 'comment 1' },
//     2: { id: 2, taskId: 1, body: 'comment 2' },
//     5: { id: 5, taskId: 2, body: 'another comment' },
//   },
//   tasks: {
//     1: { id: 1, name: 'first task' },
//     2: { id: 2, name: 'second task' },
//   },
// }
// Store должен уметь обрабатывать перечисленные в файле actions.js действия.

import _ from 'lodash';
import { combineReducers } from 'redux';

const comments = (state = {}, action) => {
    // BEGIN (write your solution here)
    switch (action.type) {
        case 'TASK_COMMENT_ADD': {
            const newComment = action.payload.comment;
            return { ...state, [newComment.id]: newComment };
        }

        case 'TASK_COMMENT_REMOVE': {
            return _.omit(state, action.payload.id);
        }

        case 'TASK_REMOVE': {
            const taskId = action.payload.id;
            return _.omitBy(state, (comment) => comment.taskId === taskId);
        }

        default:
            return state;
    }
    // END
};

const tasks = (state = {}, action) => {
    // BEGIN (write your solution here)
    switch (action.type) {
        case 'TASK_ADD': {
            const newTask = action.payload.task;
            return { ...state, [newTask.id]: newTask };
        }

        case 'TASK_REMOVE': {
            const taskId = action.payload.id;
            return _.omit(state, taskId);
        }

        default:
            return state;
    }
    // END
};

export default combineReducers({
    comments,
    tasks,
});

// export const addTask = (task) => ({
//   type: 'TASK_ADD',
//   payload: {
//     task,
//   },
// });

// export const removeTask = (id) => ({
//   type: 'TASK_REMOVE',
//   payload: {
//     id,
//   },
// });

// export const addTaskComment = (comment) => ({
//   type: 'TASK_COMMENT_ADD',
//   payload: {
//     comment,
//   },
// });

// export const removeTaskComment = (id) => ({
//   type: 'TASK_COMMENT_REMOVE',
//   payload: {
//     id,
//   },
// });
