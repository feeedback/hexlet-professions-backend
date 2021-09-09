// sc:
// https://ru.hexlet.io/courses/js-functions/lessons/high-order-functions/exercise_unit

// users.js

// Реализуйте функцию takeOldest, которая принимает на вход список пользователей и
// возвращает самых взрослых. Количество возвращаемых пользователей задается вторым
// параметром, который по умолчанию равен единице.

// Подсказки

// Для преобразования дат в единое представление — unixtimestamp — используйте метод
// Date.parse() В рамках данного упражнения, для записи дат используется только формат
// RFC2822. sortBy Подумайте, что из себя представляет данная функция: команду или запрос?

import { sortBy } from 'lodash';

// BEGIN (write your solution here)
const sortAge = ({ birthday }) => Date.parse(birthday);
const takeOldest = (users, count = 1) => sortBy(users, sortAge).slice(0, count);
export default takeOldest;
// END
