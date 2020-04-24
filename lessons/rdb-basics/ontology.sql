-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/ontology/exercise_unit

-- Каждый раз когда мы совершаем покупки в интернете, на стороне продавца
-- формируется "заказ". Это сущность, которая описывает собой конкретную покупку и
-- включает в себя пользователя, а также список позиций. Если взять какой-нибудь
-- интернет-магазин торгующий электроникой, то в заказ могут входить клавиатура,
-- мышка и коврик. Ниже представлена ERD в которой отражены сущности, участвующие
-- в процессе.

-- ERD Заказа

-- На диаграмме выше, цена из товара, копируется в order_items. Подумайте для чего
-- это надо? Подсказка: мутабельность.

-- solution.sql
-- Реализуйте таблицы в соответствии с указанной выше диаграммой, кроме таблицы
-- users, которая уже создана.

-- DROP TABLE IF EXISTS users CASCADE;
-- CREATE TABLE users (
--   id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--   email varchar(255),
--   first_name varchar(255)
-- );

CREATE TABLE goods (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255),
  price integer
);

CREATE TABLE orders (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id bigint REFERENCES users(id),
  created_at timestamp
);

CREATE TABLE order_items (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id bigint REFERENCES orders(id),
  good_id bigint REFERENCES goods(id),
  price integer
);