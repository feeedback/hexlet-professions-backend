// sc: https://ru.hexlet.io/courses/js-dom/lessons/jquery/exercise_unit

// В Bootstrap есть компонент Carousel.

// Этот слайдер устроен также как и все остальное в бутстрапе. В верстке
// определяются data аттрибуты, по которым бутстрап понимает что это карусель и
// оживляет ее.

// На слайдере отображаются две стрелки, одна влево другая вправо. Клики по этим
// стрелкам приводят к перемотке слайдов по кругу. С точки зрения DOM происходит
// следующее:

// Класс active снимается с текущего элемента .carousel-item
// Активный элемент получает класс active
// application.js
// Реализуйте логику слайдера в функции экспортированной по умолчанию.

// Постройте свою логику так, чтобы она позволила использовать на одной странице
// любое количество компонентов carousel с любым количеством картинок внутри.

// import $ from 'jquery';

export default () => {
    // BEGIN (write your solution here)
    const mapDirections = {
        prev: { inc: 'previousElementSibling', out: 'lastElementChild' },
        next: { inc: 'nextElementSibling', out: 'firstElementChild' },
    };
    const carouselButtons = document.querySelectorAll('a[class^=carousel-control]');
    carouselButtons.forEach((a) =>
        a.addEventListener('click', (event) => {
            event.preventDefault();
            const wrapper = document.querySelector(event.target.hash);
            const active = wrapper.querySelector('.carousel-item.active');
            active.classList.remove('active');

            const direction = mapDirections[a.dataset.slide];

            const next = active[direction.inc] ?? active.parentNode[direction.out];
            next.classList.add('active');
        })
    );
    // END
};
