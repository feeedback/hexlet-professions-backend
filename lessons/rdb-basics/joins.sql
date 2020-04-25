-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/joins/exercise_unit

-- solution.sql

-- Составьте запрос, который извлекает из базы идентификатор топика и имя автора
-- топика (first_name) по следующим правилам:
-- 1. Анализируются топики только тех пользователей, чей емейл находится на домене
-- lannister.com
-- 2. Выборка отсортирована по дате создания топика в прямом порядке

-- CREATE TABLE users (
--   id bigint PRIMARY KEY,
--   birthday DATE,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   first_name VARCHAR(50),
--   created_at timestamp
-- );

-- CREATE TABLE topics (
--   id bigint PRIMARY KEY,
--   user_id bigint REFERENCES users(id) NOT NULL,
--   title varchar(255),
--   body text,
--   created_at TIMESTAMP NOT NULL
-- );

SELECT topics.id, first_name
    FROM topics
    JOIN users ON topics.user_id = users.id
    WHERE email LIKE '%@lannister.com'
    ORDER BY topics.created_at;
