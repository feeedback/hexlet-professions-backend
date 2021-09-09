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
  email: yup.string().required().email(),

  password: yup.string().required().min(6),

  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Password confirmation does not match to password'),
});

const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// BEGIN (write your solution here)
const updateValidationState = (state) => {
  try {
    schema.validateSync(state.form.fields, { abortEarly: false });

    state.form.errors = {};
    state.form.isValid = true;
  } catch (error) {
    const errors = Object.fromEntries(error.inner.map(({ path, message }) => [path, message]));
    state.form.errors = errors;
    state.form.isValid = false;
  }
};

export default () => {
  const state = {
    form: {
      fields: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      errors: {},
      processState: 'filling',
      isValid: false,
    },
  };

  const form = document.querySelector('form[data-form="sign-up"]');
  const submitButton = form.querySelector('input[type="submit"]');
  const container = form.closest('div[data-container="sign-up"]');
  const fieldElements = Object.keys(state.form.fields).map((fieldName) =>
    form.querySelector(`[name="${fieldName}"]`)
  );

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    state.form.processState = 'sending';

    try {
      await axios.post(routes.usersPath(), state.form.fields);
      state.form.processState = 'finished';
    } catch (error) {
      state.form.processState = 'failed';
      console.log(errorMessages.network.error);
      throw error;
    }
  });

  form.addEventListener('input', (e) => {
    const { name, value } = e.target;
    state.form.fields[name] = value;
    updateValidationState(state);
  });

  const renderError = (elements, errors) => {
    const createErrorElement = (errorMessage) => {
      const div = document.createElement('div');
      div.className = 'invalid-feedback';
      div.textContent = errorMessage;
      return div;
    };

    elements.forEach((fieldElement) => {
      const error = errors[fieldElement.name];
      if (!error) {
        return;
      }

      const errorElement = fieldElement.parentElement.querySelector('div.invalid-feedback');
      if (errorElement) {
        fieldElement.classList.remove('is-invalid');
        errorElement.remove();
      }
      fieldElement.classList.add('is-invalid');
      fieldElement.after(createErrorElement(error));
    });
  };

  watch(state.form, 'processState', () => {
    const { processState } = state.form;
    switch (processState) {
      case 'failed':
        submitButton.disabled = false;
        // render error
        break;
      case 'filling':
        submitButton.disabled = false;
        break;
      case 'sending':
        submitButton.disabled = true;
        break;
      case 'finished':
        container.innerHTML = 'User Created!';
        break;
      default:
        throw new Error(`Unknown state: ${processState}`);
    }
  });

  watch(state.form, 'errors', () => {
    renderError(fieldElements, state.form.errors);
  });

  watch(state.form, 'isValid', () => {
    submitButton.disabled = !state.form.isValid;
  });
};
// END
