/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
// sc: https://ru.hexlet.io/courses/js-frontend-architecture/lessons/state/exercise_unit

// src/application.js
// Реализуйте и экспортируйте функцию по умолчанию, которая активизирует фильтр на
// основе формы доступной в public/index.html. Изменение любого параметра должно
// сразу приводить к фильтрации. Ноутбуки подходящие под фильтр выводятся внутри
// <div class="result"></div> как список ul/li моделей (свойство model внутри
// объекта представляющего ноутбук). Полный список ноутбуков доступен в файле
// src/application.js.

// Условия:

// Если фильтр пустой, то выводится все.
// Если под фильтр ничего не подходит, то список не выводится.
// Подсказки
// Для отслеживания изменений текстовых input-ов используйте событие input. Для
// select - change.

// const map = {
//     processor_eq: notebooks.processor,
//     memory_eq: notebooks.memory,
//     frequency_gte: notebooks.frequency_gte,
//     frequency_lte: notebooks.frequency_lte,
// };

const notebooks = [
  {
    model: 'v1',
    processor: 'intel',
    frequency: 1.7,
    memory: 16,
  },
  {
    model: 'd3',
    processor: 'intel',
    frequency: 3.5,
    memory: 8,
  },
  {
    model: 'd2',
    processor: 'amd',
    frequency: 2.5,
    memory: 16,
  },
];

// BEGIN (write your solution here)
export default () => {
  const render = (list) => {
    const outputEl = document.querySelector('div.result');
    if (list.length === 0) {
      outputEl.innerHTML = '';
      return;
    }
    const li = list.map((item) => `<li>${item.model}</li>`).join('');
    outputEl.innerHTML = `<ul>${li}</ul>`;
  };

  const form = document.querySelector('form');
  const map = {
    processor_eq: (value, obj) => value === obj.processor,
    memory_eq: (value, obj) => value === obj.memory,
    frequency_gte: (value, obj) => value <= obj.frequency,
    frequency_lte: (value, obj) => value >= obj.frequency,
  };

  const filterHandle = () => {
    const activeFields = [...form.elements].filter(({ value }) => value !== '');
    const filtered = notebooks.filter((obj) =>
      activeFields.every(({ name, value }) => map[name](value, obj))
    );
    render(filtered);
  };
  form.addEventListener('input', filterHandle);
  form.addEventListener('change', filterHandle);

  render(notebooks);
};
// END

// Teacher variable
const predicates = {
  eq: (value) => (el) => String(el) === String(value),
  gte: (value) => (el) => el >= Number(value),
  lte: (value) => (el) => el <= Number(value),
};

const filterItems = (query, items) => {
  const fields = Object.keys(query);
  const activeFields = fields.filter((field) => query[field]);

  const result = activeFields.reduce((acc, field) => {
    const [name, predicateName] = field.split('_');
    const match = predicates[predicateName];
    return acc.filter((item) => match(query[field])(item[name]));
  }, items);
  return result;
};

const render = (state) => {
  const resultElement = document.querySelector('.result');
  const filteredNotebooks = filterItems(state.filter, notebooks);
  if (filteredNotebooks.length === 0) {
    resultElement.innerHTML = '';
    return;
  }
  const liEls = filteredNotebooks.map((n) => `<li>${n.model}</li>`).join('');
  resultElement.innerHTML = `<ul>${liEls}</ul>`;
};

const main = () => {
  const state = {
    filter: {
      processor_eq: null,
      memory_eq: null,
      frequency_gte: null,
      frequency_lte: null,
    },
  };

  const field = [
    { name: 'processor_eq', eventType: 'change' },
    { name: 'memory_eq', eventType: 'change' },
    { name: 'frequency_gte', eventType: 'input' },
    { name: 'frequency_lte', eventType: 'input' },
  ];

  field.forEach(({ name, eventType }) => {
    const element = document.querySelector(`[name="${name}"]`);
    element.addEventListener(eventType, ({ target }) => {
      state.filter[target.name] = target.value === '' ? null : target.value;

      render(state);
    });
  });
  render(state);
};
// END
