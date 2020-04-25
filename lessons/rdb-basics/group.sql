--sc: https://ru.hexlet.io/courses/rdb-basics/lessons/group/exercise_unit

-- Составьте запрос (к таблице users), который считает количество пользователей,
-- рождённых (поле birthday) в каждом году (из тех, что есть в birthday) по
-- следующим правилам:
-- 1. Анализируются только те пользователи, у которых указан год рождения.
-- 2. Выборка отсортирована по году рождения в прямом порядке.

-- Подсказки
-- Чтобы извлечь год из дня рождения, воспользуйтесь конструкцией: EXTRACT(year
-- FROM birthday) AS year_of_birthday.
-- Итоговая таблица должна иметь два поля с именами year_of_birthday и count.

SELECT EXTRACT(year FROM birthday) AS year_of_birthday, COUNT(*)
    FROM users
    WHERE birthday IS NOT NULL
    GROUP BY year_of_birthday
    ORDER BY year_of_birthday;