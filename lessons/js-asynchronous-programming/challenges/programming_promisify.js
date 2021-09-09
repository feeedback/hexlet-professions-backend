// sc: https://ru.hexlet.io/challenges/js_asynchronous_programming_promisify/instance

// promisify.js
// Реализуйте и экспортируйте по умолчанию функцию, которая "промисифицирует" асинхронные
// функции с колбеками.

// import promisify from '../promisify.js';

// const readFile = promisify(fs.readFile);
// const writeFile = promisify(fs.writeFile);

// const filepath = '/tmp/myfile';
// writeFile(filepath, 'content')
//   .then(() => readFile(filepath))
//   .then(console.log);

// Реализация этой функции опирается на тот факт, что колбэк в асинхронных функциях
// всегда передается последним параметром.

// Подсказка
// Вам понадобятся rest и spread операторы

// BEGIN (write your solution here)
export default (asyncFn) => (...args) =>
  new Promise((resolve, reject) => asyncFn(...args, (err, data) => (err ? reject(err) : resolve(data))));
// END
