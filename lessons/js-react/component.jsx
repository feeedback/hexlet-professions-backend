/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-react/lessons/component/exercise_unit

// src/Card.jsx
// Реализуйте компонент Card, возвращающий следующий jsx:

// <div className="card">
//   <div className="card-body">
//     <h4 className="card-title">Card title</h4>
//     <p className="card-text">Some quick example text to build on the card</p>
//     <button type="button" className="btn btn-primary">Go somewhere</button>
//   </div>
// </div>

/* eslint-disable react/prefer-stateless-function */
import React from 'react';

// BEGIN (write your solution here)
export default class Card extends React.Component {
    render() {    
        return (
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Card title</h4>
              <p className="card-text">Some quick example text to build on the card</p>
              <button type="button" className="btn btn-primary">Go somewhere</button>
            </div>
          </div>
);
    }
}
// END

// src/index.jsx
// Импортируйте Card.jsx и отрисуйте компонент внутри dom элемента с id равным container
// import ReactDOM from 'react-dom';
// import React from 'react';

// BEGIN (write your solution here)
// import Card from 'Card.jsx';
const mountNode = document.getElementById('container');
ReactDOM.render(<Card />, mountNode);
// END

// Подсказки
// Описание Card https://getbootstrap.com/docs/4.0/components/card/
