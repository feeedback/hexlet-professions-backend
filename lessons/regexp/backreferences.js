/* eslint-disable no-unused-expressions */
// sc: https://ru.hexlet.io/courses/regexp/lessons/backreferences/exercise_unit

// solution
// Напишите регулярное выражение, которое находит подстроки состоящие из:

// три символа из класса символов a-z
// :
// группа символов из первого условия

/([a-z]{3}):\1/;
