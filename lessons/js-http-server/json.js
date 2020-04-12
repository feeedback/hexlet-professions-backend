// sc: https://ru.hexlet.io/courses/js-http-server/lessons/json/exercise_unit

// server.js
// Реализуйте обработчик адреса /users.json. Он должен отдавать данные в следующем
// формате:

//   {
//   "meta": { "page": 5, "perPage": 2, "totalPages": 500  },
//   "data": [
//     { "name": "Mrs. Marlee Lesch", "phone": "(412) 979-7311" },
//     { "name": "Mrs. Mabelle Cormier", "phone": "307.095.4754" }
//   ]
// }
//   Этот вызов должен поддерживать пагинацию (pagination, постраничный вывод)
//   результата. За это отвечают два параметра запроса:

// page - текущая запрошенная страница. По умолчанию 1.
// perPage - количество возвращенных данных на страницу. По умолчанию 10.
// Пример:
// $ curl "localhost:8080/users.json?page=2&perPage=3"
// {
//   meta: { page: 2, perPage: 3, totalPages: 334 },
//   data: [
//     { name: "Liam Wiegand", phone: "1-327-988-3382" },
//     { name: "Lonny McGlynn", phone: "(935) 384-0149" },
//     { name: "Dr. Faustino Bailey", phone: "746-901-8330" }
//   ]
// };

/* eslint-disable no-console */

import http from 'http';
import url from 'url';
import querystring from 'querystring';

export default (usersById) =>
    http.createServer((request, response) => {
        request.on('error', (err) => {
            console.error(err.stack);
        });
        request.on('end', () => {
            if (request.url === '/') {
                const messages = [
                    'Welcome to The Phonebook',
                    `Records count: ${Object.keys(usersById).length}`,
                ];
                response.end(messages.join('\n'));
            } else if (request.url.startsWith('/search.json')) {
                response.setHeader('Content-Type', 'application/json');
                const { query } = url.parse(request.url);
                const { q } = querystring.parse(query);
                const normalizedSearch = q ? q.trim().toLowerCase() : '';

                const result = Object.values(usersById).filter((user) =>
                    user.name.toLowerCase().includes(normalizedSearch)
                );

                response.end(JSON.stringify(result));
            } else if (request.url.startsWith('/users.json')) {
                // BEGIN (write your solution here)
                const getData = (page = 1, perPage = 10) => {
                    const records = Object.values(usersById);
                    const start = (page - 1) * perPage;
                    const totalPages = Math.ceil(records.length / perPage);

                    return {
                        meta: { page, perPage, totalPages },
                        data: records.slice(start, start + perPage),
                    };
                };

                const { page = 1, perPage = 10 } = url.parse(request.url, true).query;
                const result = getData(Number(page), Number(perPage));

                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(result));
                // END
            }
        });
        request.resume();
    });
