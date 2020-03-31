// sc: https://ru.hexlet.io/courses/js-frontend-architecture/lessons/forms/exercise_unit

// В этой задаче вам предстоит реализовать форму регистрации. Форма состоит из 4
// полей (имя, email, пароль и его подтверждение). Начальный HTML доступен в
// public/index.html.

// Форма должна быть контролируемой. Во время набора данных выполняется валидация.
// Валидацию нужно построить на базе сообщений описанных в константе errorMessages
// в файле src/application.js. Если поле пустое (значения стираются), то
// считается, что оно валидно.

// Кнопка отправки формы по умолчанию заблокирована. Она разблокируется когда
// валидна вся форма целиком и блокируется сразу, как только появляется невалидное
// значение.

// HTML когда введены неправильные email и password (один из возможных вариантов):

// <div data-container="sign-up">
//   <form data-form="sign-up" method="post">
//     <div class="form-group">
//       <label for="sign-up-name">Name</label>
//       <input id="sign-up-name" type="text" class="form-control" name="name">
//     </div>
//     <div class="form-group">
//       <label for="sign-up-email">Email<sup>*</sup></label>
//       <!-- Если поле невалидно, то добавляется класс is-invalid -->
//       <input id="sign-up-email" required="" type="email" class="form-control
//       is-invalid" name="email"><div class="invalid-feedback">Value is not a
//       valid email</div>
//     </div>
//     <div class="form-group">
//       <label for="sign-up-password">Password<sup>*</sup></label>
//       <input id="sign-up-password" required="" type="password"
//       class="form-control is-invalid" name="password"><div
//       class="invalid-feedback">Must be at least 6 letters</div>
//     </div>
//     <div class="form-group">
//       <label for="sign-up-password-confirmation">Password
//       Confirmation<sup>*</sup></label>
//       <input id="sign-up-password-confirmation" required="" type="password"
//       class="form-control" name="passwordConfirmation">
//     </div>
//     <input type="submit" class="btn btn-primary" disabled="" value="Submit">
//   </form>
// </div>

// После того как все поля введены правильно, данные формы отправляются постом на
// урл /users. Во время отправки кнопка отправки блокируется (во избежание двойной
// отправки).

// Когда форма отправлена, HTML меняется на следующий:

// <div data-container="sign-up">User Created!</div>
// src/application.js
// Экспортируйте функцию по умолчанию, которая реализует всю необходимую логику.

/* eslint no-param-reassign: ["error", { "props": false }] */

import _ from 'lodash';

import { watch } from 'melanke-watchjs';
import axios from 'axios';

// Never hardcore urls
const routes = {
    usersPath: () => '/users',
};

const errorMessages = {
    network: {
        error: 'Network Problems. Try again.',
    },
    email: {
        valid: 'Value is not a valid email',
    },
    password: {
        length: 'Must be at least 6 letters',
    },
    passwordConfirmation: {
        match: 'Password confirmation does not match to password',
    },
};

// BEGIN (write your solution here)
export default () => {
    const form = document.querySelector('form[data-form="sign-up"]');
    const state = {};

    form.elements.name.addEventListener('input', (e) => {
        state.registrationForm.data.name = e.target.value;
        // Действия: валидация, запросы, ...
    });
    form.elements.email.addEventListener('input', (e) => {
        state.registrationForm.data.email = e.target.value;
        // Действия: валидация, запросы, ...
    });

    // https://github.com/melanke/Watch.JS/
    watch(state.registrationForm, () => {
        if (state.registrationForm.state === 'invalid') {
            // Отрисовка ошибок, хранящихся где-то в состоянии
            // state.registrationForm.errors
        }
    });

    form.addEventListener('submit', (e) => {
        // Обработка данных, например, отправка на сервер
        // state.registrationForm.data
    });

    form.addEventListener('change', (event) => {
        const el = event.target;
        if (el.value === '' || el.validity.valid) {
            event.target.classList.remove('is-invalid');
        }
        form.reportValidity();
    });
    const renderInvalid = (event) => {
        event.target.classList.add('is-invalid');
    };
    form.elements.email.addEventListener('invalid', renderInvalid);
    form.elements.password.addEventListener('invalid', renderInvalid);
    form.elements.passwordConfirmation.addEventListener('invalid', renderInvalid);

    //  el.setCustomValidity('Value is not a valid email');
    // el.checkValidity();
};

// END
