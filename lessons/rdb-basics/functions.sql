-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/functions/exercise_unit

-- solution.sql
-- Составьте запрос, который извлекает из таблицы users количество записей, у
-- которых значение поля house равно stark.

-- Подсказки
-- Перед тем, как записывать решение в файл, откройте psql и попробуйте сделать
-- выборку там

SELECT COUNT(*) FROM users
    WHERE house='stark';