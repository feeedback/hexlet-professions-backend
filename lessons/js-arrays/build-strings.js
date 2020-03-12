// sc: https://ru.hexlet.io/courses/js-arrays/lessons/build-strings/exercise_unit

// strings.js
// Реализуйте функцию buildDefinitionList, которая генерирует HTML список определений (теги <dl>,
// <dt> и <dd>) и возвращает получившуюся строку. При отсутствии элементов в массиве функция
// возвращает пустую строку. Экспортируйте функцию по умолчанию.

// Параметры функции
// Список определений следующего формата:

//  const definitions = [
//   ['definition1', 'description1'],
//   ['definition2', 'description2']
// ];
// То есть каждый элемент входного списка сам является массивом, содержащим два элемента:
// термин и его определение.

const buildDefinitionList = (definitions) => {
    if (definitions.length === 0) {
        return '';
    }
    const dtdd = definitions.map(([dt, dd]) => `<dt>${dt}</dt><dd>${dd}</dd>`);
    return `<dl>${dtdd.join('')}</dl>`;
};
export default buildDefinitionList;
