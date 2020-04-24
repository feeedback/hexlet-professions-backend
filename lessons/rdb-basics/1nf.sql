-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/1nf/exercise_unit

-- Создайте таблицу users со следующими полями:
-- id - первичный ключ
-- first_name - имя
-- created_at - дата создания пользователя

-- Добавьте в таблицу users одну произвольную запись.

-- Создайте таблицу orders со следующими полями:
-- id - первичный ключ
-- user_first_name - при вставке записи здесь указывается имя пользователя из таблицы users
-- months - количество покупаемых месяцев (обучение на Хекслете)
-- created_at - дата создания заказа

-- Добавьте в таблицу orders два заказа на созданного ранее пользователя
-- Значения первичных ключей задайте самостоятельно. Автогенерация изучается дальше по курсу.

-- Примеры вставки данных в эти таблицы:
-- INSERT INTO users (id, first_name, created_at) VALUES (1, 'Tom', '1832-11-23');
-- INSERT INTO orders (id, user_first_name, months, created_at) VALUES (1, 'Tom', 3, '2012-10-1');


CREATE TABLE users (
    id bigint PRIMARY KEY,
    first_name varchar(255),
    created_at timestamp
);

INSERT INTO users VALUES (0, 'User1', '1832-10-10');

CREATE TABLE orders (
    id bigint PRIMARY KEY,
    user_first_name varchar(255),
    months integer,
    created_at timestamp
);

INSERT INTO orders VALUES (0, 'User1', 3, '2012-10-1');
INSERT INTO orders VALUES (1, 'User1', 3, '2012-10-1');