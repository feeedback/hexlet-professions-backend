/* eslint-disable no-undef */
// sc:  https://ru.hexlet.io/courses/js-frontend-architecture/lessons/mvc/exercise_unit

// src/application.js
// Реализуйте js часть компонента list-group бутстрапа. Посмотреть пример работы
// можно здесь
// https://getbootstrap.com/docs/4.1/components/list-group/#javascript-behavior

// Задача в том чтобы добавить js код, который оживляет переключение.

// Реализуйте задание используя архитектуру MVC.

// import { watch } from 'melanke-watchjs';

// BEGIN (write your solution here)
export default () => {
    const elems = {
        tabsContainer: document.querySelector('#list-tab'),
        tabLinks: document.querySelectorAll('#list-tab [data-toggle="list"]'),
        tabsContentContainer: document.querySelector('#nav-tabContent'),
    };

    const linkFirstTab = elems.tabLinks[0];
    const state = {
        prev: { id: linkFirstTab.id, contentId: linkFirstTab.hash.slice(1) },
        current: null,
    };

    watch(state, 'current', () => {
        if (state.current.id === state.prev.id) {
            return;
        }
        const prevTab = elems.tabsContainer.getElementById(state.prev.id);
        const tab = elems.tabsContainer.getElementById(state.current.id);
        prevTab.classList.remove('active');
        tab.classList.add('active');

        const prevContent = elems.tabsContentContainer.getElementById(prevTabEl.hash);
        const tabContent = elems.tabsContentContainer.getElementById(tabEl.hash);
        prevContent.classList.remove('active', 'show');
        tabContent.classList.add('active', 'show');
    });

    elems.tabLinks.forEach((link) =>
        link.addEventListener('click', (event) => {
            event.preventDefault();
            state.prev = { ...state.current };
            state.current.id = event.target.id;
            state.current.contentId = event.target.hash.slice(1);
        })
    );
};
// END
