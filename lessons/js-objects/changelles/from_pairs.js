// sc: https://ru.hexlet.io/challenges/js_objects_from_pairs/instance

// romPairs.js
// Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход массив,
// состоящий из массивов-пар и возвращает объект, полученный из этих пар.

// Примечания Если при конструировании объекта попадаются совпадающие ключи, то берётся
// ключ из последнего массива-пары:

const fromPairsReduce = (pairs) => pairs.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

const fromPairsForOf = (pairs) => {
  const obj = {};
  for (const [key, value] of pairs) {
    obj[key] = value;
  }

  return obj;
};

const fromPairs = (pairs) => Object.fromEntries(pairs);
