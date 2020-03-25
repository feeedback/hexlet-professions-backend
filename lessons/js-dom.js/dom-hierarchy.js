// sc: https://ru.hexlet.io/courses/js-dom/lessons/dom-hierarchy/exercise_unit

// src/search.js
// Реализуйте и экспортируйте по умолчанию функцию search, которая принимает на вход
// document и имя тега, а возвращает массив из всех элементов соответствующих этому тегу.

// // <body>
// //   <p>1</p>
// //   text
// //   <div><p>2</p></div>
// // </body>
// const elements = search(document, 'p');
// // ['<p>1</p>' '<p>2</p>'] где каждый элемент это объект соответствующего типа
// console.log(elements.length); // 2
// Это задание подразумевает тренировку работы с домом как с деревом, по этой причине
// большая просьба не использовать реализацию на основе getElementsByTagName.

// Подсказки
// Имя тега соответствующего dom элементу, можно получить так: element.tagName
// Более подробно варианты использования смотрите в тестах

const searchMy = (document, tagName) => {
    const tags = [];

    const inner = (node) => {
        if (node.tagName.toLowerCase() === tagName) {
            tags.push(node);
        }
        [...node.children].forEach(inner);
    };

    inner(document.documentElement);
    return tags;
};

const search = (node, lookingForTagName) => {
    const children = [...node.children];

    const currentTags = children.filter(
        ({ tagName }) => tagName === lookingForTagName.toUpperCase()
    );

    return children.reduce(
        (tags, child) => [...tags, ...search(child, lookingForTagName)],
        currentTags
    );
};
