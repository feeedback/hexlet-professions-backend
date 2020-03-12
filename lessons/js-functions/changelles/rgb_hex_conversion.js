// sc: https://ru.hexlet.io/challenges/js_functions_rgb_hex_conversion/instance

// Для задания цветов в HTML и CSS используются числа в шестнадцатеричной системе
// счисления. Чтобы не возникало путаницы в определении системы счисления, перед
// шестнадцатеричным числом ставят символ решетки #, например, #135278. Обозначение цвета
// (rrggbb) разбивается на три составляющие, где первые два символа обозначают красную
// компоненту цвета, два средних — зеленую, а два последних — синюю. Таким образом каждый
// из трех цветов — красный, зеленый и синий — может принимать значения от 00 до FF в
// шестнадцатеричной системе исчисления.

// solution.js

// При работе с цветами часто нужно получить отдельные значения красного, зеленого и
// синего (RGB) компонентов цвета в десятичной системе исчисления и наоборот. Реализуйте и
// экспортируйте функции rgbToHex и hexToRgb, которые возвращают соответствующие
// представление цвета.

// Вам может понадобится функция chunk из библиотеки lodash.
// https://lodash.com/docs/4.17.15#chunk
import { chunk } from 'lodash';

const decToHex = (num) => num.toString(16);
const hexToDec = (num) => parseInt(num, 16);

export const rgbToHex = (...rgb) => {
    const hex = rgb.map((num) => decToHex(num).padStart(2, '0'));
    return `#${hex.join('')}`;
};
export const hexToRgb = (hex) => {
    const rgb = ['r', 'g', 'b'];
    const hexNums = chunk(hex.slice(1), 2);
    const decNums = hexNums.map((num, i) => [rgb[i], hexToDec(num.join(''))]);
    return Object.fromEntries(decNums);
};

// second variant
const chunkStr = (str, n) => str.match(new RegExp(`.{1,${n}}`, 'g'));
export const hexToRgb2 = (hex) => {
    const [r, g, b] = chunkStr(hex.slice(1), 2);
    return { r: hexToDec(r), g: hexToDec(g), b: hexToDec(b) };
};
