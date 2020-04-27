// sc: https://ru.hexlet.io/challenges/js_introduction_to_oop_binary_tree_search/instance

// Node.js
// Двоичное дерево поиска состоит из узлов, каждый из которых содержит значение
// ключа и два поддерева (левое и правое), которые в свою очередь также являются
// двоичными деревьями. Правильное дерево не содержит повторяющихся ключей, и для
// каждого узла гарантируется, что в левом поддереве все значения меньше текущего,
// а в правом — больше.

// Двоичное дерево поиска

// Реализуйте и экспортируйте по умолчанию класс, который реализует представление
// узла. Конструктор класса принимает на вход значение ключа (число), и двух детей
// (необязательные аргументы), которые в свою очередь также являются узлами.

// Класс должен содержать методы:

// Геттер getKey() — возвращает ключ.
// Геттеры getLeft(), getRight() — возвращают соответственно левого и правого
// ребёнка. Если ребёнок в узле отсутствует, геттер возвращает null.
// search(key) — выполняет поиск узла в правильном двоичном дереве по ключу и
// возвращает узел. Если узел не найден, возвращается null.

// Примеры
// const tree = new Node(9,
//   new Node(4,
//     new Node(3),
//     new Node(6,
//       new Node(5),
//       new Node(7))),
//   new Node(17,
//     null,
//     new Node(22,
//       null,
//       new Node(20))));

// const node = tree.search(6);
// node.getKey(); // 6
// node.getLeft().getKey(); // 5
// node.getRight().getKey(); // 7

// tree.search(35); // null
// tree.search(3).getLeft(); // null

// Подсказки
// Двоичное дерево поиска

// BEGIN (write your solution here)
export default class Node {
    constructor(key = null, left = null, right = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }

    getKey() {
        return this.key;
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.right;
    }

    search(key) {
        if (this.key === key) {
            return this;
        }

        if (key < this.key && this.left !== null) {
            return this.left.search(key);
        }

        if (key > this.key && this.right !== null) {
            return this.right.search(key);
        }

        return null;
    }
}
// END
