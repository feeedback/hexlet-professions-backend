// sc: https://ru.hexlet.io/challenges/js_dom_progress/instance

// src/application.js
// Реализуйте и экспортируйте по умолчанию функцию, которая запускает код,
// заполняющий элемент <progress> на один процент за 1 секунду. Через 100 секунд
// процесс должен остановится, так как достигнет максимума.

// Начальное состояние

// <progress value="0" max="100"></progress>
// Через одну секунду

// <progress value="1" max="100"></progress>
// Для изменения значения value используйте метод setAttribute

// Подсказки
// Реализуйте задачу используя setTimeout (с setInterval может не заработать проверка)
// Элемент Progress https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress

export default () => {
    const progress = document.querySelector('progress');

    const progressValueInc = () => {
        const nextValue = Number(progress.getAttribute('value')) + 1;
        progress.setAttribute('value', nextValue);
        if (nextValue < 100) {
            setTimeout(progressValueInc, 1000);
        }
    };
    setTimeout(progressValueInc, 1000);
};

// eslint-disable-next-line no-unused-vars
const teacher = () => {
    const element = document.querySelector('progress');
    const handler = (counter = 0) => {
        if (counter <= 100) {
            element.setAttribute('value', counter);
            setTimeout(() => handler(counter + 1), 1000);
        }
    };
    handler();
};
