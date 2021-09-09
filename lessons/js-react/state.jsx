/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-react/lessons/state/exercise_unit

// src/BtnGroup.js
// Реализуйте компонент BtnGroup, который отрисовывает две кнопки. Нажатие на
// любую из кнопок делает ее активной, а другую неактивной. При первой загрузке ни
// одна из кнопок не нажата.

// Пример использования:

// <BtnGroup />
// Результат:

// <div class="btn-group" role="group">
//   <button type="button" class="btn btn-secondary left">Left</button>
//   <button type="button" class="btn btn-secondary right">Right</button>
// </div>

// После нажатия на левую кнопку, добавляется класс active. В результате список
// классов выглядит так: btn btn-secondary left active. У правой кнопки поведение
// соответствующее.

// Подсказки
// Button Group https://getbootstrap.com/docs/4.0/components/button-group/

import cn from 'classnames';
import React from 'react';

// BEGIN (write your solution here)
export default class BtnGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: null };
  }

  selectLeft = () => this.setActive('left');

  selectRight = () => this.setActive('right');

  setActive = (active) => {
    this.setState({ active });
  };

  render() {
    const { active } = this.state;

    const sharedClassesObj = {
      btn: true,
      'btn-secondary': true,
    };

    const leftButtonClass = cn({
      ...sharedClassesObj,
      left: true,
      active: active === 'left',
    });

    const rightButtonClass = cn({
      ...sharedClassesObj,
      right: true,
      active: active === 'right',
    });

    return (
      <div className="btn-group" role="group">
        <button type="button" onClick={this.selectLeft} className={leftButtonClass}>
          Left
        </button>
        <button type="button" onClick={this.selectRight} className={rightButtonClass}>
          Right
        </button>
      </div>
    );
  }
}
// END
