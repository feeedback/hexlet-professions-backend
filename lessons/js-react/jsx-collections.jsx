/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
// sc: https://ru.hexlet.io/courses/js-react/lessons/jsx-collections/exercise_unit

/* <dl>
  <dt>Coffee</dt>
  <dd>Black hot drink</dd>
  <dt>Milk</dt>
  <dd>White cold drink</dd>
</dl>
dl тег, используется при создании списков определений, 
в которых dt тег содержит название, а dd описание определения.

src/Definitions.js
Реализуйте компонент Definitions, который принимает свойство data следующей структуры:

const definitions = [
  { dt: 'one', dd: 'two' },
  { dt: 'another term', dd: 'another description' },
];

<Definitions data={definitions} />
Результатом должен быть следующий вывод:

<dl>
  <dt>one</dt>
  <dd>two</dd>
  <dt>another term</dt>
  <dd>another description</dd>
</dl>
Если data это пустой массив, то ничего не должно рендерится */

/* eslint-disable react/prefer-stateless-function */

import { uniqueId } from 'lodash';
import React from 'react';

// BEGIN (write your solution here)
export default class Definitions extends React.Component {
  render() {
    const { data } = this.props;
    if (data.length === 0) {
      return null;
    }

    const tags = data.map(({ dt, dd }) => (
      <React.Fragment key={uniqueId()}>
        <dt>{dt}</dt>
        <dd>{dd}</dd>
      </React.Fragment>
    ));

    return <dl>{tags}</dl>;
  }
}
// END
