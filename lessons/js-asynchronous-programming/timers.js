// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/timers/exercise_unit

// watcher.js
// Реализуйте и экспортируйте по умолчанию асинхронную функцию, которая следит за
// изменением файла. Если файл был изменён со времени предыдущей проверки, то необходимо
// вызвать колбэк. Отслеживание изменений файла должно начинаться с момента вызова
// функции. Параметры функции:

// Путь до файла, который нужно отслеживать
// Период отслеживания
// Колбэк, который принимает на вход только ошибку
// import watch from './watcher.js';

// const id = watch(filepath, 500, (err) => {
//   console.log('Wow!');
// });

// setTimeout(() => fs.appendFileSync(filepath, 'ehu'), 700);
// Реализуйте эту логику используя функцию setInterval. Функция должна возвращать наружу
// идентификатор таймера. Если во время анализа файла (через fs.stat) произошла ошибка, то
// нужно остановить таймер и вызвать колбэк, передав туда ошибку.

// Подсказки
// stats.mtimeMs — время последнего изменения https://nodejs.org/api/fs.html#fs_stats_mtimems
// Date.now() — текущая дата
// clearInterval https://www.w3schools.com/jsref/met_win_clearinterval.asp

/* eslint-disable prefer-const */
import fs from 'fs';

// BEGIN (write your solution here)
export default (filepath, interval, callback) => {
    let lastModificationTime = Date.now();

    const checkFileM = (id) => {
        fs.stat(filepath, (error, stat) => {
            if (error) {
                clearInterval(id);
                callback(error);
                return;
            }
            const { mtimeMs } = stat;
            if (mtimeMs > lastModificationTime) {
                callback(null);
            }
            lastModificationTime = mtimeMs;
        });
    };

    const intervalId = setInterval(() => checkFileM(intervalId), interval);
    return intervalId;
};
// END

// тест 1 (ошибка в file.stat) - ПРОЙДЕН
// тест 2 (если файл изменился - вызываем callback(null)) - ПРОЙДЕН
// тест 3 (если файл НЕ изменился - НЕ вызываем callback) - ПРОЙДЕН
// тест 4 (вызовы только по интервалу, плюс тест 2, плюс не обнуляем таймер в случае теста
// 2) - ПРОЙДЕН
// тест 5 (файл изменяют до первого интервала - надо вызывать callback(null), и переписать
// время изменение в любом случае) - ПРОЙДЕН

// 1 интервал (500): файл изменился - вызываем callback(null)
// 2 интервал (1000): ничего не делаем, т.к. время изменения теперь с пред. интервала
// не выполнится 3 интервал - на 1100 остановлен
