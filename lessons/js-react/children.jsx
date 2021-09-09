/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-react/lessons/children/exercise_unit

// src/ListGroup.js
// Реализуйте компонент ListGroup, который отрисовывает переданных детей,
// оборачивая их в список.

// Пример использования:

// <ListGroup>
//   <p>one</p>
//   <p>two</p>
// </ListGroup>;
// Результат:

// <ul class="list-group">
//   <li class="list-group-item"><p>one</p></li>
//   <li class="list-group-item"><p>two</p></li>
// </ul>

// Подсказки
// List Group https://getbootstrap.com/docs/4.0/components/list-group/

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

// BEGIN (write your solution here)
export default class ListGroup extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <ul className="list-group">
        {React.Children.map(children, (child) => (
          <li className="list-group-item">{child}</li>
        ))}
      </ul>
    );
  }
}
// END
