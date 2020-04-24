-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/3nf/exercise_unit

-- В базе данных содержится таблица old_cities, следующей структуры

-- country	region	city
-- Россия	Татарстан	Бугульма
-- Россия	Татарстан	Казань
-- Россия	Самарская область	Тольятти
-- Город в этой таблице зависит и от региона и от страны.
--  Зависимость от региона прямая, а вот от страны город зависит косвенно, так как страна определяется регионом.

-- solution.sql
-- 1. Создайте три таблицы countries, country_regions и country_region_cities,
--  в которых отобразите нормализованную структуру исходной таблицы old_cities.
--  Создайте суррогатный первичный ключ для каждой из таблиц. Не забудьте указать внешний ключ.
--  Поле для имени сущности в каждой таблице назовите именем name. Все ключи должны иметь тип bigint.

-- 2. Добавьте в созданные таблицы те же записи, что и в исходной таблице, но в нормализованной форме.

-- Подсказки
-- Внешний ключ именуется как: имя таблицы в единственном числе плюс _id.
-- Перед тем как писать запросы в файл, зайдите в psql и поэкспериментируйте как следует.

-- Структура родительской ненормализованной таблицы
-- DROP TABLE IF EXISTS old_cities;
-- CREATE TABLE old_cities (
--   country varchar(255),
--   region varchar(255),
--   city varchar(255)
-- );
-- INSERT INTO old_cities VALUES
--   ('Россия', 'Татарстан', 'Бугульма'),
--   ('Россия', 'Самарская область', 'Тольятти'),
--   ('Россия', 'Татарстан', 'Казань');

CREATE TABLE countries (
    id bigint PRIMARY KEY,
    name varchar(255)    
);

CREATE TABLE country_regions (
    id bigint PRIMARY KEY,
    country_id bigint REFERENCES countries(id),
    name varchar(255)
);

CREATE TABLE country_region_cities (
    id bigint PRIMARY KEY,
    country_region_id bigint REFERENCES country_regions(id),
    name varchar(255)
);

INSERT INTO countries VALUES (1, 'Россия');

INSERT INTO country_regions VALUES
  (1, 1, 'Татарстан'),
  (2, 1, 'Самарская область');

INSERT INTO country_region_cities VALUES
  (1, 1, 'Бугульма'),
  (2, 2, 'Тольятти'),
  (3, 1, 'Казань');