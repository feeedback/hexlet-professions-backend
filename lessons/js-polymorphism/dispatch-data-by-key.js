// sc:
// https://ru.hexlet.io/courses/js-polymorphism/lessons/dispatch-data-by-key/exercise_unit

// html.js
// Реализуйте и экспортируйте по умолчанию функцию getLinks(tags), которая принимает на
// вход список тегов, находит среди них теги a, link и img, а затем извлекает ссылки и
// возвращает список ссылок. Теги подаются на вход в виде массива, где каждый элемент это
// тег. Тег имеет следующую структуру:

// name - имя тега.
// href или src - атрибуты. Атрибуты зависят от тега: img - src, a - href, link - href.
// import getLinks from './html.js';

// const tags = [
//   { name: 'img', src: 'hexlet.io/assets/logo.png' },
//   { name: 'div' },
//   { name: 'link', href: 'hexlet.io/assets/style.css' },
//   { name: 'h1' },
// ];

// const links = getLinks(tags);
// // [
// //   'hexlet.io/assets/logo.png',
// //   'hexlet.io/assets/style.css'
// // ];

// BEGIN (write your solution here)
const getLinks = (tags) => {
    const map = new Map([
        ['img', 'src'],
        ['a', 'href'],
        ['link', 'href'],
    ]);
    return tags.filter(({ name }) => map.has(name)).map((tag) => tag[map.get(tag.name)]);
};
export default getLinks;
// END
