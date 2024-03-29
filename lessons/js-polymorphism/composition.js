/* eslint-disable no-return-assign */
// sc: https://ru.hexlet.io/courses/js-polymorphism/lessons/composition/exercise_unit

// Адаптер – популярный шаблон проектирования. Он используется тогда, когда нужно
// использовать код, не поддерживающий необходимый интерфейс. В такой ситуации, создается
// "обертка" над необходимым кодом, которая поддерживает нужный интерфейс. Это очень
// похоже на адаптеры электронных устройств в реальной жизни.

// В текущем задании, есть код отвечающий за генерацию паролей, он находится в классе
// PasswordBuilder. Для генерации паролей, этот класс использует внешний объект.

// Суть данного задания, внедрить в эту систему внешнюю библиотеку.

// Обратите внимание на то, что задача решается не через исправление кода самой
// библиотеки, а за счет создания адаптера, благодаря которому соединяется код задания и
// код библиотеки.

// PasswordGeneratorAdapter.js
// Реализуйте класс PasswordGeneratorAdapter, который представляет собой адаптер к пакету
// generate-password.

// Примеры
// import PasswordBuilder from '../PasswordBuilder.js';
// import PasswordGeneratorAdapter from '../PasswordGeneratorAdapter.js';

// const builder = new PasswordBuilder(new PasswordGeneratorAdapter());

// // Первый параметр длина пароля (setLength в генераторе)
// // Второй, набор опций
// // Для настройки генератора смотрите официальную документацию https://github.com/brendanashworth/generate-password

// const passwordInfo = builder.buildPassword(10, ['uppercase', 'symbols']);
// // {
// //    password: 'giK-;SH?Jx',
// //    digest: '379ad800edca49029fb90e7200001812277bbeae',
// // }

// const passwordInfo2 = builder.buildPassword(10, []);
// // {
// //    password: 'zgalhrheru',
// //    digest: '97d73ac22ad943d2db824712154b3f354cd80d10',
// // }
// Вторым параметром в buildPassword передается набор опций:

// uppercase
// numbers
// symbols
// Каждая из этих опций, соответствует опциям внутри библиотеки generate-password. В
// официальной документации видно как их можно установить. Значение по умолчанию для
// данных опций, должно быть false.

// Подсказки
// https://github.com/brendanashworth/generate-password
// Адаптер https://ru.wikipedia.org/wiki/Адаптер_(шаблон_проектирования)

// import generator from 'generate-password';

export default class PasswordGeneratorAdapter {
  // BEGIN (write your solution here)
  constructor() {
    this.defaultOptions = { uppercase: false };
  }

  generatePassword(length, options) {
    const preparedOptions = Object.fromEntries(options.map((o) => [o, true]));
    const optionsObj = { ...this.defaultOptions, ...preparedOptions, length };

    const password = generator.generate(optionsObj);
    return password;
  }
  // END
}
