// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/new-promise/exercise_unit

// timer.js
// Реализуйте таймер в виде промиса.

// import wait from './timer.js';

// wait(100).then(() => console.log('time is over!'));
// Экспортируйте функцию по умолчанию.

// BEGIN (write your solution here)
export default (delay) => new Promise((resolve) => setTimeout(resolve, delay));
// END
