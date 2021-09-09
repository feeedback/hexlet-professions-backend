// sc: https://ru.hexlet.io/courses/js-polymorphism/lessons/factory/exercise_unit

// ConfigFactory.js
// Создайте фабрику, которая принимает на вход путь до файла конфигурации в формате либо
// json либо yaml и возвращает объект класса Config. Конструктор класса Config принимает
// на вход объект с данными, полученными из конфигурационных файлов и предоставляет к нему
// доступ с помощью метода getValue.

// import path from 'path';
// import ConfigFactory from '../ConfigFactory.js';

// const filePath = path.join(__dirname, '__fixtures__', 'test.yml');
// const config = ConfigFactory.factory(filePath);
// config.getValue('key'); // value
// console.log(config.constructor.name); // Config
// Учтите что файлы формата YAML могут иметь разные расширения: yaml и yml. Фабрика должна
// работать с обоими.

// Подсказки
// Получить расширение файла можно с помощью path.extname
// Для чтения файлов используйте fs.readFileSync

import path from 'path';
import fs from 'fs';
import JsonParser from './parsers/JsonParser.js';
import YamlParser from './parsers/YamlParser.js';
import Config from './Config.js';

// BEGIN (write your solution here)
const mappingParser = {
  '.json': JsonParser,
  '.yaml': YamlParser,
  '.yml': YamlParser,
};

export default class ConfigFactory {
  static factory(filePath) {
    const ext = path.extname(filePath);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = mappingParser[ext].parse(rawData);

    return new Config(data);
  }
}
// END

// parsers/JsonParser.js
// Реализуйте класс, отвечающий за парсинг json. Используйте внутри JSON.parse.

/* eslint-disable class-methods-use-this */

// BEGIN (write your solution here)
export default class JsonParser {
  static parse(data) {
    return JSON.parse(data);
  }
}
// END

// parsers/YamlParser.js
// Реализуйте класс, отвечающий за парсинг yaml. Для парсинга используется сторонний
// компонент js-yaml. Используйте метод safeLoad.

/* eslint-disable class-methods-use-this */

// import yaml from 'js-yaml';

// BEGIN (write your solution here)
export default class YamlParser {
  static parse(data) {
    return yaml.safeLoad(data);
  }
}
// END
