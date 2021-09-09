// sc: https://ru.hexlet.io/challenges/js_objects_to_roman/instance

// solution.js

// Реализуйте функцию toRoman и экспортируйте функцию, которая переводит арабские числа в
// римские. Функция принимает на вход целое число в диапазоне от 1 до 3000, а возвращает
// строку с римским представлением этого числа.

// Реализуйте функцию и экспортируйте функцию toArabic, которая переводит число в римской
// записи в число, записанное арабскими цифрами.
// Подробнее о римской записи — https://ru.wikipedia.org/wiki/Римские_цифры

const mapRoman = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
];
const toRoman = (num) => {
  const roman = [];
  let arabic = num;

  mapRoman.forEach(([romanChar, arabicValue]) => {
    while (arabic >= arabicValue) {
      roman.push(romanChar);
      arabic -= arabicValue;
    }
  });
  return roman.join('');
};

const toArabic = (str) => {
  let arabic = 0;
  let roman = str;

  mapRoman.forEach(([romanChar, arabicValue]) => {
    while (roman.indexOf(romanChar) === 0) {
      arabic += arabicValue;
      roman = roman.slice(romanChar.length);
    }
  });
  return arabic;
};

export { toRoman, toArabic };
