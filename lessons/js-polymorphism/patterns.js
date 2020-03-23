// sc: https://ru.hexlet.io/courses/js-polymorphism/lessons/patterns/exercise_unit

// В этом задании будем работать с классами, которые представляют теги HTML. Метод
// render(), позволяет получить текстовое представление тега:

// import InputTag from '../tags/InputTag.js';

// const tag = new InputTag('submit', 'Save');
// tag.render(); // <input type="submit" value="Save">
// Предположим, что эта система нужна для генерации разных кусков верстки, которая может
// быть очень разнообразной. Попробуйте ответить на вопрос, сколько понадобится классов
// для представления всех возможных комбинаций тегов?

// Если создавать по классу на каждый возможный вариант верстки, то классов будет
// бесконечно много и смысла в такой реализации очень мало. Но вместо этого лучше
// использовать композицию. Создать класс для каждого индивидуального тега (в html5 их
// около 100 штук), а затем путем комбинирования получить все возможные варианты верстки.

// tags/LabelTag.js
// Реализуйте класс LabelTag, который умеет оборачивать другие теги:

// Примеры
// import InputTag from '../tags/InputTag.js';
// import LabelTag from '../tags/LabelTag.js';

// const inputTag = new InputTag('submit', 'Save');
// const labelTag = new LabelTag('Press Submit', inputTag);
// labelTag.render();
// // <label>
// //   Press Submit
// //   <input type="submit" value="Save">
// // </label>

// Подсказки
// Изучите реализацию класса InputTag
// Паттерн Декоратор https://ru.wikipedia.org/wiki/Декоратор_(шаблон_проектирования)

// BEGIN (write your solution here)
export default class LabelTag {
    constructor(text, innerTag) {
        this.text = text;
        this.innerTag = innerTag;
    }

    render() {
        return `<label>${this.text}${this.innerTag}</label>`;
    }

    toString() {
        return this.render();
    }
}
// END
