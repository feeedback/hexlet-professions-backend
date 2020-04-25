-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/transactions/exercise_unit

-- Механизм дружбы в социальных сетях, обычно, реализуется через отдельную таблицу
-- friendship ссылающуюся на обоих пользователей. Когда два человека начинают
-- дружить, то в эту таблицу заносятся сразу две записи:

-- friendship
-- id	user1_id	user2_id
-- 1	3	10
-- 2	10	3
-- Такой способ организации данных позволяет работать с понятием "дружба"
-- независимо от того, кто был указан первым, а кто вторым.

-- solution.sql
-- Составьте транзакцию, которая создает дружбу между пользователями Tirion и Jon.

-- Подсказки
-- Используйте в решении конкретные идентификаторы пользователей (без выполнения
-- подзапросов)
-- Идентификаторы пользователей можно узнать, сделав соответствующий запрос в базу
-- данных к таблице users, используя psql в терминале упражнения

-- CREATE TABLE users (
--   id bigint PRIMARY KEY,
--   first_name varchar(255),
--   email varchar(255),
--   birthday timestamp
-- );

-- CREATE TABLE friendship (
--   id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   user1_id bigint REFERENCES users(id),
--   user2_id bigint REFERENCES users(id)
-- );

BEGIN;
INSERT INTO friendship (user1_id, user2_id) VALUES (2, 7);
INSERT INTO friendship (user1_id, user2_id) VALUES (7, 2);
COMMIT;

-- один из вариантов, с автовыборкой id пользователя по имени, из ревью другого ученика
-- BEGIN;
-- INSERT INTO friendship (user1_id, user2_id) 
--     VALUES ((SELECT id FROM users WHERE first_name = 'Tirion'), (SELECT id FROM users WHERE first_name = 'Jon'));
-- INSERT INTO friendship (user1_id, user2_id) 
--     VALUES ((SELECT id FROM users WHERE first_name = 'Jon'), (SELECT id FROM users WHERE first_name = 'Tirion'));
-- COMMIT;