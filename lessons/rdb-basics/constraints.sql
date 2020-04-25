-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/constraints/exercise_unit

-- solution.sql

-- 1. Напишите запрос, создающий таблицу users со следующими полями:
-- id — первичный автогенерируемый ключ.
-- username — уникально и не может быть null.
-- email — не может быть null.
-- created_at — не может быть null.

-- 2. Напишите запрос, создающий таблицу topics со следующими полями:
-- id — первичный автогенерируемый ключ.
-- user_id — внешний ключ.
-- body — не может быть null.
-- created_at — не может быть null.

-- Подсказки
-- Выберите типы данных самостоятельно.

CREATE TABLE users (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(255) NOT NULL UNIQUE,
  email varchar(255) NOT NULL,
  created_at timestamp NOT NULL
);

CREATE TABLE topics (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id bigint REFERENCES users(id),
  body varchar(255) NOT NULL,
  created_at timestamp NOT NULL
);