// sc: https://ru.hexlet.io/challenges/js_objects_find_where/instance

// arrays.js

// Реализуйте и экспортируйте по умолчанию функцию findWhere, которая принимает на вход
// массив (элементы которого — это объекты) и пары ключ-значение (тоже в виде объекта), а
// возвращает первый элемент исходного массива, значения которого соответствуют переданным
// парам (всем переданным). Если совпадений не было, то функция должна вернуть null.

export default (data, where) => {
    const isHas = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
    const isEqually = (obj, key) => isHas(obj, key) && obj[key] === where[key];
    const isObjectHasData = (obj) =>
        Object.keys(where).every((key) => isEqually(obj, key));

    return data.find((obj) => isObjectHasData(obj)) || null;
};
