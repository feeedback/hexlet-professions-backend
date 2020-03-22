// sc: https://ru.hexlet.io/courses/js-polymorphism/lessons/dispatch-by-file/exercise_unit

// DatabaseConfigLoader.js
// Реализуйте и экспортируйте по умолчанию класс DatabaseConfigLoader, который отвечает за
// загрузку конфигурации для базы данных. У класса следующий интерфейс:

// Конструктор - принимает на вход путь, по которому нужно искать конфигурацию
// load(env) - метод, который грузит конфигурацию для конкретной среды окружения. Он
// загружает файл database.${env}.json, парсит его и возвращает результат наружу.

// const pathToConfigs = path.join(__dirname, '__fixtures__');
// const loader = new DatabaseConfigLoader(pathToConfigs);
// const config = loader.load('production'); // loading database.production.json
// // {
// //   host: 'google.com',
// //   username: 'postgres',
// // };
// В этом классе и конфигурации реализована поддержка расширения. Если в загружаемом
// конфиге есть ключ extend, то нужно загрузить конфигурацию с этим именем (он
// соответствует env). Далее конфигурация определяется так, что приоритет имеет
// загруженная раньше. Более подробный пример посмотрите в тестах.

// Подсказки
// Для чтения файла используйте соответствующую синхронную функцию из модуля fs

import fs from 'fs';
import path from 'path';
import _ from 'lodash';

// BEGIN (write your solution here)
export default class DatabaseConfigLoader {
    constructor(dirpath) {
        this.dirpath = dirpath;
    }

    extend(config) {
        const extendEnv = this.load(config.extend);
        const configWithoutExtend = _.omit(config, 'extend');
        const extendedConfig = _.merge(extendEnv, configWithoutExtend);
        return extendedConfig;
    }

    load(env) {
        const filepath = path.join(this.dirpath, `database.${env}.json`);
        const config = JSON.parse(fs.readFileSync(filepath, 'utf-8'));

        return _.has(config, 'extend') ? this.extend(config) : config;
    }
}
// END

// const extendedConfig = { ...extend, ..._.omit(config, 'extend') };
