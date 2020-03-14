// sc: https://ru.hexlet.io/courses/js-testing/lessons/bad-practice/exercise_unit

// tests/cart.test.js
// Напишите тесты для корзины интернет-магазина. Интерфейс:

// makeCart – создает новую корзину (объект).
// addItem(good, count) – добавляет в корзину товары и их количество. Товар это объект у
// которого два свойства: name – имя и price – стоимость.
// getItems – возвращает товары в формате [{ good, count }, { good, count }, ...]
// getCost – возвращает стоимость корзины. Стоимость корзины высчитывается как сумма всех
// добавленных товаров с учетом их количества.
// getCount – возвращает количество товаров в корзине
// const cart = makeCart();
// cart.addItem({ name: 'car', price: 3 }, 5);
// cart.addItem({ name: 'house', price: 10 }, 2);
// cart.getItems().length; // 2
// cart.getCost(); // 35
// cart.addItem({ name: 'house', price: 10 }, 1);
// cart.getItems().length; // 3
// cart.getCost(); // 45

// @ts-check

const getImplementation = require('../implementations');

const makeCart = getImplementation();

// BEGIN (write your solution here)
test('cart', () => {
    const item1 = { name: 'car', price: 3 };
    const count1 = 5;
    const item2 = { name: 'house', price: 10 };
    const count2 = 2;

    const cart = makeCart();

    cart.addItem(item1, count1);
    const items = cart.getItems();
    const itemsEq = [{ good: item1, count: count1 }];
    expect(items).toStrictEqual(itemsEq);

    cart.addItem(item2, count2);
    expect(cart.getItems()).toHaveLength(2);
    expect(cart.getCost()).toEqual(item1.price * count1 + item2.price * count2);
    expect(cart.getCount()).toEqual(count1 + count2);
});
// END
