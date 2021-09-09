// sc: https://ru.hexlet.io/courses/js-data-abstraction/lessons/abstractions/exercise_unit

// Отрезок — еще один графический примитив. В коде описывается парой точек, одна из
// которых — начало отрезка, другая — конец. Обычный отрезок не имеет направления, поэтому
// вы сами вольны выбирать то, какую точку считать началом, а какую концом.

// В этом задании подразумевается, что вы уже понимаете принцип построения абстракции и
// способны самостоятельно принять решение о том, как она будет реализована. Напомню, что
// сделать это можно разными способами и нет одного правильного.

// segments.js
// Реализуйте и экспортируйте указанные ниже функции:

// makeSegment. Принимает на вход две точки и возвращает отрезок.
// getMidpointOfSegment. Принимает на вход отрезок и возвращает точку находящуюся на
// середине отрезка.
// getBeginPoint. Принимает на вход отрезок и возвращает точку начала отрезка.
// getEndPoint. Принимает на вход отрезок и возвращает точку конца отрезка.
// Пример
// const beginPoint = makeDecartPoint(3, 2);
// const endPoint = makeDecartPoint(0, 0);
// segment = makeSegment(beginPoint, endPoint);

// getMidpointOfSegment(segment); // (1.5, 1)
// getBeginPoint(segment); // (3, 2)
// getEndPoint(segment); // (0, 0)

// Подсказки
// Средняя точка вычисляется по формуле x = (x1 + x2) / 2 и y = (y1 + y2) / 2.

// BEGIN (write your solution here)
const makeSegment = (beginPoint, endPoint) => {
  const segment = { beginPoint, endPoint };
  return segment;
};

const getBeginPoint = (segment) => segment.beginPoint;
const getEndPoint = (segment) => segment.endPoint;

const getMidpointOfSegment = (segment) => {
  const beginPoint = getBeginPoint(segment);
  const endPoint = getEndPoint(segment);
  const midX = (getX(beginPoint) + getX(endPoint)) / 2;
  const midY = (getY(beginPoint) + getY(endPoint)) / 2;

  return makeDecartPoint(midX, midY);
};

export { makeSegment, getBeginPoint, getEndPoint, getMidpointOfSegment };
// END
