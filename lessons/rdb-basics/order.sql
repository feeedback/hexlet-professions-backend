-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/order/exercise_unit

-- solution.sql
-- Составьте запрос, который извлекает из базы данных (таблица users) все имена
-- (поле first_name) пользователей, отсортированных по дате рождения (поле
-- birthday) в обратном порядке. Те записи, у которых нет даты рождения, должны
-- быть в конце списка.

-- Подсказки
-- Перед тем, как записывать решение в файл, откройте psql и попробуйте сделать выборку там.

SELECT first_name FROM users ORDER BY birthday DESC NULLS LAST;