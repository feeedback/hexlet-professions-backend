/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-advanced-testing/lessons/side-effects/exercise_unit

// tests/buildUser.test.js
// Протестируйте функцию, которая генерирует случайного пользователя.
// Пользователь, в данном случае, это объект с тремя полями:

// email
// firstName
// lastName
// Для генерации данных используется библиотека Faker.js

// console.log(buildUser());
// // {
// //   email: 'Zion.Reichel12@yahoo.com',
// //   firstName: 'Elizabeth',
// //   lastName: 'Zulauf',
// // }

// // Если какой-то из параметров нужно задать точно, то его можно передать в функцию
// console.log(buildUser({ firstName: 'Petya' }));
// // {
// //   email: 'Zion.Reichel12@yahoo.com',
// //   firstName: 'Petya',
// //   lastName: 'Zulauf',
// // }

// Вам нужно протестировать две ситуации:
//    Что каждый вызов buildUser возвращает объект с другими данными.
//    Что работает установка свойств через параметры.

// const getFunction = require('../functions');

// const buildUser = getFunction();

// BEGIN (write your solution here)
test('каждый вызов buildUser возвращает объект с другими данными', () => {
    expect(buildUser()).not.toEqual(buildUser());
});
test('работает установка свойств через параметры', () => {
    const newData = { firstName: 'Petya' };
    const user = buildUser(newData);
    expect(user).toMatchObject(newData);
});
// END
