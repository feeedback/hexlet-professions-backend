// sc: https://ru.hexlet.io/challenges/js_functions_filter_anagrams/instance

// Анаграммы — это слова, которые состоят из одинаковых букв. Например:

// спаниель — апельсин карат — карта — катар топор — ропот — отпор filterAnagrams.js

// Реализуйте и экспортируйте по умолчанию функцию, которая находит все анаграммы слова.
// Фукнция принимает исходное слово и список для проверки (массив), а возвращает массив
// всех анаграмм. Если в списке слов отсутствуют анаграммы, то возвращается пустой массив.

const sortStr = (str) =>
    str
        .split('')
        .sort()
        .join('');

export default (sourceWord, list) => {
    const chars = sortStr(sourceWord);
    const anagrams = list.filter((word) => sortStr(word) === chars);
    return anagrams;
};
