/* eslint-disable no-unused-expressions */
// sc: https://ru.hexlet.io/courses/regexp/lessons/character_classes/exercise_unit

// solution
// Напишите регулярное выражение, в котором:

// Первый и второй символ это числа
// Третий символ это /
// Четвертый это любой символ, за исключением a-z

/\d\d\/[^a-z]/;
