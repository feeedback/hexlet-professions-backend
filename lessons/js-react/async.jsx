// sc: https://ru.hexlet.io/courses/js-react/lessons/async/exercise_unit

// src/Autocomplete.jsx
// Реализуйте компонент <Autocomplete />, который представляет собой текстовое
// поле с автодополнением списка стран.

// Autocomplete

// Список стран можно получить сделав запрос:

// const res = await axios.get('/countries', { params: { term: 'al' } });
// console.log(res.data); // => ["Albania","Algeria"]
// Где term это начало слова (любое количество символов введенное пользователем)

// Начальный HTML:

// <div>
//   <form>
//     <div class="form-group">
//       <input type="text" class="form-control" placeholder="Enter Country">
//     </div>
//   </form>
// </div>
// HTML после выбора "al":

// <div>
//   <form>
//     <div class="form-group">
//       <input type="text" class="form-control" placeholder="Enter Country">
//     </div>
//   </form>
//   <ul>
//     <li>Albania</li>
//     <li>Algeria</li>
//   </ul>
// </div>

// В качестве key для элементов списка используйте название страны.

import axios from 'axios';
import React from 'react';

// BEGIN (write your solution here)
export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', listAutocomplete: [] };
    }

    getListAutocomplete = async (e) => {
        const { value } = e.target;        
        this.setState({ value });
        
        if (value === '') {
            this.setState({ listAutocomplete: [] });
            return;
        }
        try {
            const res = await axios.get('/countries', { params: { term: value } });
            this.setState({ listAutocomplete: res.data });
        } catch (error) {
            console.error(error);
        }
    };

    renderListAutocomplete() {
        const { listAutocomplete } = this.state;
        if (listAutocomplete.length === 0) {
            return null;
        }
        const items = listAutocomplete.map((item) => <li key={item}>{item}</li>);
        return <ul>{items}</ul>;
    }

    render() {
        const { value } = this.state;
        return (
          <div>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Country"
                  value={value}
                  onChange={this.getListAutocomplete}
                />
              </div>
            </form>
            {this.renderListAutocomplete()}
          </div>
        );
    }
}
// END
