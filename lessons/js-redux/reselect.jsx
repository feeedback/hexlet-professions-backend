/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
// sc: https://ru.hexlet.io/courses/js-redux/lessons/reselect/exercise_unit

// src/components/Filter.jsx
// Реализуйте компонент <Filter />, добавив в него логику фильтрации.

// Логика включает в себя три состояния: all, active, finished.

import React from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions/index.js';

const filters = [
    ['all', 'All Tasks'],
    ['active', 'Active Tasks'],
    ['finished', 'Finished Tasks'],
];

// BEGIN (write your solution here)
// const a_setTasksFilter = h(
//     (state, { payload: { filterName } }) => {
//         return {
//             ...state,
//             currentFilterName: filterName,
//         };
//     },
//     { byId: {}, allIds: [], currentFilterName: 'all' }
// );

const mapStateToProps = (state) => {
    const {
        tasks: { currentFilterName },
    } = state;
    return { currentFilterName };
};

const actionCreators = {
    setTasksFilter: actions.setTasksFilter,
};

class Filter extends React.Component {
    handleChangeTasksFilter = (filterName) => () => {
        const { setTasksFilter } = this.props;
        setTasksFilter({ filterName });
    };

    renderButtonFilter() {
        const { currentFilterName } = this.props;

        return filters.map(([filterName, text]) => {
            if (filterName === currentFilterName) {
                return text;
            }
            return (
              <button
                key={filterName}
                type="button"
                className="btn btn-link border-0 p-0"
                data-test={`task-filter-${filterName}`}
                onClick={this.handleChangeTasksFilter(filterName)}
              >
                {text}
              </button>
            );
        });
    }

    render() {
        return (
          <div className="mt-3 d-flex justify-content-around">
            {this.renderButtonFilter()}
          </div>
        );
    }
}

export default connect(mapStateToProps, actionCreators)(Filter);

// END

// src/components/Tasks.jsx
// Реализуйте функцию mapStateToProps.

// import React from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions/index.js';
// import { filteredTasksSelector } from '../selectors/index.js';

// BEGIN (write your solution here)
// const mapStateToProps = (state) => {
//     const props = {
//         tasks: filteredTasksSelector(state),
//     };
//     return props;
// };
// END

// const actionCreators = {
//     removeTask: actions.removeTask,
//     toggleTaskState: actions.toggleTaskState,
// };

class Tasks extends React.Component {
    handleRemoveTask = (id) => () => {
        const { removeTask } = this.props;
        removeTask({ id });
    };

    handleToggleTaskState = (id) => () => {
        const { toggleTaskState } = this.props;
        toggleTaskState({ id });
    };

    renderTasks() {
        const { tasks } = this.props;

        return (
          <div className="mt-3">
            <ul className="list-group">
              {tasks.map(({ id, text, state }) => (
                <li key={id} className="list-group-item d-flex">
                  <span className="mr-auto">
                    <button
                      type="button"
                      data-test="task-toggle-state"
                      className="btn btn-link"
                      onClick={this.handleToggleTaskState(id)}
                    >
                      {state === 'active' ? text : <s>{text}</s>}
                    </button>
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

    render() {
        const { tasks } = this.props;

        if (tasks.length === 0) {
            return null;
        }

        return <div className="mt-3">{this.renderTasks()}</div>;
    }
}

// export default connect(mapStateToProps, actionCreators)(Tasks);

// src/selectors/index.js
// Реализуйте необходимые селекторы

// import { createSelector } from 'reselect';
// BEGIN (write your solution here)
export const getTasksById = (state) => state.tasks.byId;
export const getTaskIds = (state) => state.tasks.allIds;
export const getCurrentFilterName = (state) => state.tasks.currentFilterName;

export const tasksSelector = createSelector([getTasksById, getTaskIds], (byId, allIds) =>
    allIds.map((id) => byId[id])
);

export const filteredTasksSelector = createSelector(
    [tasksSelector, getCurrentFilterName],
    (tasks, filterName) =>
        filterName === 'all' ? tasks : tasks.filter((t) => t.state === filterName)
);

// const mapStateToProps = (state) => {
//     const props = {
//         tasks: filteredTasksSelector(state),
//     };
//     return props;
// };
// END

// HTML
// Только фильтр:
// <div class="mt-3 d-flex justify-content-around">
//   All Tasks
//   <button type="button" class="btn btn-link border-0 p-0"
//       data - test="task-filter-active" > Active Tasks</button >
//   <button type="button" class="btn btn-link border-0 p-0"
//       data - test="task-filter-finished" > Finished Tasks</button >
// </div>

// При смене фильтра, в списке задач остается только то что ему соответствует.
// Пример верстки при выбранном фильтре Active Tasks:
// <div class="mt-3 d-flex justify-content-around">
//   <button type="button" class="btn btn-link border-0 p-0"
//     data - test="task-filter-all" > All Tasks</button >
//   Active Tasks
//   <button type="button" class="btn btn-link border-0 p-0"
//      data - test="task-filter-finished" > Finished Tasks</button >
// </div>
