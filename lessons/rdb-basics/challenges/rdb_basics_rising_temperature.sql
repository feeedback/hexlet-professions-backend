-- sc: https://ru.hexlet.io/challenges/rdb_basics_rising_temperature/instance

-- Таблица weathers содержит записи значений температур в разные дни. Каждая
-- запись имеет id, дату date и значение температуры temperature.
-- id	date	temperature
-- 1	2016-01-01	10
-- 2	2016-01-02	25
-- 3	2016-01-03	20
-- 4	2016-01-04	30

-- solution.sql
-- Напишите SQL запрос для выбора id всех записей, температура в которых была
-- выше, чем в предыдущий день (чем вчера).
-- Запишите запрос в файл solution.sql.

-- CREATE TABLE weathers (
--   id integer,
--   date date,
--   temperature integer
-- );

SELECT weathers.id
    FROM weathers, weathers AS weathers_yesterday
    WHERE (weathers.date - weathers_yesterday.date) = 1
        AND weathers.temperature > weathers_yesterday.temperature;


SELECT weathers.id
    FROM weathers
    JOIN weathers AS weathers_yesterday
    ON (weathers.date - weathers_yesterday.date) = 1
    WHERE weathers.temperature > weathers_yesterday.temperature;

-- самый эффективный вариант?
SELECT weathers.id
    FROM weathers
    JOIN weathers AS weathers_yesterday
    ON (weathers.date - weathers_yesterday.date) = 1
        AND  weathers.temperature > weathers_yesterday.temperature;

