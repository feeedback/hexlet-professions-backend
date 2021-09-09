/* eslint-disable react/prop-types */
// sc: https://ru.hexlet.io/courses/js-react/lessons/refs/exercise_unit

// src/MarkdownEditor.jsx
// Реализуйте компонент <MarkdownEditor />, который является React оберткой
// jquery-плагина bootstrap-markdown. Этот плагин позволяет встроить в страницу
// Markdown-редактор.

// $(element).markdown({
//   iconlibrary: 'fa', // правильная библиотека иконок
//   onChange: (e) => {
//     const content = e.getContent();
//     // код который вызовется при изменении содержимого редактора
//   },
// });
// Компонент принимает на вход функцию как свойство onContentChange, которая
// вызывается при каждом изменении в редакторе. Функция принимает на вход
// содержимое редактора. Его использование видно в файле src/index.jsx.

// Посмотреть пример работы редактора можно на Хекслете. Когда вы пишете топик в
// обсуждениях или комментариях к нему, то там используется именно этот редактор.

import $ from 'jquery';
import React from 'react';

// BEGIN (write your solution here)
export default class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.rootElement = React.createRef();
  }

  componentDidMount() {
    $(this.rootElement.current).markdown({
      iconlibrary: 'fa',
      onChange: this.handleChangeValue,
    });
  }

  handleChangeText = () => {
    const { value } = this.rootElement.current;
    this.setState({ value });
  };

  handleChangeValue = (event) => {
    const content = event.getContent();
    const { onContentChange } = this.props;
    onContentChange(content);
    this.setState({ value: content });
  };

  render() {
    const { value } = this.state;
    return <div ref={this.rootElement} value={value} onChange={this.handleChangeText} />;
  }
}
// END

// В РЕШЕНИИ УЧИТЕЛЯ STATE НЕТ (НЕ ХРАНИМ VALUE)
