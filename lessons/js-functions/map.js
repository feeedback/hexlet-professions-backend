// sc: https://ru.hexlet.io/courses/js-functions/lessons/map/exercise_unit

// users.js

// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список
// пользователей и возвращает плоский список их детей. Дети каждого пользователя хранятся
// в виде массива в ключе children.

// Подсказки
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

export default (users) => users.map(({ children }) => children).flat();
export const map = (users) => users.flatMap(({ children }) => children);
