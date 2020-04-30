/* eslint-disable no-undef */
/* eslint-disable max-len */
// sc: https://ru.hexlet.io/courses/js-frontend-architecture/lessons/forms/exercise_unit

// В этой задаче вам предстоит реализовать форму регистрации. Форма состоит из 4
// полей (имя, email, пароль и его подтверждение). Начальный HTML доступен в
// public/index.html.

// Форма должна быть контролируемой. Во время набора данных выполняется валидация
// сразу всех полей (для простоты). Валидацию нужно построить на базе библиотеки
// yup. В коде уже описана вся нужная валидация. Осталось только вызвать проверку
// и записать тексты ошибок в объект состояния.

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
//       <input id="sign-up-email" required="" type="email" class="form-control is-invalid" name="email"><div class="invalid-feedback">Value is not a valid email</div>
//     </div>
//     <div class="form-group">
//       <label for="sign-up-password">Password<sup>*</sup></label>
//       <input id="sign-up-password" required="" type="password" class="form-control is-invalid" name="password"><div class="invalid-feedback">Must be at least 6 letters</div>
//     </div>
//     <div class="form-group">
//       <label for="sign-up-password-confirmation">Password Confirmation<sup>*</sup></label>
//       <input id="sign-up-password-confirmation" required="" type="password" class="form-control" name="passwordConfirmation">
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

// Подсказки
// validateSync – для вызова валидации (работает через исключения). Не забудьте
// выключить опцию abortEarly.
// В исключении валидатора есть свойство inner.Внутри него находятся валидаторы
// конкретных полей формы.Через них можно понять у какого поля возникла ошибка и
// какая это была ошибка.
// Документация axios. Он работает очень похоже на fetch.

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: "off" */

// import _ from 'lodash';
// import * as yup from 'yup';

// import { watch } from 'melanke-watchjs';
// import axios from 'axios';

// Never hardcore urls
const routes = {
    usersPath: () => '/users',
};

const schema = yup.object().shape({
    email: yup
        .string()
        .required()
        .email(),

    password: yup
        .string()
        .required()
        .min(6),

    passwordConfirmation: yup
        .string()
        .required()
        .oneOf(
            [yup.ref('password'), null],
            'Password confirmation does not match to password'
        ),
});

const errorMessages = {
    network: {
        error: 'Network Problems. Try again.',
    },
};

// BEGIN (write your solution here)
export default () => {
    const form = document.querySelector('form[data-form="sign-up"]');
    const button = form.querySelector('input[type="submit"]');

    const state = {
        registrationForm: {
            fields: {
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
            },
            errors: {},
            isSubmitProcess: false,
            isValid: false,
        },
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        state.registrationForm.isSubmitProcess = true;

        try {
            await axios.post(routes.usersPath(), state.registrationForm.fields);
        } catch (error) {
            console.log(errorMessages.network.error);
            throw error;
        }
    });

    form.addEventListener('input', (e) => {
        const { name, value } = e.target;
        if (!Object.keys(state.registrationForm.fields).includes(name)) {
            return;
        }
        state.registrationForm.fields[name] = value;

        try {
            schema.validateSync(state.registrationForm.fields, { abortEarly: false });
        } catch (error) {
            const errors = Object.fromEntries(
                error.inner.map(({ path, message }) => [path, message])
            );
            state.registrationForm.errors = errors;
            state.registrationForm.isValid = false;
            return;
        }
        state.registrationForm.errors = {};
        state.registrationForm.isValid = true;
    });

    const deleteErrorAlertsFromValidField = (errors = {}) => {
        const validField = Object.keys(state.registrationForm.fields).filter(
            (field) => !(field in errors)
        );

        validField.forEach((fieldName) => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            field.classList.remove('is-invalid');

            const divAlert = field.parentElement.querySelector('div.invalid-feedback');
            if (divAlert) {
                divAlert.remove();
            }
        });
    };

    const renderError = (errors) => {
        deleteErrorAlertsFromValidField(errors);

        const createAlertDiv = (errorMessage) => {
            const div = document.createElement('div');
            div.className = 'invalid-feedback';
            div.textContent = errorMessage;
            return div;
        };

        Object.keys(errors).forEach((fieldName) => {
            const field = form.querySelector(`[name="${fieldName}"]`);

            const divAlert = field.parentElement.querySelector('div.invalid-feedback');
            if (divAlert) {
                divAlert.remove();
            }
            field.after(createAlertDiv(errors[fieldName]));

            field.classList.add('is-invalid');
        });
    };

    watch(state.registrationForm, 'errors', () => {
        renderError(state.registrationForm.errors);
    });

    watch(state.registrationForm, 'isSubmitProcess', () => {
        button.setAttribute('disabled', '');

        const container = form.closest('div[data-container="sign-up"]');
        container.textContent = 'User Created!';
    });

    watch(state.registrationForm, 'isValid', () => {
        if (state.registrationForm.isValid) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', '');
        }
    });
};
// END
