// sc: https://ru.hexlet.io/courses/js-objects/lessons/using/exercise_unit

// objects.js

// Реализуйте и экспортируйте по умолчанию функцию getIn, которая извлекает из объекта (который
// может быть любой глубины вложенности) значение по указанным ключам. Аргументы:

// Исходный объект
// Массив ключей, по которым ведется поиск значения
// В случае, когда добраться до значения невозможно, возвращается null.

const isHas = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const getIn = (obj, path) => {
    if (!path.length) {
        return obj;
    }
    const [key, ...tail] = path;

    return isHas(obj, key) ? getIn(obj[key], tail) : null;
};

const getInForOf = (data, keys) => {
    let current = data;
    for (const key of keys) {
        if (!isHas(current, key)) {
            return null;
        }
        current = current[key];
    }

    return current;
};
export default getIn;
