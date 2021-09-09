// sc: https://ru.hexlet.io/challenges/js_objects_scrabble/instance

// scrabble.js

// Реализуйте и экспортируйте по умолчанию функцию-предикат, которая принимает на вход два
// параметра: набор символов (строку) и слово, и проверяет, можно ли из переданного набора
// составить это слово. В результате вызова функция возвращает true или false.

// При проверке учитывается количество символов, нужных для составления слова, и не
// учитывается их регистр.

import { get, countBy } from 'lodash';

export const scrabble = (chars, word) => {
  const charsArr = chars.split('');
  const wordArr = word.toLowerCase().split('');
  return wordArr.every((char) => {
    const index = charsArr.indexOf(char);
    charsArr[index] = null;
    return index !== -1;
  });
};

export default (chars, word) => {
  const countsChars = countBy(chars);

  for (const char of word.toLowerCase()) {
    if (get(countsChars, char, 0) === 0) {
      return false;
    }
    countsChars[char] -= 1;
  }

  return true;
};
