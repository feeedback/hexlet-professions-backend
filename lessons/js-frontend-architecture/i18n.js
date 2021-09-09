/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-frontend-architecture/lessons/i18n/exercise_unit

// В этой задаче вам предстоит реализовать грид. В интерфейсах так называется
// список выведенный в табличном виде, позволяющий выполнять разные действия над
// ним, например, сортировку.

// В качестве данных нужно взять объект document.location, который содержит в себе
// информацию о браузере. Пример неполного вывода:

// Name (Asc)	Value (Unsorted)
// host	localhost
// pathname	/
// Вывести нужно только те свойства, которые удовлетворяют условиям:

// Не функции
// Не объекты
// Не пустые
// По умолчанию вывод происходит в алфавитном порядке по имени свойства. Этот
// порядок можно менять кликом по заголовку. Если происходит клик на другой
// столбец, то происходит сортировка по нему (в порядке возрастания). Повторный
// клик меняет порядок сортировки.

// <div class="container m-3">
//     <table class="table">
//         <tbody>
//             <tr>
//                 <th><a href="">Name (Asc)</a></th>
//                 <th><a href="">Value (Unsorted)</a></th>
//             </tr>
//             <tr>
//                 <td>host</td>
//                 <td>localhost</td>
//             </tr>
//             <tr>
//                 <td>hostname</td>
//                 <td>localhost</td>
//             </tr>
//             <tr>
//                 <td>href</td>
//                 <td>http://localhost/</td>
//             </tr>
//             <tr>
//                 <td>origin</td>
//                 <td>http://localhost</td>
//             </tr>
//             <tr>
//                 <td>pathname</td>
//                 <td>/</td>
//             </tr>
//             <tr>
//                 <td>protocol</td>
//                 <td>http:</td>
//             </tr>
//         </tbody>
//     </table>
// </div>
// Рядом с каждым заголовком, в скобках, указано состояние столбца. Всего их три:

// Не отсортирован
// Прямой
// Обратный
// В один момент времени сортировка может быть выполнена только по одному столбцу.

// src/application.js
// Экспортируйте функцию по умолчанию, которая реализует всю необходимую логику.
// Тексты должны подставляться через библиотеку i18next.

// Подсказки
// Сравнение строк localeCompare
// Переводы можно вкладывать друг в друга: I18n.t('key', { value: I18n.t('another key') })
// Получить все свойства объекта (включая то что наследуется) можно через цикл for..in

// import i18next from 'i18next';
// import { watch } from 'melanke-watchjs';
// import resources from './locales';

// BEGIN (write your solution here)
const getOrderDirection = (name, { by, desc }) => {
  if (name !== by) {
    return i18next.t('unsorted');
  }
  return i18next.t(desc ? 'desc' : 'asc');
};
const generateTrClickHandler = (name, order) => (e) => {
  e.preventDefault();
  order.desc = order.by === name ? !order.desc : false;
  order.by = name;
};

const startStateData = [
  ...Object.entries(document.location)
    .filter(([, value]) => typeof value !== 'function' && typeof value !== 'object' && value !== '')
    .map(([name, value]) => ({ name, value })),
];

export default async () => {
  await i18next.init({
    lng: 'en',
    debug: true,
    resources,
  });

  const state = {
    grid: {
      order: {
        by: 'name',
        desc: false,
      },
    },
  };

  const renderTable = (container) => {
    const table = document.createElement('table');
    table.className = 'table';
    const tbody = document.createElement('tbody');
    table.append(tbody);

    const thName = document.createElement('th');
    const nameLink = document.createElement('a');
    nameLink.setAttribute('href', '');
    thName.append(nameLink);

    const thValue = document.createElement('th');
    const valueLink = document.createElement('a');
    valueLink.setAttribute('href', '');
    thValue.append(valueLink);

    const tr = table.insertRow();
    tr.append(thName, thValue);
    container.append(table);
    return table;
  };

  const container = document.querySelector('div.container');
  const table = renderTable(container);
  const [nameLink, valueLink] = container.querySelectorAll('table th a');

  const renderTableData = (tableEl, data) => {
    const createNewRow = (value1, value2) => {
      const newTr = tableEl.insertRow();
      const tdName = newTr.insertCell();
      const tdValue = newTr.insertCell();
      tdName.textContent = value1;
      tdValue.textContent = value2;
    };
    data.forEach(({ name, value }) => createNewRow(name, value));
  };
  const deleteTableData = (tableEl) => {
    [...tableEl.rows].slice(1).forEach((row) => row.remove());
  };

  const renderSortedRows = (stateGrid) => {
    const { by, desc } = stateGrid.order;

    nameLink.innerHTML = i18next.t('grid.cols.name', {
      direction: getOrderDirection('name', state.grid.order),
    });
    valueLink.innerHTML = i18next.t('grid.cols.value', {
      direction: getOrderDirection('value', state.grid.order),
    });

    deleteTableData(table);
    const data = startStateData
      .slice()
      .sort((a, b) => a[by].localeCompare(b[by], i18next.language, { numeric: true }) * (desc ? -1 : 1));
    renderTableData(table, data);
  };

  nameLink.addEventListener('click', generateTrClickHandler('name', state.grid.order));
  valueLink.addEventListener('click', generateTrClickHandler('value', state.grid.order));

  watch(state.grid, 'order', () => renderSortedRows(state.grid));
  renderSortedRows(state.grid);
};
// END

// locales/en.js
// BEGIN (write your solution here)
// export default {
//     translation: {
//         unsorted: 'Unsorted',
//         asc: 'Asc',
//         desc: 'Desc',
//         grid: {
//             cols: {
//                 name: 'Name ({{ direction }})',
//                 value: 'Value ({{ direction }})',
//             },
//         },
//     },
// };
// END
