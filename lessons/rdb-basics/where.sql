-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/where/exercise_unit

-- solution.sql
-- Составьте запрос, который извлекает все записи из таблицы users по следующим правилам:

-- Пользователи созданы позже 2018-11-23 (включая эту дату) и раньше 2018-12-12
-- (включая эту дату) или поле house имеет значение stark
-- Данные отсортированы по дате создания по убыванию

-- Подсказки
-- Перед тем как записывать решение в файл, откройте psql и попробуйте сделать выборку там

SELECT *
    FROM users 
    WHERE (created_at BETWEEN '2018-11-23' AND '2018-12-12') OR house = 'stark'
    ORDER BY created_at DESC;