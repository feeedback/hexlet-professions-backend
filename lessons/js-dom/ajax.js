/* eslint-disable no-param-reassign */
// sc: https://ru.hexlet.io/courses/js-dom/lessons/ajax/exercise_unit

// Задача этого упражнения состоит в том чтобы реализовать автокомплит по странам.
// На странице присутствует элемент input, с аттрибутами data-autocomplete и
// data-autocomplete-name, к которому нужно привязаться. Атрибут data-autocomplete
// содержит ссылку, по которой нужно делать запрос на данные. Атрибут
// data-autocomplete-name содержит имя, по которому необходимо найти на странице
// список ul с точно таким же аттрибутом и значением. В этом списке выводятся
// данные.

// src/application.js
// Реализуйте автокомплит по странам.

// Как только в поле ввода появляется хотя бы один символ, необходимо выполнить
// запрос на сервер с параметром term значением которого, будет строка введенная в
// input. Сервер возвращает массив из стран (на английском языке).

// Если этот массив не пустой, то нужно заполнить список (посмотреть его
// нахождение можно либо через public/index.html либо открыв исходный код страницы
// в веб доступе) таким образом:

// <ul data-autocomplete-name="country">
//   <li>pakistan</li>
//   <li>panama</li>
//   <li>paraguay</li>
// </ul>
// Если с сервера пришел пустой список то нужно вывести:

// <ul data-autocomplete-name="country">
//   <li>Nothing</li>
// </ul>

// Подсказки
// Для формирования правильного запроса на сервер, используйте URL
// Текущий хост можно извлечь так window.location.origin
// Значение поля input необходимо брать из события так: e.target.value
// Используйте async/await
// Ваш код должен работать даже в том случае если на странице множество автокомплитов
// Используйте событие input

// import 'whatwg-fetch';

export default () => {
    // BEGIN (write your solution here)
    const render = (list, ul) => {
        if (list.length === 0) {
            ul.innerHTML = `<li>Nothing</li>`;
            return;
        }
        ul.innerHTML = list.map((word) => `<li>${word}</li>`).join('\n');
    };
    const getUl = (name) => document.querySelector(`ul[data-autocomplete-name=${name}]`);

    const autoComplete = async (event) => {
        const input = event.target;

        const api = input.dataset.autocomplete;
        const queryUrl = new URL(api, window.location.href);
        queryUrl.searchParams.append('term', input.value);

        const response = await fetch(queryUrl);
        const listWords = await response.json();

        const { autocompleteName } = input.dataset;
        render(listWords, getUl(autocompleteName));
    };
    const inputs = document.querySelectorAll('input[data-autocomplete-name]');
    inputs.forEach((input) => input.addEventListener('input', autoComplete));
    // END
};
