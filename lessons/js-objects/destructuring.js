// sc: https://ru.hexlet.io/courses/js-objects/lessons/destructuring/exercise_unit

// objects.js
// Реализуйте и экспортируйте по умолчанию функцию getSortedNames, которая принимает на
// вход список пользователей, извлекает их имена, сортирует в алфавитном порядке и возвращает
// отсортированный список имен.

const getSortedNames = (users) => users.map(({ name }) => name).sort();
export default getSortedNames;
