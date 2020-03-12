// sc: https://ru.hexlet.io/courses/js-objects/lessons/for-of/exercise_unit

// objects.js

// Реализуйте функцию pick, которая извлекает из переданного объекта все элементы по указанным
// ключам и возвращает новый объект. Аргументы:

// Исходный объект Массив ключей, по которому необходимо выбирать элементы (ключ и значение) из
// исходного объекта, и на основе выбранных данных сформировать новый объект Экспортируйте функцию
// по умолчанию.
const isHas = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
const pick = (obj, keys) =>
    keys.reduce((res, key) => (isHas(obj, key) ? { ...res, [key]: obj[key] } : res), {});
export default pick;

export default (obj, keys) => {
    const result = {};
    const mapKeys = new Set(Object.keys(obj));

    for (const key of keys) {
        if (mapKeys.has(key)) {
            result[key] = obj[key];
        }
    }
    return result;
};
