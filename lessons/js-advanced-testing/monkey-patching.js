/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-advanced-testing/lessons/monkey-patching/exercise_unit

// tests/getUserMainLanguage.test.js
// В этом задании нужно протестировать такую же функцию getUserMainLanguage(user),
// но используя не инверсию зависимостей, а манки-патчинг через библиотеку nock.

// Подсказки
// В тестах выключены реальные запросы. Это значит, что если запустить тесты в
// котором выполняется реальный запрос, nock его перехватит и выведет на экран.
// Так можно узнать адреса по которым @octokit/rest выполняет свои запросы.

// const nock = require('nock');
// const getFunction = require('../functions');

// const getUserMainLanguage = getFunction();

// nock.disableNetConnect();

// BEGIN (write your solution here)
test('getUserMainLanguage', async () => {
  const user = 'hexlet';
  const data = [
    { language: 'javascript' },
    { language: 'php' },
    { language: 'javascript' },
    { language: 'php' },
  ];
  nock(/api\.github\.com/)
    .get(`/users/${user}/repos`)
    .reply(200, data);

  const mainLanguage = await getUserMainLanguage(user);
  expect(mainLanguage).toEqual('javascript');
});

test('getUserMainLanguage when empty', async () => {
  const user = 'user-without-repos';
  const data = [];
  nock(/api\.github\.com/)
    .get(`/users/${user}/repos`)
    .reply(200, data);

  const mainLanguage = await getUserMainLanguage(user);
  expect(mainLanguage).toBeNull();
});
// END

// Цепочка nock(domain).get(uri) задаёт полный адрес страницы, запрос к которой
// надо перехватить.

// Метод reply(code, body, headers) описывает ответ, который нужно вернуть по
// данному запросу. В самом простом случае достаточно указать код возврата. В
// нашей же ситуации, кроме кода нужны данные. Именно на этих данных мы и
// проверяем работу функции getPrivateForkNames.
