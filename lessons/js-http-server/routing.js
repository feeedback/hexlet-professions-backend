// sc: https://ru.hexlet.io/courses/js-http-server/lessons/routing/exercise_unit

// solution.js
// Реализуйте маршрут /users/(\\w+).json, по которому будет доступна информация о
// конкретной записи из справочника. Данные отдаются в формате json, поэтому
// обязательно нужно выставить правильный media type.

// $ curl localhost:4000/users/5.json
// {"data":{"name":"Lonny McGlynn","phone":"(935) 384-0149"}}
// Если такой записи не существует, необходимо вернуть код ответа 404 и пустое тело.

import http from 'http';
import url from 'url';
import querystring from 'querystring';

const getParams = (address) => {
    const { query } = url.parse(address);
    return querystring.parse(decodeURI(query || ''));
};

const router = {
    GET: {
        '/users/(\\w+).json': (req, res, matches, users) => {
            // BEGIN (write your solution here)
            const [, id] = matches;
            if (!(id in users)) {
                res.writeHead(404);
                res.end();
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ data: users[id] }));
            // END
        },
        '/': (req, res, matches, users) => {
            const messages = [
                'Welcome to The Phonebook',
                `Records count: ${Object.keys(users).length}`,
            ];
            res.end(messages.join('\n'));
        },

        '/search.json': (req, res, matches, users) => {
            res.setHeader('Content-Type', 'application/json');

            const { q = '' } = getParams(req.url);
            const normalizedSearch = q.trim().toLowerCase();
            const ids = Object.keys(users);

            const usersSubset = ids
                .filter((id) => users[id].name.toLowerCase().includes(normalizedSearch))
                .map((id) => users[id]);
            res.end(JSON.stringify({ data: usersSubset }));
        },

        '/users.json': (req, res, matches, users) => {
            res.setHeader('Content-Type', 'application/json');

            const { page = 1, perPage = 10 } = getParams(req.url);
            const ids = Object.keys(users);

            const usersSubset = ids
                .slice(page * perPage - perPage, page * perPage)
                .map((id) => users[id]);
            const totalPages = Math.ceil(ids.length / perPage);
            res.end(
                JSON.stringify({ meta: { page, perPage, totalPages }, data: usersSubset })
            );
        },
    },
};

export default (users) =>
    http.createServer((request, response) => {
        const routes = router[request.method];
        const result = Object.keys(routes).find((str) => {
            const { pathname } = url.parse(request.url);
            if (!pathname) {
                return false;
            }
            const regexp = new RegExp(`^${str}$`);
            const matches = pathname.match(regexp);
            if (!matches) {
                return false;
            }

            routes[str](request, response, matches, users);
            return true;
        });

        if (!result) {
            response.writeHead(404);
            response.end();
        }
    });
