// sc: https://ru.hexlet.io/courses/js-functions/lessons/reduce/exercise_unit

// users.js

// Реализуйте функцию getMenCountByYear, которая принимает на вход список пользователей и
// возвращает объект, в котором ключ это год рождения, а значение это количество мужчин,
// родившихся в этот год.

import _ from 'lodash';

const getMenCountByYear = (users) => {
    const years = users
        .filter(({ gender }) => gender === 'male')
        .map(({ birthday }) => new Date(birthday).getUTCFullYear());
    return _.countBy(years);
};
export default getMenCountByYear;
