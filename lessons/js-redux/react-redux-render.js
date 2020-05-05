/* eslint-disable no-use-before-define */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-redux/lessons/react-redux-render/exercise_unit

// src/components/App.jsx
// Реализуйте компонент, который показывает форму и хранит ее состояние в Redux.
// Форма состоит из двух элементов: текстового поля и кнопки "сброс". В процессе
// ввода текста он отображается под полем ввода. Если нажать на сброс, текст
// очищается.

// Интерфейс компонента:

// <App dispatch={store.dispatch} text="text from store" {...actionCreators} />
// Начальное состояние:

// <div>
//   <form>
//     <input type="text" value="">
//     <button type="button">Reset</button>
//   </form>
// </div>
// После ввода текста:

// <div>
//   <form>
//     <input type="text" value="hello">
//     <button type="button">Reset</button>
//   </form>
//   <div>hello</div>
// </div>

// APP
/* eslint-disable react/static-property-placement */
import React from 'react';

// BEGIN (write your solution here)
export default class App extends React.Component {
    static defaultProps = {
        text: '',
    };

    handleChangeValue = (event) => {
        event.preventDefault();
        const { dispatch, updateText } = this.props;
        const newValue = event.target.value;
        dispatch(updateText(newValue));
    };

    handleResetText = (event) => {
        event.preventDefault();
        const { dispatch, resetText } = this.props;
        dispatch(resetText());
    };

    render() {
        const { text } = this.props;
        return (
            <div>
                <form>
                    <input type="text" value={text} onChange={this.handleChangeValue} />
                    <button type="button" onClick={this.handleResetText}>
                        Reset
                    </button>
                </form>
                {text && <div>{text}</div>}
            </div>
        );
    }
}
// END

// src/index.jsx
// Реализуйте интеграцию контейнера с реактом.
// import ReactDOM from 'react-dom';
// import React from 'react';
// import { createStore } from 'redux';

// import App from './components/App.jsx';
// import reducers from './reducers.js';
// import { updateText, resetText } from './actions.js';
/* eslint-enable */

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// BEGIN (write your solution here)
const render = (text) => {
    ReactDOM.render(
        <App
            dispatch={store.dispatch}
            text={text}
            updateText={updateText}
            resetText={resetText}
        />,
        document.getElementById('container')
    );
};

store.subscribe(() => {
    const { text } = store.getState();
    render(text);
});

render();
// END

// src/reducers.js
// Добавьте необходимый редьюсер.
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/order
// import { combineReducers } from 'redux';

const text = (state = '', action) => {
    // BEGIN (write your solution here)
    switch (action.type) {
        case 'TEXT_UPDATE':
            return action.payload.text;

        case 'TEXT_RESET':
            return '';

        default:
            return state;
    }
    // END
};

// export default combineReducers({
//     text,
// });

// src/actions.js
// Добавьте необходимые действия.

// BEGIN (write your solution here)
export const updateText = (text) => ({
    type: 'TEXT_UPDATE',
    payload: {
        text: value,
    },
});

export const resetText = () => ({
    type: 'TEXT_RESET',
});
// END
