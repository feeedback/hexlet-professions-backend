// sc: https://ru.hexlet.io/challenges/js_arrays_pascals_triangle/instance

// solution.js
// Напишите функцию generate, которая возвращает указанную строку треугольника паскаля в
// виде массива. Экспортируйте функцию по умолчанию.

// Треугольник Паскаля — бесконечная таблица биномиальных коэффициентов, имеющая треугольную форму.
// В этом треугольнике на вершине и по бокам стоят единицы. Каждое число равно сумме двух
// расположенных над ним чисел. Строки треугольника симметричны относительно вертикальной оси.

const generateRecursive = (lineIndex) => {
  if (lineIndex === 0) {
    return [1];
  }
  const prev = generate(lineIndex - 1);
  const current = prev.map((e, i, arr) => e + arr[i + 1]).slice(0, -1);
  return [1, ...current, 1];
};
const memoize = (fn) => {
  const cache = Object.create(null);
  return (arg) => {
    const key = arg;
    const val = cache[key];
    if (val) return val;
    const res = fn(arg);
    cache[key] = res;
    return res;
  };
};

const fact = memoize((n) => (n ? n * fact(n - 1) : 1));
const binom = (n, m) => Math.round(fact(n) / (fact(m) * fact(n - m)));
const generate = (n) => Array.from({ length: n + 1 }, (_, m) => binom(n, m));

export default generate;
