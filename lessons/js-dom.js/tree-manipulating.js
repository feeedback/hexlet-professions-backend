// sc: https://ru.hexlet.io/courses/js-dom/lessons/tree-manipulating/exercise_unit

// prettify
// Реализуйте функцию prettify, которая находит текст (дочерние текстовые ноды) внутри
// элемента div и оборачивает текст в параграф. Экспортируйте функцию по умолчанию.

// // <body>
// //   <p>Boom</p>
// //   text
// //   <div>Bam</div>
// // </body>
// const elements = prettify(document);
// console.log(document.body.innerHTML);
// // <body>
// //   <p>Boom</p>
// //   text
// //   <div><p>Bam</p></div>
// // </body>

// Подсказки
// Очистка строки от пробельных символов: trim

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// BEGIN (write your solution here)
const prettify = (document) => {
    document.querySelectorAll('div').forEach((div) => {
        const textNodes = [...div.childNodes].filter(
            (el) => el instanceof Text && el.textContent.trim() !== ''
        ); // el.nodeType === el.TEXT_NODE

        textNodes.forEach((textNode) => {
            const pEl = document.createElement('p');
            pEl.append(textNode.textContent);
            textNode.replaceWith(pEl);
        });
    });
};
export default prettify;
// END
