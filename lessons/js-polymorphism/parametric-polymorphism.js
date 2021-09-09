/* eslint-disable no-unused-vars */
// sc:
// https://ru.hexlet.io/courses/js-polymorphism/lessons/parametric-polymorphism/exercise_unit

// В этой практике вам предстоит поработать с односвязным списком. Для лучшего понимания
// задачи, прочитайте литературу данную в подсказках и изучите исходники файла Node.js,
// внутри которого находится реализация односвязного списка. И посмотрите тесты, там видно
// как список создается и используется.

// linkedList.js
// Реализуйте и экспортируйте по умолчанию функцию reverse(list), которая принимает на
// вход односвязный список и переворачивает его.

// import Node from './Node';
// import reverse from './linkedList';

// const numbers = new Node(1, new Node(2, new Node(3))); // => (1, 2, 3)
// const reversedNumbers = reverse(numbers); // => (3, 2, 1)

// Подсказки
// Односвязный список wikipedia

// BEGIN (write your solution here)
const reverse1 = (list) => {
  const iter = (node) => {
    if (node.getNext() === null) {
      return [node.getValue()];
    }
    return [node.getValue(), ...iter(node.getNext())];
  };
  return iter(list).reduce((acc, node) => new Node(node, acc), null);
};

const reverse = (list, acc = null) => {
  const value = list.getValue();
  const next = list.getNext();

  if (next === null) {
    return new Node(value, acc);
  }
  return reverse(next, new Node(value, acc));
};

const reverseTeacher = (list) => {
  let newHead = null;
  let current = list;

  while (current) {
    newHead = new Node(current.getValue(), newHead);
    current = current.getNext();
  }

  return newHead;
};

// END
