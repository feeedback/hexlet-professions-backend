// sc: https://ru.hexlet.io/courses/js-functions/lessons/first-class-citizen/exercise_unit

// strings.js

// Реализуйте внутреннюю функцию takeLast, которая возвращает последние n символов строки
// в обратном порядке. Количество символов передаётся в takeLast вторым параметром. Если
// передаётся пустая строка или строка меньше необходимой длины, функция должна вернуть
// null.
const reverseStr = (str) =>
    str
        .split('')
        .reverse()
        .join('');

const run = (text) => {
    // BEGIN (write your solution here)
    const takeLast = (str, count) => {
        const { length } = str;
        if (length === 0 || length < count) {
            return null;
        }
        return reverseStr(str.slice(-count));
    };
    // END

    return takeLast(text, 4);
};

export default run;
