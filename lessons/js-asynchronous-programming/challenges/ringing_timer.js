// sc: https://ru.hexlet.io/challenges/js_asynchronous_programming_ringing_timer/instance

// Эта практика включает в себя элементы асинхронного программирования (setTimeout), так
// как bind в основном используется в этом контексте

// timer.js
// Реализуйте и экспортируйте по умолчанию функцию, которая возвращает объект-таймер.
// Таймер "заводится" на определенное время и запускается. Каждые 100 миллисекунд он
// вызывает колбек, передавая туда два параметра: state со значением working и elapsedTime
// содержащий прошедшее время со старта таймера (в миллисекундах). Когда таймер
// завершился, то он вызывает тот же колбек с параметром state и значением finished.

// // Колбек
// const cb = ({ state, this.elapsedTime }) => {
//   switch state {
//     case 'working':
//       console.log(`Time elapsed: ${this.elapsedTime}`);
//       break;
//     case 'finished':
//       console.log(`Timer has finished!`);
//   }
// };

// // Создается объект-таймер
// const timer = makeTimer(300, cb); // Завели на 300 миллисекунд
// timer.start();
// // Time elapsed: 100
// // Time elapsed: 200
// // Time elapsed: 300
// // Timer has finished!

// Подсказки
// Таймеры https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/timers/theory_unit
// Для запуска таймера используйте setInterval
// Для остановки clearInterval

export const makeTimerWithSetTimeout = (totalTime, cb) => ({
    // BEGIN (write your solution here)
    start() {
        const startTime = Date.now();
        const ringing = () => {
            cb({ state: 'working', elapsedTime: Date.now() - startTime });
        };
        const id = setInterval(ringing, 100);

        const stopRinging = () => {
            clearInterval(id);
            cb({ state: 'finished' });
        };
        setTimeout(stopRinging, totalTime);
    },
    // END
});

export default (totalTime, cb) => ({
    // BEGIN (write your solution here)
    elapsedTime: 0,
    totalTime,
    STEP: 100,
    tick() {
        this.elapsedTime += this.STEP;
        const state = this.elapsedTime >= this.totalTime ? 'finished' : 'working';

        if (state === 'finished') {
            clearInterval(this.id);
        }
        cb({ state, elapsedTime: this.elapsedTime });
    },
    start() {
        this.id = setInterval(this.tick.bind(this), this.STEP);
    },
    // END
});
