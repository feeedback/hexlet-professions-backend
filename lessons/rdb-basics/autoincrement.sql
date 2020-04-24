-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/autoincrement/exercise_unit

-- solution.sql

-- 1. Создайте таблицу article_categories с двумя полями:
-- id - автогенерируемый первичный ключ
-- name - текстовое поле

-- 2. Добавьте в эту таблицу две произвольные записи

-- Подсказки
-- Перед тем как писать запросы в файл, зайдите в psql и поэкспериментируйте как следует

CREATE TABLE article_categories (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    name varchar(255)
);

INSERT INTO article_categories (name) VALUES ('name1'), ('name2');