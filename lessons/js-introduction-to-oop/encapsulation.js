/* eslint-disable import/prefer-default-export */
// sc: https://ru.hexlet.io/courses/js-introduction-to-oop/lessons/encapsulation/exercise_unit

// users.js
// Реализуйте и экспортируйте функцию getMutualFriends, которая принимает на вход двух
// пользователей и возвращает массив состоящий из общих друзей.

// Интерфейс абстракции User:

// user.id – возвращает идентификатор пользователя, по которому можно его отличить от
// остальных.
// user.getFriends() – возвращает список друзей.
// // Подробнее смотрите в тестах
// const mutualFriends = getMutualFriends(user1, user2);

// @ts-check
/* eslint-disable import/prefer-default-export */

// BEGIN (write your solution here)
import { intersectionBy } from 'lodash';

export const getMutualFriends = (user1, user2) =>
  intersectionBy(user1.getFriends(), user2.getFriends(), (user) => user.id);
// END
