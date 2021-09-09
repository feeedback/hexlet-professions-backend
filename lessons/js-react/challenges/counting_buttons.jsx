// sc: https://ru.hexlet.io/challenges/js_react_counting_buttons/instance

// Buttons.jsx
// Реализуйте и экспортируйте по умолчанию компонент <Buttons />, который
// отрисовывает кнопки со значением счетчика.

// В компоненте необходимо реализовать следующее поведение:

// Текущее значение счетчика каждой кнопки — это строка внутри тега button.
// Клик по кнопке должен увеличивать значение счетчика на единицу, не затрагивая
// при этом другие счетчики.
// Компонент должен принимать пропс count, который определяет количество кнопок.
// Значение по умолчанию: 3.
// Для оформления внешнего вида кнопок используйте библиотеку bootstrap
// (подключена к испытанию).
// Последняя нажатая кнопка меняет цвет (с помощью класса). Классы в примерах ниже.
// Примеры
// Кнопки с нулевым значением счетчика:

// <button class="btn btn-primary m-1" type="button">0</button>
// <button class="btn btn-primary m-1" type="button">0</button>
// <button class="btn btn-primary m-1" type="button">0</button>
// Кнопки на которые нажимали. Последняя была вторая (btn-primary => btn-success):

// <button class="btn btn-primary m-1" type="button">3</button>
// <button class="btn btn-success m-1" type="button">1</button>
// <button class="btn btn-primary m-1" type="button">2</button>

/* eslint no-param-reassign: ["error", { "props": false }] */

// import React from 'react';
// import { useImmer } from 'use-immer';
// import cn from 'classnames';

// use web hooks with https://github.com/immerjs/use-immer

// BEGIN (write your solution here)

// END

// Вызываем так в index.jsx

// ReactDOM.render(
//   <Buttons count={5} />,
//   document.getElementById('container'),
// );
