// cs: https://www.youtube.com/watch?v=2LmPCTqm2EU

// FileKV.js
// В программировании, для некоторых задач распространены key-value базы данных. Внешне
// они работают по принципу ассоциативных массивов, но живут как отдельные программы и
// умеют делать много полезных штук: например, сохранять данные на диск, переносить данные
// между машинами в сети и тому подобное.

// В этой задаче реализована подобная база данных в виде класса FileKV, который сохраняет
// свои данные на диске в указанном файле. Она имеет следующий интерфейс:

// import FileKV from '../FileKV.js';

// const map = new FileKV('/path/to/dbfile');
// // Получение значения по ключу
// map.get('key'); // 'value'
// map.get('unknownkey'); // null
// // Получение значения и дефолт
// map.get('unknownkey', 'default value'); // 'default value'
// // Установка и обновление ключа
// map.set('key2', 'value2');
// map.get('key2'); // 'value2'
// // Удаление ключа
// map.unset('key2');
// map.get('key2'); // null
// map.set('key', 'value');
// // Возврат всех данных из базы
// map.toObject(); // { key: 'value' }

// В целях тестирования бывает полезно иметь реализацию такой базы данных, которая хранит
// данные в памяти, а не во внешнем хранилище. Это позволяет легко сбрасывать состояние
// между тестами и не замедлять их.

// InMemoryKV.js
// Реализуйте и экспортируйте по умолчанию класс InMemoryKV, который представляет собой
// in-memory key-value хранилище. Данные внутри него хранятся в обычном объекте. Интерфейс
// этого класса совпадает с FileKV за исключением конструктора. Конструктор InMemoryKV
// принимает на вход объект, который становится начальным значением базы данных.

// import InMemoryKV from '../InMemoryKV.js';

// const map = new InMemoryKV({ key: 10 });
// map.get('key'); // 10

import _ from 'lodash';

// BEGIN (write your solution here)
export default class InMemoryKV {
    constructor(dataObj = {}) {
        this.data = _.cloneDeep(dataObj);
    }

    set(key, value) {
        this.data[key] = value;
    }

    unset(key) {
        // const dataWithoutKey = _.omit(data, key);
        // this.data = dataWithoutKey;
        delete this.data[key];
    }

    get(key, defaultValue = null) {
        return _.get(this.data, key, defaultValue);
    }

    toObject() {
        return _.cloneDeep(this.data);
    }
}
// END

// keyValueFunctions.js
// Реализуйте и экспортируйте по умолчанию функцию swapKeyValue, которая принимает на вход
// объект базы данных и меняет в нём ключи и значения местами.

// swapKeyValue — полиморфная функция, она может работать с любой реализацией key-value,
// имеющей такой же интерфейс.

// import InMemoryKV from '../InMemoryKV.js';
// import swapKeyValue from '../keyValueFunctions.js';

// const map = new InMemoryKV({ key: 10 });
// map.set('key2', 'value2');
// swapKeyValue(map);
// map.get('key'); // null
// map.get(10); // 'key'
// map.get('value2'); // 'key2'

// Подсказки
// Изучите тесты

// BEGIN (write your solution here)
const swapKeyValue = (dataKV) => {
    const showcase = dataKV.toObject();
    for (const key in showcase) {
        dataKV.unset(key);
        dataKV.set(showcase[key], key);
    }
};
export default swapKeyValue;
// END
