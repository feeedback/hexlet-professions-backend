// sc: https://ru.hexlet.io/courses/js-data-abstraction/lessons/points/exercise_unit

// points.js
// Реализуйте и экспортируйте по умолчанию функцию calculateDistance, которая находит
// расстояние между двумя точками на плоскости:

// point1 = [0, 0];
// point2 = [3, 4];
// calculateDistance(point1, point2); // 5

// Подсказки
// Формула расчёта расстояния между двумя точками
// https://www.youtube.com/watch?v=cavwFx4Xd0o

// @ts-check
// BEGIN (write your solution here)
const calculateDistance = ([x1, y1], [x2, y2]) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};
export default calculateDistance;
// END
