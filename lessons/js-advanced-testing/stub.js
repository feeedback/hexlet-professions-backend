/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-advanced-testing/lessons/stub/exercise_unit

// tests/getUserMainLanguage.test.js
// Протестируйте функцию getUserMainLanguage(username, client), которая определяет
// язык на котором пользователь создал больше всего репозиториев. Для реализации
// этой задачи, функция getUserMainLanguage выполняет запрос через @octokit/rest,
// который извлекает все репозитории указанного пользователя (по первому параметру
// username). Каждый репозиторий в этом списке, содержит указание основного языка
// репозитория. Эта информация используется для поиска того языка, которые
// используется чаще.

// // Запрос который выполняет функция getUserByUsername
// // Именно этот метод нужно будет подменить в фейковом клиенте
// const { data } = await client.repos.listForUser({ username });
// // data – список репозиториев. У каждого репозитория может быть много полей
// // но нас интересует ровно одно – language
// // Эти данные нужно подготовить в тестах для фейкового клиента
// console.log(data);
// // [{ language: 'php', ... }, { language: 'javascript', ... }, ...]

// support/OctokitFake.js
// Реализуйте фейковый клиент по такому же принципу как это было сделано в теории.
// Используйте этот клиент в тестах для подмены.
// BEGIN (write your solution here)
// Структура этого класса описывает только ту часть,
// которая необходима для вызова await client.repos.listForOrg(...)
export default class OctokitFake {
  constructor(data) {
    this.data = data;
  }

  repos = {
    listForUser: () => Promise.resolve({ data: this.data }),
  };
}
// END

// const { default: OctokitFake } = require('../support/OctokitFake');
// const getFunction = require('../functions');

// const getUserMainLanguage = getFunction();

// BEGIN (write your solution here)
test('getUserMainLanguage first found', async () => {
  const data = [
    { language: 'javascript' },
    { language: 'php' },
    { language: 'javascript' },
    { language: 'php' },
  ];
  const client = new OctokitFake(data);
  const mainLanguage = await getUserMainLanguage('', client);
  expect(mainLanguage).toEqual('javascript');
});

test('getUserMainLanguage when empty', async () => {
  const client = new OctokitFake([]);
  const mainLanguage = await getUserMainLanguage('user-without-repos', client);
  expect(mainLanguage).toBeNull();
});
// END
