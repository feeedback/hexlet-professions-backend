/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-react/lessons/props/exercise_unit

// src/Card.jsx
// Реализуйте и экспортируйте по умолчанию компонент Card, который принимает на
// вход свойства title и text. И возвращает jsx с подставленными значениями.
// Пример:

// const title = 'title 1';
// const text = 'text 1';
// ReactDOM.render(<Card title={title} text={text} />);

// // вывод
// <div className="card">
//   <div className="card-body">
//     <h4 className="card-title">title 1</h4>
//     <p className="card-text">text 1</p>
//   </div>
// </div>

/* eslint-disable react/prefer-stateless-function */

import React from 'react';

// BEGIN (write your solution here)
export default class Card extends React.Component {
  render() {
    const { title, text } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{text}</p>
        </div>
      </div>
    );
  }
}
// END
