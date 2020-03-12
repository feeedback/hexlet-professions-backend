/* eslint-disable no-unused-vars */
/* eslint-disable no-bitwise */
// sc:  https://ru.hexlet.io/challenges/js_functions_ip_converter/instance

// solution.js

// Реализуйте и экспортируйте функции ipToInt и intToIp, которые преобразовывают
// представление IP-адреса из десятичного формата с точками в 32-битное число в десятичной
// форме и обратно.

// Функция ipToInt принимает на вход строку и должна возвращать число. А функция intToIp
// наоборот: принимает на вход число, а возвращает строку.

// Подсказки :

// IPv4 https://ru.wikipedia.orkg/wiki/IPv4
// Используйте функцию parseInt для перевода строки в необходимую систему счисления
// Изучите возможности метода toString для числа, рассмотрите примеры.

const ipToIntBitwise = (ip) =>
    ip.split('.').reduce((sum, n) => (sum << 8) + Number(n), 0) >>> 0;
const intToIpBitwise1 = (int) =>
    Array.from({ length: 4 }, (_, i) => (int >> (8 * i)) & 255)
        .reverse()
        .join('.');

const intToIpBitwise2 = (int) => {
    const ip = [];
    for (let i = 3; i >= 0; i -= 1) {
        ip.push((int >> (8 * i)) & 255);
    }
    return ip.join('.');
};

const ipToInt256 = (ip) => ip.split('.').reduce((sum, n) => sum * 256 + Number(n), 0);

const decToHex = (num) => Number(num).toString(16);
const hexToDec = (num) => parseInt(num, 16);
const chunkStr = (str, n) => str.match(new RegExp(`.{1,${n}}`, 'g'));

// IPv4 имеет формат [0-255].[0-255].[0-255].[0-255], каждое число имеет 256 вариантов
// или 2^8 вариантов или 8 бит или 1 байт
// Представление IPv4 в виде десятичного числа - это 4 байта лежащие последовательно
// Поэтому можно перевести в 2 или в 16 систему счисления чтобы получить байт.

const ipToInt = (ip) => {
    const ipInHex = ip
        .split('.')
        .map((octet) => decToHex(octet).padStart(2, 0))
        .join('');
    console.log(ipInHex);

    return hexToDec(ipInHex);
};

const intToIp = (int) => {
    const ipInHex = decToHex(int).padStart(8, 0);

    return chunkStr(ipInHex, 2)
        .map((octet) => hexToDec(octet))
        .join('.');
};

const getByteLength = (notation) => 8 / Math.log2(notation);
// длина байта должна быть целым числом, подходит 2-чная, 4-чная, 16-чная

const ipToIntNotation = (ip, notation = 2) => {
    const byteLength = getByteLength(notation);
    const ipInHex = ip
        .split('.')
        .map((octet) =>
            Number(octet)
                .toString(notation)
                .padStart(byteLength, '0')
        )
        .join('');

    return parseInt(ipInHex, notation);
};

const intToIpNotation = (int, notation = 2) => {
    const byteLength = getByteLength(notation);
    const ipInHex = int.toString(notation).padStart(4 * byteLength, '0');

    return chunkStr(ipInHex, byteLength)
        .map((octet) => parseInt(octet, notation))
        .join('.');
};
