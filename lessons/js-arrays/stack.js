// sc: https://ru.hexlet.io/courses/js-arrays/lessons/stack/exercise_unit

// strings.js
// Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход строку,
// состоящую только из открывающих и закрывающих скобок разных типов, и проверяет является ли эта
// строка сбалансированной. Пустая строка (отсутствие скобок) считается сбалансированной.

// import isBracketStructureBalanced from './strings.js';

// // Пример вложенности isBracketStructureBalanced('[()]');  // true
// isBracketStructureBalanced('{<>}}'); // false Функция должна поддерживать, минимум, четыре вида
// скобок: круглые — (), квадратные — [], фигурные — {} и угловые — <>.

const f = (str) => {
  const stack = [];
  const dict = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
    ['<', '>'],
  ]);
  const isOpeningSymbol = (symbol) => dict.has(symbol);
  const getClosingSymbolFor = (symbol) => dict.get(symbol);

  for (const symbol of str) {
    if (isOpeningSymbol(symbol)) {
      stack.push(symbol);
    } else if (symbol !== getClosingSymbolFor(stack.pop())) {
      return false;
    }
  }
  return !stack.length;
};
console.log(f('()'));
