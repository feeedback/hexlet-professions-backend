/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-redux/lessons/redux/exercise_unit

// store.js
// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход
// начальное состояние, а возвращает store. Store должен обрабатывать действия
// перечисленные в actions.js.

// Структура состояния в store: { [task.id]: task, [task2.id]: task2 }.

// Подсказки
// Обязательно изучите файл actions.js и тесты. Отследите весь путь движения данных.
// Для удаления из объекта воспользуйтесь функцией omit, взятой из библиотеки lodash.

import { omit } from 'lodash';
import { createStore } from 'redux';

// BEGIN (write your solution here)
const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'TASK_ADD': {
            const newTask = action.payload.task;
            return { ...state, [newTask.id]: newTask };
        }
        case 'TASK_REMOVE': {
            const taskId = action.payload.id;
            return omit(state, taskId);
        }
        default:
            return state;
    }
};
export default (init) => {
    const store = createStore(reducer, init);
    return store;
};
// END

// export const addTask = (task) => ({
//     type: 'TASK_ADD',
//     payload: {
//         task,
//     },
// });

// export const removeTask = (id) => ({
//     type: 'TASK_REMOVE',
//     payload: {
//         id,
//     },
// });
