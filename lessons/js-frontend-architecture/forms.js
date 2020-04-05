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

// import _ from 'lodash';

// import { watch } from 'melanke-watchjs';
// import axios from 'axios';

// Never hardcore urls
const routes = {
    usersPath: () => '/users',
};

const errorMessages = {
    network: 'Network Problems. Try again.',
    email: 'Value is not a valid email',
    password: 'Must be at least 6 letters',
    passwordConfirmation: 'Password confirmation does not match to password',
};

// BEGIN (write your solution here)
export default () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const form = document.querySelector('form[data-form="sign-up"]');

    const mapFieldValid = {
        email: (field) => emailRegex.test(field.value),
        password: (field) => field.value.length >= 6,
        passwordConfirmation: (field) =>
            field.value === state.registrationForm.data.password.value,
    };
    // брать все inputs с аттрибутом require
    const state = {
        registrationForm: {
            data: {
                email: {
                    value: '',
                    isValid: true,
                },
                password: {
                    value: '',
                    isValid: true,
                },
                passwordConfirmation: {
                    value: '',
                    isValid: true,
                },
            },
            errors: errorMessages,
            isValidForm() {
                const fields = Object.entries(this.data);
                return fields.every(([key, data]) => mapFieldValid[key](data));
            },
        },
    };

    const requiredFields = [...new FormData(form)].filter(
        ([name]) => form.elements[name].required
    );

    requiredFields.forEach(([name, value]) => {
        state.registrationForm.data[name].value = value;

        form.elements[name].addEventListener('input', (e) => {
            state.registrationForm.data[name].value = e.target.value;
            state.registrationForm.data[name].isValid = mapFieldValid[name](
                state.registrationForm.data[name]
            );
        });
    });

    const renderError = (fieldName, errors) => {
        // <div class="invalid-feedback">
        const div = document.createElement('div');
        div.className = 'invalid-feedback';
        div.textContent = errors[fieldName];
        form.querySelector(`[name="${fieldName}"]`).parentElement.append(div);
    };

    watch(state.registrationForm, () => {
        if (!state.registrationForm.isValidForm()) {
            form.querySelector('input[type="submit"]').disabled = false;
        }
        const invalids = Object.entries(state.registrationForm.data).filter(
            ([_, data]) => data.isValid === false
        );
        invalids.forEach(([fieldName]) =>
            renderError(fieldName, state.registrationForm.errors)
        );

        // Отрисовка ошибок, хранящихся где-то в состоянии
        // state.registrationForm.errors
    });

    form.addEventListener('submit', (e) => {
        console.log('submit');
        // Обработка данных, например, отправка на сервер
        // state.registrationForm.data
    });

    // form.addEventListener('change', (event) => {
    //     const el = event.target;
    //     if (el.value === '' || el.validity.valid) {
    //         el.classList.remove('is-invalid');
    //         if (isValid(form)) {
    //             form.querySelector('input[type="submit"]').disabled = false;
    //         }
    //         return;
    //     }
    //     el.classList.add('is-invalid');
    //     form.querySelector('input[type="submit"]').disabled = true;
    // });

    // form.reportValidity();
    //  el.setCustomValidity('Value is not a valid email');
    // el.checkValidity();
};

// END
