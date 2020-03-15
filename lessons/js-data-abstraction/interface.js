// sc: https://ru.hexlet.io/courses/js-data-abstraction/lessons/interface/exercise_unit

// В этой задаче, тесты написаны для отрезков, которые в свою очередь используют точки.
// Ваша задача, реализовать интерфейсные функции для работы с точками. Внутреннее
// представление точек должно быть основано на полярной системе координат, хотя интерфейс
// предполагает работу с декартовой системой (снаружи).

// points.js
// Реализуйте и экспортируйте интерфейсные функции точек:

// makeDecartPoint. Принимает на вход координаты и возвращает точку. Уже реализован.
// getX
// getY
// const x = 4;
// const y = 8;

// // point хранит в себе данные в полярной системе координат
// const point = makeDecartPoint(x, y);

// // Здесь происходит преобразование из полярной в декартову
// getX(point); // 4
// getY(point); // 8

// Подсказки
// Трансляция декартовых координат в полярные была описана в теории
// Получить x можно по формуле radius * cos(angle)
// Получить y можно по формуле radius * sin(angle)

const makeDecartPoint = (x, y) => {
    const point = {
        angle: Math.atan2(y, x),
        radius: Math.sqrt(x ** 2 + y ** 2),
    };

    return point;
};

// BEGIN (write your solution here)
const getAngle = (point) => point.angle;
const getRadius = (point) => point.radius;

const polarToDecart = (radius, angle, axis) => {
    const fn = { x: 'cos', y: 'sin' };

    return Math.floor(radius * Math[fn[axis]](angle));
};

const getX = (point) => polarToDecart(getRadius(point), getAngle(point), 'x');
const getY = (point) => polarToDecart(getRadius(point), getAngle(point), 'y');
// END

export { makeDecartPoint, getX, getY };
