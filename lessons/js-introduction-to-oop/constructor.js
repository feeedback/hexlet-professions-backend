// sc:
// https://ru.hexlet.io/courses/js-introduction-to-oop/lessons/constructor/exercise_unit

// Point.js
// Реализуйте и экспортируйте по умолчанию функцию-конструктор Point с двумя свойствами x
// (длина) и y (высота).
// Примеры
// const point = new Point(1, 1);

// Segment.js
// Реализуйте и экспортируйте по умолчанию функцию-конструктор Segment с двумя свойствами
// beginPoint и endPoint и геттеры для извлечения этих свойств getBeginPoint и
// getEndPoint.
// Примеры
// const segment = new Segment(new Point(1, 1), new Point(10, 11));

// solution.js
// Реализуйте функцию reverse, которая принимает на вход отрезок и возвращает новый
// отрезок с точками, добавленными в обратном порядке (begin меняется местами с end).
// Примечания
// Точки в результирующем отрезке должны быть копиями (по значению) соответствующих точек
// исходного массива. То есть они не должны быть ссылкой на один и тот же объект, так как
// это разные объекты (пускай и с одинаковыми координатами). Примеры
// const segment = new Segment(new Point(1, 10), new Point(11, -3));
// const reversedSegment = reverse(segment);

// const reversedSegment.getBeginPoint(); // (11, -3)
// const reversedSegment.getEndPoint(); // (1, 10)

function getX() {
    return this.x;
}

function getY() {
    return this.y;
}

export default function Point(x, y) {
    this.x = x;
    this.y = y;
    this.getX = getX;
    this.getY = getY;
}

function Segment(beginPoint, endPoint) {
    this.beginPoint = beginPoint;
    this.endPoint = endPoint;
    this.getBeginPoint = function getBeginPoint() {
        return this.beginPoint;
    };
    this.getEndPoint = function getEndPoint() {
        return this.endPoint;
    };
}
// export default Segment;

const reverse = (segment) => {
    const beginPoint = segment.getBeginPoint();
    const endPoint = segment.getEndPoint();
    const newEndPoint = new Point(beginPoint.getX(), beginPoint.getY());
    const newBeginPoint = new Point(endPoint.getX(), endPoint.getY());

    return new Segment(newBeginPoint, newEndPoint);
};
// export default reverse;
