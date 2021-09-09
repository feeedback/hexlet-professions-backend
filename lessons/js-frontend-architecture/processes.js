/* eslint-disable no-use-before-define */
// sc: https://ru.hexlet.io/courses/js-frontend-architecture/lessons/processes/exercise_unit

// Эта задача не сложная алгоритмически, но довольно объемная. На решение
// потребуется время и это хорошая прокачка

// Некоторые интерфейсы допускают редактирование "по месту" (in-place). Это значит
// что для обновления значений каких-то данных не нужно переходить на отдельную
// страницу редактирования, достаточно кликнуть на сам элемент (или кнопку рядом с
// ним) как появится форма для изменения конкретно этого значения.

// В данной практике нужно построить именно такой интерфейс. Он работает по
// следующему принципу. Контейнер внутри которого находятся данные для
// редактирования, помечается специальным аттрибутом: data-editable-target.
// Значением этого атрибута является имя поля. В нашем примере это name и email
// (исходник доступен в public/index.html). Начальный HTML выглядит так:

// <div data-editable-target="name"><i>name</i></div>
// <div data-editable-target="email"><i>email</i></div>
// Когда происходит клик на этом элементе, то он заменяется на форму:

// <div data-editable-target="name">
//   <form>
//     <!-- С точки зрения хорошего UX нужно фокусироваться
//     (это позволяет использовать клавиатуру сразу) на этом инпуте
//      и выделять текст внутри него-- >
//     <!-- Исключение составляет ситуация, когда поле пустое (но отражается
//     текст выделенный курсивом как в примере выше)-->
//     <input type="text" name="name">
//     <input type="submit" value="Save">
//   </form>
// </div>

// Далее вбивается нужное значение и кнопка Save возвращает текст. Предположим что
// мы набрали значение "Cat". Тогда после отправки формы этот див станет таким:

// <div data-editable-target="name">
//   Cat
// </div>

// Если значение стирается, то тогда текст меняется на первоначальный (и
// добавляется курсив), такой какой он был до любых изменений:

// <div data-editable-target="name"><i>name</i></div>
// <div data-editable-target="email"><i>email</i></div>

// src/application.js
// Экспортируйте функцию по умолчанию, которая реализует всю необходимую логику.
// По необходимости создайте дополнительные функции на уровне модуля.

// Подсказки:
// Каждое поле обрабатывается независимо и каждому понадобится свое собственное состояние.
// Код отвечающий за изменение DOM не может менять состояние.
// Обработчики не могут напрямую менять DOM. Это делает функция render.

/* eslint-disable no-param-reassign */

// BEGIN (write your solution here)
const mapStates = {
  defaultText: {
    getHtml: (name) => `<i>${name}</i>`,
    nextState: () => 'filling',
  },
  filling: {
    getHtml: (name) =>
      `<form><input type="text" name="${name}" value=""><input type="submit" value="Save"></form>`,
    nextState: (value) => (value === '' ? 'defaultText' : 'savingText'),
  },
  savingText: {
    getHtml: (name, value) => `${value}`,
    nextState: () => 'filling',
  },
};

const render = (field) => {
  const element = document.querySelector(`div[data-editable-target=${field.name}]`);
  element.innerHTML = mapStates[field.state].getHtml(field.name, field.value);
};

export default () => {
  const fields = document.querySelectorAll('div[data-editable-target]');
  const states = Object.fromEntries(
    [...fields].map(({ dataset: { editableTarget: name } }) => [
      name,
      { name, value: '', state: 'defaultText' },
    ])
  );

  fields.forEach((field) => {
    const name = field.dataset.editableTarget;
    const obj = states[name];

    const standardHandle = (event) => {
      event.preventDefault();
      const nextState = mapStates[obj.state].nextState(obj.value);
      obj.state = nextState;
      render(obj);
    };

    const saveForm = (event) => {
      const form = field.querySelector('form');
      obj.value = form.elements[name].value;
      standardHandle(event);

      form.removeEventListener('submit', saveForm);
      field.addEventListener('click', showForm);
    };

    const showForm = (event) => {
      standardHandle(event);

      field.removeEventListener('click', showForm);
      field.querySelector('form').addEventListener('submit', saveForm);
    };
    field.addEventListener('click', showForm);
  });
};

// END
