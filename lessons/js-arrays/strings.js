// sc: https://ru.hexlet.io/courses/js-arrays/lessons/strings/exercise_unit

// strings.js
// Реализуйте и экспортируйте по умолчанию функцию makeCensored, которая заменяет каждое
// вхождение указанных слов в предложении на последовательность $#%! и возвращает полученную строку.

// Аргументы:
// Текст
// Набор стоп-слов

// Словом считается любая непрерывная последовательность символов,
// включая любые спецсимволы(без пробелов).

const makeCensored0 = (string, stopWords) => {
  const escapeRegExp = (str) => str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
  const stopStr = stopWords.map(escapeRegExp).join('|');
  const stopWordsRegExp = new RegExp(`^${stopStr}$`, 'g');
  return string
    .split(' ')
    .map((word) => word.replace(stopWordsRegExp, '$#%!'))
    .join(' ');
};

const makeCensored = (string, stopWords) =>
  string
    .split(' ')
    .map((word) => (stopWords.includes(word) ? '$#%!' : word))
    .join(' ');
