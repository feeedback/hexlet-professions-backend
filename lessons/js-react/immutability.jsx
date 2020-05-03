// sc: https://ru.hexlet.io/courses/js-react/lessons/immutability/exercise_unit

// src/Component.jsx
// Реализуйте компонент, который представляет из себя две кнопки и лог событий:

// Лог это список значений, каждое из которых получается после нажатия на одну из
// двух кнопок
// Левая кнопка + добавляет в лог строчку с новым значением равным старое + 1
// Правая кнопка - добавляет в лог строчку с новым значением равным старое - 1
// При клике на запись в логе, она удаляется.

// Начальный HTML:
// <div>
//   <div class="btn-group" role="group">
//     <button type="button" class="btn hexlet-inc">+</button>
//     <button type="button" class="btn hexlet-dec">-</button>
//   </div>
// </div>
// После нажатия последовательности +, +, -, +:

// <div>
//   <div class="btn-group" role="group">
//     <button type="button" class="btn hexlet-inc">+</button>
//     <button type="button" class="btn hexlet-dec">-</button>
//   </div>
//   <div class="list-group">
//     <button type="button" class="list-group-item list-group-item-action">2</button>
//     <button type="button" class="list-group-item list-group-item-action">1</button>
//     <button type="button" class="list-group-item list-group-item-action">2</button>
//     <button type="button" class="list-group-item list-group-item-action">1</button>
//   </div>
// </div>
// Каждое нажатие кнопки добавляет в лог новую строчку сверху.

import _ from 'lodash';
import React from 'react';

// BEGIN (write your solution here)
export default class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 0, log: [] };
    }

    addItem = (step) => {
        const { value, log } = this.state;
        
        const newValue = value + step;
        this.setState({
            value: newValue,
            log: [{ value: newValue, id: _.uniqueId() }, ...log],
        });
    };

    handleDec = () => this.addItem(-1);

    handleInc = () => this.addItem(1);

    removeItem = (id) => () => {
        const { log } = this.state;
        const newLog = log.filter((item) => item.id !== id);

        this.setState({ log: newLog });
    };

    renderItems() {
        const { log } = this.state;

        if (log.length === 0) {
            return null;
        }
        const items = log.map((item) => (
          <button
            key={item.id}
            onClick={this.removeItem(item.id)}
            type="button"
            className="list-group-item list-group-item-action"
          >
            {item.value}
          </button>
        ));
        return <div className="list-group">{items}</div>;
    }

    render() {
        return (
          <div>
            <div className="btn-group" role="group">
              <button
                onClick={this.handleInc}
                type="button"
                className="btn hexlet-inc"
              >
                +
              </button>
              <button
                onClick={this.handleDec}
                type="button"
                className="btn hexlet-dec"
              >
                -
              </button>
            </div>
            {this.renderItems()}
          </div>
        );
    }
}
// END
