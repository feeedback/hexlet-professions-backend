// sc: https://ru.hexlet.io/courses/js-functions/lessons/filter/exercise_unit

// users.js

// Реализуйте и экспортируйте по умолчанию функцию getGirlFriends, которая принимает на
// вход список пользователей и возвращает плоский список подруг всех пользователей (без
// сохранения ключей). Друзья каждого пользователя хранятся в виде массива в ключе
// friends. Пол доступен по ключу gender и может принимать значения male или female.

const getGirlFriends = (users) =>
    users.flatMap(({ friends }) => friends).filter(({ gender }) => gender === 'female');
export default getGirlFriends;
