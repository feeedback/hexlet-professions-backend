// sc: https://ru.hexlet.io/courses/js-data-abstraction/lessons/levels/exercise_unit

// rectangle.js

// Реализуйте абстракцию (набор функций) для работы с прямоугольниками, стороны которого
// всегда параллельны осям. Прямоугольник может располагаться в любом месте координатной
// плоскости.

// При такой постановке, достаточно знать только три параметра для однозначного задания
// прямоугольника на плоскости: координаты левой-верхней точки, ширину и высоту. Зная их,
// мы всегда можем построить прямоугольник одним единственным способом.

// Основной интерфейс:
// * makeRectangle (конструктор) – создает прямоугольник. Принимает параметры:
//   левую-верхнюю точку, ширину и высоту. Ширина и высота – положительные числа.
// * Селекторы getStartPoint, getWidth и getHeight
// * containsOrigin – проверяет, принадлежит ли центр координат прямоугольнику (не лежит
//   на границе прямоугольника, а находится внутри). Чтобы в этом убедиться, достаточно
//   проверить, что все вершины прямоугольника лежат в разных квадрантах (их можно
//   высчитать в момент проверки).

// Подсказки
// Квадрант плоскости — любая из 4 областей (углов), на которые плоскость делится двумя
// взаимно перпендикулярными прямыми, принятыми в качестве осей координат.

// eslint-disable-next-line
import { makeDecartPoint, getX, getY, getQuadrant } from './points.js';

// BEGIN (write your solution here)
const makeRectangle = (startPoint, width, height) => ({ startPoint, width, height });
const getStartPoint = (rectangle) => rectangle.startPoint;
const getWidth = (rectangle) => rectangle.width;
const getHeight = (rectangle) => rectangle.height;

const containsOrigin = (rectangle) => {
    const topLeftPoint = getStartPoint(rectangle);
    const [topLeftX, topLeftY] = [getX(topLeftPoint), getY(topLeftPoint)];

    const bottomRightPoint = makeDecartPoint(
        topLeftX + getWidth(rectangle),
        topLeftY - getHeight(rectangle)
    );

    return getQuadrant(topLeftPoint) === 2 && getQuadrant(bottomRightPoint) === 4;
};

export { makeRectangle, getStartPoint, getWidth, getHeight, containsOrigin };
// END
