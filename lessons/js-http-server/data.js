/* eslint-disable no-undef */
/* eslint-disable no-shadow */
// sc: https://ru.hexlet.io/courses/js-http-server/lessons/data/exercise_unit

// server.js
// Реализуйте создание новой записи в справочнике. Точкой входа будет маршрут POST
// на /users.json. Данные:

// {
//   "name": "<name>",
//   "phone": "<phone>"
// }
// На стороне сервера необходимо проверять корректность данных (валидировать).

// Пример запроса:

// $ curl -XPOST \
// >   -H 'Content-Type: application/json' \
// >   --data '{"name":"Bob","phone":"912-114-23-22"}' \
// >   localhost:4000/users.json
// {"meta":{"location":"/users/10.json"},
//  "data": { "name": "Bob", "phone": "912-114-23-22", "id": 10 }
// }
// В случае успеха должен быть возвращен код ответа 201 (created) и тело:

// {
//   "meta": {
//     "location": "/users/10.json"
//   },
//   "data": {
//     "name": "Bob",
//     "phone": "912-114-23-22",
//     "id": 10
//   }
// }
// location - адрес по которому можно получить данные этой записи
//   id - генерируется с помощью функции nextId и проставляется в запись перед
//   добавлением в общий список
//   В случае ошибок валидации должен быть возвращен код ответа 422 (unprocessable
//   entity) и тело:

// {
//   "errors": [
//     {
//       "source": "name",
//       "title" :"bad format"
//     },
//     {
//       "source": "phone",
//       "title" :"can't be blank"
//     }
//   ]
// }
// Количество ошибок и их тип зависит от пришедших данных.

// user.js
// Реализуйте функцию для валидации данных, пришедших из формы, по следующим правилам:

// Имя не может быть пустым
// Имя должно соответствовать шаблону ^[\w\.]+$
// Телефон не может быть пустым

// Функция должна возвращать пустой массив в случае отсутствия ошибок и массив с
// ошибками в случае их наличия. Каждый элемент массива – это объект следующей
// структуры:
// {
//   source: <field-name>,
//   title: <message>,
// }

// Виды сообщений:
// Если поле пустое: can't be blank
// Если формат не соответствует нужному: bad format

// Flow
// Кроме запуска тестов, обязательно попробуйте "поиграть" с написанным сервером.
// Для этого воспользуйтесь командой make start, которая запускает ваш сервер.
// После этого вы можете делать к нему запросы, используя, например, curl: curl
// localhost:8080. В данном уроке сервер перезапускается автоматически.

// => user.js
let id = 1000;

export const nextId = () => {
  id += 1;
  return id;
};

export const validate = ({ name, phone }) => {
  // BEGIN (write your solution here)
  const validateMap = {
    empty: (value) => value === undefined || value === '',
    badFormat: (value) => /^[\w.]+$/g.test(value) === false,
  };
  const errorMessages = {
    empty: "can't be blank",
    badFormat: 'bad format',
  };
  const errors = [];
  const fabricError = (fieldName, message) => ({
    source: fieldName,
    title: message,
  });

  if (validateMap.empty(name)) {
    errors.push(fabricError('name', errorMessages.empty));
  } else if (validateMap.badFormat(name)) {
    errors.push(fabricError('name', errorMessages.badFormat));
  }
  if (validateMap.empty(phone)) {
    errors.push(fabricError('phone', errorMessages.empty));
  }

  return errors;
  // END
};

// => server.js

// import http from 'http';
// import url from 'url';
// import querystring from 'querystring';

// import { validate, nextId } from './user';

const getParams = (address) => {
  const { query } = url.parse(address);
  return querystring.parse(decodeURI(query || ''));
};

const router = {
  GET: {
    '/': (req, res, matches, body, users) => {
      const messages = ['Welcome to The Phonebook', `Records count: ${Object.keys(users).length}`];
      res.end(messages.join('\n'));
    },

    '/search.json': (req, res, matches, body, users) => {
      res.setHeader('Content-Type', 'application/json');

      const { q = '' } = getParams(req.url);
      const normalizedSearch = q.trim().toLowerCase();
      const ids = Object.keys(users);

      const usersSubset = ids
        .filter((id) => users[id].name.toLowerCase().includes(normalizedSearch))
        .map((id) => users[id]);
      res.end(JSON.stringify({ data: usersSubset }));
    },

    '/users.json': (req, res, matches, body, users) => {
      res.setHeader('Content-Type', 'application/json');

      const { page = 1, perPage = 10 } = getParams(req.url);
      const ids = Object.keys(users);

      const usersSubset = ids.slice(page * perPage - perPage, page * perPage).map((id) => users[id]);
      const totalPages = Math.ceil(ids.length / perPage);
      res.end(JSON.stringify({ meta: { page, perPage, totalPages }, data: usersSubset }));
    },

    '/users/(\\w+).json': (req, res, matches, body, users) => {
      const id = matches[1];
      res.setHeader('Content-Type', 'application/json');
      const user = users[id];
      if (!user) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.end(JSON.stringify({ data: user }));
    },
  },
  POST: {
    // BEGIN (write your solution here)
    '/users.json': (req, res, matches, body, users) => {
      res.setHeader('Content-Type', 'application/json');
      const dataParsed = JSON.parse(body);

      const errors = validate(dataParsed);
      if (errors.length !== 0) {
        res.writeHead(422); // ошибка валидации
        res.end(
          JSON.stringify({
            errors,
          })
        );
        return;
      }

      const id = nextId();
      const newUser = {
        name: dataParsed.name,
        phone: dataParsed.phone,
      };

      users[id] = newUser; // eslint-disable-line

      const response = {
        meta: {
          location: `/users/${id}.json`,
        },
        data: {
          ...newUser,
          id,
        },
      };
      res.writeHead(201); // запрос выполнен успешно и привёл к созданию ресурса
      res.end(JSON.stringify(response));
    },
    // END
  },
};

export default (users) =>
  http.createServer((request, response) => {
    const body = [];

    request
      .on('data', (chunk) => body.push(chunk.toString()))
      .on('end', () => {
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

          routes[str](request, response, matches, body, users);
          return true;
        });

        if (!result) {
          response.writeHead(404);
          response.end();
        }
      });
  });
