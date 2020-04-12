// sc: https://ru.hexlet.io/courses/js-http-server/lessons/example/exercise_unit

// server.js
// Реализуйте http-сервер, который является интерфейсом доступа к телефонному справочнику.

// Справочник представлен текстовым файлом phonebook.txt. Его формат:

// 1 | Carleton Sporer | 197.328.3450
// 2 | Ashton Bogisich | 244.742.7016
// 3 | Valentin Auer | 964.685.7490
// 4 | Buddy Kuvalis | 356.157.9872
// Каждая строчка представляет собой отдельную запись о человеке. Она содержит три
// значения, разделенных символом |. 1 - это id, 2 - имя, 3 - телефон.

// При запросе на / сервер должен отдавать следующее тело:

// Welcome to The Phonebook
// Records count: <количество строк в файле phonebook.txt>

// Flow
// Кроме запуска тестов, обязательно попробуйте "поиграть" с написанным сервером.
// Для этого воспользуйтесь командой make start, которая запускает ваш сервер.
// После этого вы можете делать к нему запросы, используя telnet или, например,
// curl: curl localhost:8080. Не забывайте перезапускать сервер при изменении
// исходного кода. Для остановки сервера воспользуйтесь комбинацией ctrl+c.

import { promises as fs } from 'fs';
import path from 'path';
import http from 'http';

export default async (port, callback) => {
    // BEGIN (write your solution here)
    const DATAFILE = 'phonebook.txt';
    const data = await fs.readFile(path.join(__dirname, DATAFILE));
    const { length: recordsCount } = data
        .toString()
        .trim()
        .split('\n');

    const server = http.createServer((request, response) => {
        const messages = [`Welcome to The Phonebook`, `Records count: ${recordsCount}`];

        response.end(messages.join('\n'));
    });

    server.listen(port, callback);
    // END
};
