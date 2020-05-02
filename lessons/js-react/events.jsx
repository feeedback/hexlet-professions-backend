/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-react/lessons/events/exercise_unit

// src/Carousel.jsx
// Реализуйте компонент, эмулирующий работу слайдера. Компонент принимает на вход
// свойство images, в котором находится список путей до картинок. Компонент
// отображает их и позволяет с помощью стрелок "вперёд" и "назад" осуществлять
// переход по ним. Сам переход зациклен. Картинки (пути до них) могут повторятся.

// Ниже описано поведение:

// Если выбрана последняя картинка, то next ведёт на первую. Тоже самое происходит
// и prev, но в обратную сторону.
// Первая картинка становится активной. Порядок картинок и их отображение должны
// сохраняться.
// Начальная вёрстка с данными, которые прогружаются в файле src/index.jsx:

// <div id="carousel" class="carousel slide" data-ride="carousel">
//   <div class="carousel-inner">
//     <div class="carousel-item active">
//       <img alt="" class="d-block w-100" src="/images/first.jpeg">
//     </div>
//     <div class="carousel-item">
//       <img alt="" class="d-block w-100" src="/images/second.jpeg">
//     </div>
//     <div class="carousel-item">
//       <img alt="" class="d-block w-100" src="/images/third.jpeg">
//     </div>
//   </div>
//   <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
//     <span class="carousel-control-prev-icon"></span>
//     <span class="sr-only">Previous</span>
//   </a>
//   <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
//     <span class="carousel-control-next-icon"></span>
//     <span class="sr-only">Next</span>
//   </a>
// </div>
// Хотя вёрстка и не тривиальная, единственное, что меняется в ней — класс active.

// Подсказки
// Carousel https://getbootstrap.com/docs/4.0/components/carousel/

import React from 'react';
import cn from 'classnames';
import _ from 'lodash';

// BEGIN (write your solution here)
export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
        const { images } = props;
        this.state = { length: images.length, activeImageIndex: 0 };
    }

    setNewImage = (direction) => (e) => {
        e.preventDefault();

        const { length, activeImageIndex } = this.state;
        const directionMap = {
            'prev': (activeImageIndex + (length - 1)) % length,
            'next': (activeImageIndex + 1) % length
        }
        const next = directionMap[direction];
        this.setState({ activeImageIndex: next });
    };

    renderCarouselItems() {
        const { images } = this.props;
        const { activeImageIndex: activeImage } = this.state;

        return images.map((src, index) => {
            const active = (index === activeImage);
            console.log(activeImage, active);
            const classCarouselItem = cn({
                'carousel-item': true,
                active
            });
            return (
              <div key={_.uniqueId()} className={classCarouselItem}>
                <img alt="" className="d-block w-100" src={src} />
              </div>
            )
        })
    }

    render() {
        return (
          <div id="carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {this.renderCarouselItems()}
            </div>
                
            <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev" onClick={this.setNewImage('prev')}>
              <span className="carousel-control-prev-icon" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carousel" role="button" data-slide="next" onClick={this.setNewImage('next')}>
              <span className="carousel-control-next-icon" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        );
    }
}
// END