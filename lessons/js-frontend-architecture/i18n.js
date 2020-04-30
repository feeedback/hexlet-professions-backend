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
export default () => {
    const container = document.querySelector('div.container');
    const startStateData = [
        ...Object.entries(document.location)
            .filter(
                ([, value]) =>
                    typeof value !== 'function' &&
                    typeof value !== 'object' &&
                    value !== ''
            )
            .map(([name, value]) => ({ name, value })),
    ];

    const state = {
        data: startStateData,
        sort: {
            column: 'name',
            order: 'Unsorted',
            next: {
                Unsorted: 'Asc',
                Asc: 'Desc',
                Desc: 'Asc',
            },
        },
        // Unsorted, Asc, Desc
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.className = 'table';
        const tbody = document.createElement('tbody');
        table.append(tbody);

        const thName = document.createElement('th');
        const thValue = document.createElement('th');
        thName.innerHTML = `<a href="">Name (${state.sort.order})</a>`;
        thValue.innerHTML = `<a href="">Value (Unsorted)</a>`;
        const tr = table.insertRow();
        tr.append(thName, thValue);
        container.append(table);
    };
    createTable();

    const [linkThName, linkThValue] = container.querySelectorAll('table th');
    const table = container.querySelector('table');

    const createDataTable = () => {
        const createNewRow = (value1, value2) => {
            const newTr = table.insertRow();
            const tdName = newTr.insertCell();
            const tdValue = newTr.insertCell();
            tdName.textContent = value1;
            tdValue.textContent = value2;
        };
        state.data.forEach(({ name, value }) => createNewRow(name, value));
    };
    const deleteTable = () => {
        [...table.rows].slice(1).forEach((row) => row.remove());
    };
    const sortRows = (column) => {
        if (column !== state.sort.column) {
            state.sort.order = 'Unsorted';
        }

        state.sort.order = state.sort.next[state.sort.order];

        if (column === 'name') {
            linkThName.querySelector('a').textContent = `Name (${state.sort.order})`;
            linkThValue.querySelector('a').textContent = `Value (Unsorted)`;
        } else {
            linkThName.querySelector('a').textContent = `Name (Unsorted)`;
            linkThValue.querySelector('a').textContent = `Value (${state.sort.order})`;
        }

        state.sort.column = column;

        deleteTable();
        const sortOrder = state.sort.order === 'Desc' ? -1 : 1;

        state.data = startStateData
            .slice()
            .sort(
                (a, b) =>
                    a[column].localeCompare(b[column], 'en', { kn: true }) * sortOrder
            );
        createDataTable();
    };

    linkThName.addEventListener('click', (e) => {
        e.preventDefault();
        sortRows('name');
    });
    linkThValue.addEventListener('click', (e) => {
        e.preventDefault();
        sortRows('value');
    });

    sortRows(state.sort.column);
};
// END

// locales/en.js
// BEGIN (write your solution here)

// END
