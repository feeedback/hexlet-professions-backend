/* eslint-disable no-undef */
// sc:  https://ru.hexlet.io/courses/js-frontend-architecture/lessons/mvc/exercise_unit

// src/application.js
// Реализуйте js часть компонента list-group бутстрапа. Посмотреть пример работы
// можно здесь
// https://getbootstrap.com/docs/4.1/components/list-group/#javascript-behavior

// Задача в том чтобы добавить js код, который оживляет переключение.

// Реализуйте задание используя архитектуру MVC.

// import { watch } from 'melanke-watchjs';

// eslint-disable-next-line no-unused-vars
const variableWithQuerySelectorAndParent = () => {
    const elements = {
        boxTabs: document.querySelector('#list-tab'),
        tabLinks: document.querySelectorAll('#list-tab [data-toggle="list"]'),
        boxTabsContent: document.querySelector('#nav-tabContent'),
    };
    const state = {
        current: elements.tabLinks[0].id,
        prev: null,
    };

    watch(state, 'current', () => {
        if (state.current === state.prev) {
            return;
        }
        const prevTab = elements.boxTabs.querySelector(`#${state.prev}`);
        const tab = elements.boxTabs.querySelector(`#${state.current}`);
        prevTab.classList.remove('active');
        tab.classList.add('active');

        const prevTabContent = elements.boxTabsContent.querySelector(prevTab.hash);
        const tabContent = elements.boxTabsContent.querySelector(tab.hash);
        prevTabContent.classList.remove('active', 'show');
        tabContent.classList.add('active', 'show');
    });

    elements.tabLinks.forEach((link) =>
        link.addEventListener('click', (event) => {
            event.preventDefault();
            state.prev = state.current;
            state.current = event.target.id;
        })
    );
};

// BEGIN (write your solution here)
export default () => {
    const elements = {
        tabLinks: document.querySelectorAll('[data-toggle="list"]'),
    };

    const state = {
        current: elements.tabLinks[0].id,
        prev: null,
    };

    watch(state, 'current', () => {
        if (state.current === state.prev) {
            return;
        }
        const prevTab = document.getElementById(state.prev);
        const tab = document.getElementById(state.current);
        prevTab.classList.remove('active');
        tab.classList.add('active');

        const prevTabContent = document.getElementById(prevTab.hash.slice(1));
        const tabContent = document.getElementById(tab.hash.slice(1));
        prevTabContent.classList.remove('active', 'show');
        tabContent.classList.add('active', 'show');
    });

    elements.tabLinks.forEach((link) =>
        link.addEventListener('click', (event) => {
            event.preventDefault();
            state.prev = state.current;
            state.current = event.target.id;
        })
    );
};
// END
