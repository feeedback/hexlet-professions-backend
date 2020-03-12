// sc: https://ru.hexlet.io/challenges/js_arrays_length_of_last/instance

// solution.js;
// Реализуйте и экспортируйте по умолчанию функцию lengthOfLastWord, которая возвращает длину
// последнего слова переданной на вход строки. Словом считается любая последовательность, не
// содержащая пробелов.

const lengthOfLastWord = (str) => {
    const words = str.trim().split(' ');
    const lastWord = words[words.length - 1];
    return lastWord.length;
};
export default lengthOfLastWord;
