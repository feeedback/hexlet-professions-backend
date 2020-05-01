/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-react/lessons/classnames/exercise_unit

// src/Alert.js
// Реализуйте компонент Alert, который отрисовывает алерт бутстрапа. Компонент
// принимает на вход два свойства:

// text - отображаемый текст
// type - тип алерта, может принимать одно из следующих значений: primary,
// secondary, success, danger, warning, info, light, dark;

// Пример использования:
// <Alert type="warning" text="what is love?" />;

// Вывод:
// 

// Подсказки
// Alerts https://getbootstrap.com/docs/4.0/components/alerts/

/* eslint-disable react/prefer-stateless-function */

import cn from 'classnames';
import React from 'react';

// BEGIN (write your solution here)
export default class Alert extends React.Component {
    render() {
        const { type, text } = this.props;
        const alertClass = cn({
            alert: true,
            [`alert-${type}`]: true,
        });

        return <div className={alertClass} role="alert">{text}</div>;
    }
};
// END
