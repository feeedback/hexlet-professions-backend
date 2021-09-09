// sc: https://ru.hexlet.io/courses/js-introduction-to-oop/lessons/class/exercise_unit

// Cart.js
// Реализуйте класс Cart, представляющего из себя покупательскую корзину. Интерфейс:

// addItem(good, count) – добавляет в корзину товары и их количество. Товар это объект у
// которого два свойства: name – имя и price – стоимость.
// getItems – возвращает товары в формате [{ good, count }, { good, count }, ...]
// getCost – возвращает стоимость корзины. Стоимость корзины высчитывается как сумма всех
// добавленных товаров с учетом их количества.
// getCount – возвращает количество товаров в корзине
// const cart = new Cart();
// cart.addItem({ name: 'car', price: 3 }, 5);
// cart.addItem({ name: 'house', price: 10 }, 2);
// cart.getItems().length; // 2
// cart.getCost(); // 35

import _ from 'lodash';

export default class Cart {
  constructor() {
    this.basket = [];
  }

  addItem(good, count) {
    this.basket.push({ good, count });
  }

  getItems() {
    return this.basket;
  }

  getCount() {
    return _.sumBy(this.basket, (item) => item.count);
  }

  getCost() {
    return _.sumBy(this.basket, (item) => item.good.price * item.count);
  }
}
