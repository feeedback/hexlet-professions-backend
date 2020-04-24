-- sc: https://ru.hexlet.io/courses/rdb-basics/lessons/2nf/exercise_unit

-- В базе данных содержится таблица old_cars, в которой составной первичный ключ: model-brand.
-- model	brand	price	discount
-- m5	bmw	5500000	5
-- almera	nissan	5500000	10
-- x5m	bmw	6000000	5
-- m1	bmw	2500000	5
-- gt-r	nissan	5000000	10

-- Цена (price) в этой таблице зависит от первичного ключа (model-brand),
--  а вот скидка (discount) только от бренда (brand).

-- solution.sql
-- 1. Создайте две таблицы cars и brands, в которых отобразите нормализованную структуру таблицы old_cars.
-- Создайте суррогатный первичный ключ для каждой из таблиц. 
-- Не забудьте указать внешний ключ (brand_id) в таблице cars на таблицу brands.
--  Поле, с именем brand в таблице old_cars, должно иметь название name в таблице brands.

-- 2. Добавьте в эти таблицы те же записи, что и в исходной таблице, но в нормализованной форме.

CREATE TABLE brands (
    id bigint PRIMARY KEY,    
    name varchar(255),
    discount integer
);

CREATE TABLE cars (
    id bigint PRIMARY KEY,    
    model varchar(255),
    brand_id bigint REFERENCES brands (id),
    price bigint
);

INSERT INTO brands VALUES (1, 'bmw', 5);
INSERT INTO brands VALUES (2, 'nissan', 10);

INSERT INTO cars VALUES (1, 'm5', 1, 5500000);
INSERT INTO cars VALUES (2, 'almera', 2, 5500000);
INSERT INTO cars VALUES (3, 'x5m', 1, 6000000);
INSERT INTO cars VALUES (4, 'm1', 1, 2500000);
INSERT INTO cars VALUES (5, 'gt-r', 2, 5000000);
