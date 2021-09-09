/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
// sc: https://ru.hexlet.io/courses/js-react/lessons/fsm/exercise_unit

// src/Collapse.jsx
// Реализуйте компонент <Collapse>, который по клику на ссылке отображает свое
// содержимое и при повторном - прячет. Содержимое передается в компонент через
// свойство text. За начальное состояние открытости, отвечает свойство opened,
// которое по умолчанию равно true.

// const text = 'collapse me';
// <Collapse text={text} opened={false} />;
// <div>
//   <p>
//     <a class="btn btn-primary" href="#">Link with href</a>
//   </p>
//   <div class="collapse">
//     <div class="card card-body">
//       collapse me
//     </div>
//   </div>
// </div>

// Единственное что меняется в HTML после клика, к классу collapse элемента <div>
// добавляется класс show.

// Подсказки
// Collapse https://getbootstrap.com/docs/4.3/components/collapse/

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/static-property-placement */

import React from 'react';
import cn from 'classnames';

// BEGIN (write your solution here)
export default class Collapse extends React.Component {
  static defaultProps = {
    opened: true,
  };

  constructor(props) {
    super(props);
    const { opened } = props;
    this.state = { isShown: opened };
  }

  toggleText = (e) => {
    e.preventDefault();
    this.setState(({ isShown }) => ({ isShown: !isShown }));
  };

  render() {
    const { isShown } = this.state;
    const { text } = this.props;
    const classCollapseItem = cn({ collapse: true, show: isShown });
    return (
      <div>
        <p>
          <a className="btn btn-primary" href="#" onClick={this.toggleText}>
            Link with href
          </a>
        </p>
        <div className={classCollapseItem}>
          <div className="card card-body">{text}</div>
        </div>
      </div>
    );
  }
}
// END
