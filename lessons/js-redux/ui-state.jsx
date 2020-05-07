/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
// sc: https://ru.hexlet.io/courses/js-redux/lessons/ui-state/exercise_unit

// src/components/Tasks.jsx
// Реализуйте компонент <Tasks />, добавив в него логику переключения "темы". Тема
// определяет классы, применяемые к конкретной задаче. По умолчанию используется
// светлая тема light. При клике на задачу она должна поменяться на dark. Классы
// для тем описаны в самом компоненте.

/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
// import { connect } from 'react-redux';
// import cn from 'classnames';
// import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
    // BEGIN (write your solution here)
    const {
        tasks: { byId, allIds },
    } = state;
    const tasks = allIds.map((id) => byId[id]);

    return { tasks, tasksUIState: state.tasksUIState };
    // END
};

const actionCreators = {
    inverseTaskTheme: actions.inverseTaskTheme,
};

class Tasks extends React.Component {
    // BEGIN (write your solution here)
    handleToggleThemeUI = () => {
        const { inverseTaskTheme } = this.props;
        inverseTaskTheme();
    };

    render() {
        const { tasks, tasksUIState } = this.props;

        if (tasks.length === 0) {
            return null;
        }

        const themes = {
            light: { 'bg-light': true, 'text-dark': true },
            dark: { 'bg-dark': true, 'text-light': true },
        };
        const classTask = cn({
            'list-group-item': true,
            'd-flex': true,
            ...themes[tasksUIState.current],
        });

        return (
          <div className="mt-3">
            <ul className="list-group">
              {tasks.map(({ id, text }) => (
                <li key={id} className={classTask}>
                  <span className="mr-auto">
                    <a
                      href="#"
                      onClick={this.handleToggleThemeUI}
                    >
                      {text}
                    </a>
                  </span>
                </li>
            ))}
            </ul>
          </div>
        );
    }
    // END
}

// export default connect(mapStateToProps, actionCreators)(Tasks);

// Задача со светлой темой:

// <div class="mt-3">
//   <ul class="list-group">
//     <li class="list-group-item d-flex bg-light text-dark">
//       <span class="mr-auto">
//         <a href="#">Текст задачи</a>
//       </span>
//     </li>
//   </ul>
// </div>
// Задача с темной темой:

// <div class="mt-3">
//   <ul class="list-group">
//     <li class="list-group-item d-flex bg-dark text-light">
//       <span class="mr-auto">
//         <a href="#">Текст задачи</a>
//       </span>
//     </li>
//   </ul>
// </div>
// src/actions/index.js
// Реализуйте действие(-я) необходимое для смены темы

// import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');
// BEGIN (write your solution here)
export const inverseTaskTheme = createAction('UI_THEME_TOGGLE');
// END

// src/reducers/index.js
// Реализуйте редьюсер для обработки UI состояния

// import { combineReducers } from 'redux';
// import { handleActions } from 'redux-actions';
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
    },
    { byId: {}, allIds: [] }
);

const tasksUIState = handleActions(
    {
        // BEGIN (write your solution here)
        [actions.inverseTaskTheme](state) {
            const { current } = state;
            const nextThemeMap = { light: 'dark', dark: 'light' };
            return { current: nextThemeMap[current] };
        },
        // END
    },
    { current: 'light' }
);

const text = handleActions(
    {
        [actions.addTask]() {
            return '';
        },
        [actions.updateNewTaskText](state, { payload }) {
            return payload.text;
        },
    },
    ''
);

// export default combineReducers({
//   tasks,
//   tasksUIState,
//   text,
// });
