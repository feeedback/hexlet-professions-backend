/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
// sc: https://ru.hexlet.io/courses/js-react/lessons/jsx/exercise_unit

// В этой практике не будет визуальной составляющей, она заключается в том что
// будет правильно написана функция возвращающая jsx.

// src / Card.jsx 
// Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход
// объект со свойствами title и text, и возвращает jsx с подставленными
// значениями.Пример:

// import getCard from '/Card.jsx';

// getCard({ title: 'hi', text: 'how are you?' });
// // <div className="card">
// //   <div className="card-body">
// //     <h4 className="card-title">hi</h4>
// //     <p className="card-text">how are you?</p>
// //   </div>
// // </div>

// Если title отсутствует, то соответствующий ему кусок dom не отрисовывается,
// тоже самое справедливо и для text.Если отсутствуют оба свойства, то из функции
// необходимо вернуть null.

/* eslint-disable react/display-name */
import React from 'react';

// BEGIN (write your solution here)
const getCard = ({ title, text }) => {
    if (!title && !text) {
        return null;
     }
    return (
      <div className="card">
        <div className="card-body">
          {title && <h4 className="card-title">{title}</h4>}
          {text && <p className="card-text">{text}</p>}
        </div>
      </div>
    )
};
export default getCard;
// END
