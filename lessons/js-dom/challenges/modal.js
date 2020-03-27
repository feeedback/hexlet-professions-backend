// sc: https://ru.hexlet.io/challenges/js_dom_modal/instance

// application.js
// Реализуйте и экспортируйте по умолчанию функцию, которая отвечает за показ
// модальных окон.

// <button type="button" class="btn btn-primary" data-toggle="modal"
//   data-target="#exampleModal">
//   Launch demo modal
// </button>
// <div class="modal fade" id="exampleModal">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalLabel">Modal title 1</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//     </div>
//   </div>
// </div>

// Модальные окна определяются по селектору data-toggle="modal".
// Идентификатор самого окна хранится в аттрибуте data-target кнопки
// Чтобы окно всплыло, необходимо в элемент с id из data-target добавить класс
// show и стиль display выставить в block
// За скрытие модального окна отвечает крестик доступный по селектору
// data-dismiss="modal" внутри модального окна. Нажатие на кнопку приводит к
// обратному эффекту, удаляется класс show, а display выставляется в none.

// BEGIN (write your solution here)
export default () => {
    const closeModal = (modal) => {
        modal.classList.remove('show');
        modal.style.display = 'none';
    };
    const showModal = (modal) => {
        modal.classList.add('show');
        modal.style.display = 'block';
    };

    const modalsButton = document.querySelectorAll('button[data-toggle=modal]');
    modalsButton.forEach((button) => {
        const modal = document.querySelector(button.dataset.target);
        button.addEventListener('click', () => showModal(modal));
        const closeButton = modal.querySelector('button[data-dismiss=modal]');
        closeButton.addEventListener('click', () => closeModal(modal));
    });
};
// END
