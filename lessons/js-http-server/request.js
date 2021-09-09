/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// sc:  https://ru.hexlet.io/courses/js-http-server/lessons/request/exercise_unit

// index.js
// Реализуйте логику парсинга файла phonebook.txt в следующий формат:

// {
//   <id>: {
//     name: <name>,
//     phone: <phone>,
//   },
//   <id>: {
//     name: <name>,
//     phone: <phone>,
//   },
// }
//   Где <id> - это идентификатор конкретной записи, а <name> и <phone> – это имя
//   и телефон соответствующей записи.

// server.js
// Сервер позволяет выполнять запросы на поиск всех записей, соответствующих
// критерию поиска. Критерием является часть имени/фамилии, по которой
// производится сопоставление.

// В запросе к серверу по ссылке /search необходимо передать один параметр: q,
// значением которого, будет подстрока. В случае, если найдены сопоставления, то
// сервер возвращает данные в следующем формате (для подстроки miss):

// Miss Arlo Barrows, 328-949-3924
// Miss Bernadette Conn, 249.059.5515
// Miss Savannah Dicki, 157.463.3368
// Miss Rudy Brown, 779-703-0150`
// Обратите внимание, что регистр при сопоставлении не учитывается.

// В случае если запрос к серверу выполняется без параметров или соответствий не
// найдено, он должен вернуть пустую строку.

// $ curl localhost:8080/search

// $ curl localhost:8080/search?q=mrs
// Mrs. Rosalia Wisoky, (865) 611-8960
// Mrs. Earl Gaylord, 944-345-3158
// Mrs. Roslyn Moen, 526.643.3627
// Mrs. Giovani Rempel, 842-246-9417

// Flow
// Кроме запуска тестов, обязательно попробуйте "поиграть" с написанным сервером.
// Для этого воспользуйтесь командой make start, которая запускает ваш сервер.
// После этого вы можете делать к нему запросы, используя, например, curl: curl
// localhost:8080. В данном уроке сервер перезапускается автоматически.

// index.js
// import { promises as fs } from 'fs';
// import path from 'path';
// import makeServer from './server';

// export default
async (port, callback = () => {}) => {
  const data = await fs.readFile(path.resolve(__dirname, 'phonebook.txt'));

  // BEGIN (write your solution here)
  const records = data.toString().trim().split('\n');
  const users = Object.fromEntries(
    records.map((record) => {
      const [id, name, phone] = record.split(' | ');
      return [id, { name, phone }];
    })
  );
  // END

  const server = makeServer(users);
  server.listen(port, () => callback(server));
};

// server.js
// import http from 'http';
// import url from 'url';

export default (usersById) =>
  http.createServer((request, response) => {
    request.on('end', () => {
      if (request.url === '/') {
        const messages = ['Welcome to The Phonebook', `Records count: ${Object.keys(usersById).length}`];
        response.end(messages.join('\n'));
      } else if (request.url.startsWith('/search')) {
        // BEGIN (write your solution here)
        const queryObj = url.parse(request.url, true);
        if (!('q' in queryObj.query)) {
          response.end();
          return;
        }
        const query = queryObj.query.q.toLowerCase();

        const filtered = Object.values(usersById).filter((user) => user.name.toLowerCase().includes(query));
        const messages = filtered.map((user) => Object.values(user).join(', '));
        response.end(messages.join('\n'));
        // END
      }
    });

    request.resume();
  });
