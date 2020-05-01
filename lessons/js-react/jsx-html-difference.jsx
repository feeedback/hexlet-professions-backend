/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-react/lessons/jsx-html-difference/exercise_unit

// src/Progress.js
// Реализуйте компонент Progress, который принимает свойство percentage и рисует
// статический прогресс бар.

// Использование:

// <Progress percentage={40} />;
// Результат:

// <div class="progress">
//   <div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" aria-label="progressbar" style="width: 40%;">
//   </div>
// </div>
// Стиль width - вычисляется динамически
// Аттрибут aria-valuenow - вычисляется динамически
// Подсказки
// Progress

/* eslint-disable react/prefer-stateless-function */
import React from 'react';

// BEGIN (write your solution here)
export default class Progress extends React.Component {
    render() {
        const { percentage } = this.props;
        return (
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${percentage}%` }}
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="progressbar"
            />
          </div>
        );
    }
}
// END
