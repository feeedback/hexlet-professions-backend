// sc: https://ru.hexlet.io/courses/js-dom/lessons/forms/exercise_unit

// В задании дана форма обратной связи состоящая из трех полей: email, name и
// comment. Реализуйте логику отправки этой формы (без физической отправки
// куда-либо). Когда форма заполнена и "отправлена" (нажата кнопка send), то
// вместо формы появляется такой вывод:

// <div>
//   <p>Feedback has been sent</p>
//   <div>Email: test@email.com</div>
//   <div>Name: Matz</div>
//   <div>Comment: My Comment</div>
// </div>
// src/application.js
// Напишите и экспортируйте функцию по умолчанию, которая реализует необходимую логику.

// BEGIN (write your solution here)
// export default () => {
//     const create = (el) => document.createElement(el);

//     document.forms[0].addEventListener('submit', (event) => {
//         event.preventDefault();
//         const form = event.target;

//         const rows = [...form.elements]
//             .filter(({ type }) => type !== 'submit')
//             .map((input) => `${input.labels[0].textContent}: ${input.value}`);

//         const box = create('div');
//         const p = create('p');
//         p.textContent = 'Feedback has been sent';
//         box.append(p);

//         rows.forEach((row) => {
//             const divRow = create('div');
//             divRow.append(row);
//             box.append(divRow);
//         });
//         form.replaceWith(box);
//     });
// };

const render = (element, data) => {
  const div = document.createElement('div');
  const { email, name, comment } = data;
  div.innerHTML = `
    <p>Feedback has been sent</p>
    <div>Email: ${email}</div>
    <div>Name: ${name}</div>
    <div>Comment: ${comment}</div>
  `;
  element.replaceWith(div);
};

export default () => {
  const formElement = document.querySelector('.feedback-form');
  const handle = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    render(form, Object.fromEntries(formData));
  };
  formElement.addEventListener('submit', handle);
};
// END
