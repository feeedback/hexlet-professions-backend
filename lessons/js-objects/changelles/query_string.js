// sc: https://ru.hexlet.io/challenges/js_objects_query_string/instance

// buildQueryString.js

// Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход список
// параметров и возвращает сформированный query string из этих параметров:

// Имена параметров в выходной строке должны располагаться в алфавитном порядке(то есть их
// нужно отсортировать).

export default (data) =>
  Object.entries(data)
    .sort()
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export const buildQueryString = (data) => {
  const entries = Object.entries(data).sort();
  const query = entries.map(([key, value]) => `${key}=${value}`).join('&');
  return query;
};
