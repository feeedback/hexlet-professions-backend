// sc: https://ru.hexlet.io/challenges/js_introduction_to_oop_binary_tree_build/instance

// Двоичное дерево — иерархическая структура данных, в которой каждый узел имеет
// не более двух потомков (детей). Как правило, первый называется родительским
// узлом, а дети называются левым и правым наследниками.

// В данном испытании мы будем использовать подвид двоичного дерева — двоичное
// дерево поиска. Правильное дерево не содержит повторяющихся ключей, и для
// каждого узла гарантируется, что в левом поддереве все значения меньше текущего,
// а в правом — больше.

// Двоичное дерево поиска

// Node.js
// Реализуйте и экспортируйте по умолчанию класс, который реализует представление узла.

// Класс должен содержать:
// Геттер getKey() — возвращает ключ.
// Геттеры getLeft(), getRight() — возвращают соответственно левого и правого
// ребёнка. Если ребёнок в узле отсутствует, геттер возвращает null.
// Метод insert(key) — выполняет добавление узла, формируя правильное двоичное дерево.

// Примеры
// const tree = new Node();
// tree.insert(9);
// tree.insert(17);
// tree.insert(4);
// tree.insert(3);
// tree.insert(6);

// tree.getKey(); // 9
// tree.getLeft().getKey(); // 4
// tree.getRight().getKey(); // 17
// tree.getLeft().getLeft().getKey(); // 3
// tree.getLeft().getRight().getKey(); // 6

// Подсказки
// Двоичное дерево wiki
// Двоичное дерево поиска wiki

// BEGIN (write your solution here)
export default class Node {
    constructor(key = null) {
        this.key = key;
        this.left = null;
        this.right = null;
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

    insert(key) {
        // если нет нод
        if (this.key === null) {
            this.key = key;
        }

        // если переданное число МЕНЬШЕ ключа данного узла
        if (key < this.key) {
            if (this.left !== null) {
                this.left.insert(key);
            } else {
                this.left = new Node(key);
            }
        }

        // если переданное число БОЛЬШЕ ключа данного узла
        if (key > this.key) {
            if (this.right !== null) {
                this.right.insert(key);
            } else {
                this.right = new Node(key);
            }
        }
    }
}
// END
