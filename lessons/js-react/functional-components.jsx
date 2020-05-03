/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
// sc: https://ru.hexlet.io/courses/js-react/lessons/functional-components/exercise_unit

// src/Card.jsx
// Реализуйте компонент <Card> так чтобы можно составлять такую структуру:

// <Card>
//   <Card.Body>
//     <Card.Title>Title</Card.Title>
//     <Card.Text>Text</Card.Text>
//   </Card.Body>
// </Card>
// Получившийся HTML:

// <div class="card">
//   <div class="card-body">
//     <h4 class="card-title">Title</h4>
//     <p class="card-text">Text</p>
//   </div>
// </div>

import React from 'react';

// BEGIN (write your solution here)
const Body = (props) => <div className="card-body">{props.children}</div>;
const Title = (props) => <h4 className="card-title">{props.children}</h4>;
const Text = (props) => <p className="card-text">{props.children}</p>;

export default class Card extends React.Component {
    static Body = Body;

    static Title = Title;

    static Text = Text;

    render() {
        const { children } = this.props;
        return <div className="card">{children}</div>;
    }
}
// END
