-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/alter/exercise_unit#coursenav-modal

-- solution.sql
-- Напишите запрос обновляющий таблицу структуры:

-- CREATE TABLE users (
--   id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   email varchar(255) NOT NULL,
--   age integer,
--   name varchar(255)
-- );
-- В структуру:

-- CREATE TABLE users (
--   id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   email varchar(255) NOT NULL UNIQUE,
--   first_name varchar(255) NOT NULL,
--   created_at timestamp
-- );
-- name и first_name - одна и та же колонка.

-- Подсказки
-- Добавление констрейна UNIQUE выполняется через команду ADD
-- Установка констрейна NOT NULL выполняется через команды ALTER COLUMN и SET


ALTER TABLE users DROP COLUMN age;
ALTER TABLE users ADD COLUMN created_at timestamp;
ALTER TABLE users RENAME COLUMN name TO first_name;
ALTER TABLE users ALTER COLUMN first_name SET NOT NULL;
ALTER TABLE users ADD UNIQUE (email);

-- ALTER TABLE users ADD CONSTRAINT email UNIQUE(email);
-- писать добавление ключа Уникальности в таком виде не стоит.
-- Это именованный ключ уникальности
-- https://postgrespro.ru/docs/postgresql/11/ddl-constraints#DDL-CONSTRAINTS-UNIQUE-CONSTRAINTS
