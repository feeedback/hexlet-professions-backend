// sc: https://ru.hexlet.io/courses/js-arrays/lessons/nested-arrays/exercise_unit

// superseries.js
// Реализуйте и экспортируйте по умолчанию функцию, которая находит команду победителя для
// конкретной суперсерии. Победитель определяется как команда, у которой больше побед в конкретной
// серии. Функция принимает на вход массив, в котором каждый элемент — это массив описывающий счет в
// конкретной игре. Результат функции – название страны: 'canada', 'ussr'. Если суперсерия
// закончилась в ничью, то нужно вернуть null.

const getSuperSeriesWinner = (series) => {
  const dict = ['ussr', null, 'canada'];
  const score = series.reduce((sum, [a, b]) => sum + Math.sign(a - b), 0);
  return dict[Math.sign(score) + 1];
};
// export default getSuperSeriesWinner;
const scores = [
  [3, 2],
  [4, 1],
  [5, 8],
  [5, 5],
  [2, 2],
  [2, 4],
  [4, 2],
  [2, 3],
];
console.log(getSuperSeriesWinner(scores));
