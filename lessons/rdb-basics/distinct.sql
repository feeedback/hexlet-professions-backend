-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/distinct/exercise_unit

-- solution.sql
-- Составьте запрос, который извлекает из таблицы users все уникальные значения
-- поля house отсортированные по возрастанию.

-- Подсказки
-- Перед тем как записывать решение в файл, откройте psql и попробуйте сделать
-- выборку там

SELECT DISTINCT house FROM users
   ORDER BY house;