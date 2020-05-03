/* eslint-disable react/static-property-placement */
/* eslint-disable import/no-unresolved */
// sc: https://ru.hexlet.io/courses/js-react/lessons/forms/exercise_unit

// src/MyForm.jsx
// Реализуйте компонент <MyForm> отображающий форму из шести элементов:

// email - инпут типа email
// password - инпут типа password
// address - textarea
// city - текстовый инпут
// country - select со следующими значениями: argentina, russia, china.
// Accept Rules - checkbox
// После отправки формы, появляется таблица в которой показываются значения всех
// полей. Из этой формы можно вернуться в редактирование по кнопке Back. При этом
// все данные должны оказаться на своих местах.

// Форма

// <form>
//   <div class="form-row">
//     <div class="form-group col-md-6">
//       <label for="inputEmail4" class="col-form-label">Email</label>
//       <input type="email" name="email" class="form-control" id="inputEmail4" placeholder="Email">
//     </div>
//     <div class="form-group col-md-6">
//       <label for="inputPassword4" class="col-form-label">Password</label>
//       <input type="password" name="password" class="form-control" id="inputPassword4" placeholder="Password">
//     </div>
//   </div>
//   <div class="form-group">
//     <label for="inputAddress" class="col-form-label">Address</label>
//     <textarea type="text" class="form-control" name="address" id="inputAddress" placeholder="1234 Main St"></textarea>
//   </div>
//   <div class="form-row">
//     <div class="form-group col-md-6">
//       <label for="inputCity" class="col-form-label">City</label>
//       <input type="text" class="form-control" name="city" id="inputCity">
//     </div>
//     <div class="form-group col-md-6">
//       <label for="inputCountry" class="col-form-label">Country</label>
//       <select id="inputCountry" name="country" class="form-control">
//         <option>Choose</option>
//         <option value="argentina">Argentina</option>
//         <option value="russia">Russia</option>
//         <option value="china">China</option>
//       </select>
//     </div>
//   </div>
//   <div class="form-group">
//     <div class="form-check">
//       <label class="form-check-label" for="rules">
//         <input id="rules" type="checkbox" name="acceptRules" class="form-check-input">
//         Accept Rules
//       </label>
//     </div>
//   </div>
//   <button type="submit" class="btn btn-primary">Sign in</button>
// </form>
// После отправки формы:

// <div>
//   <button type="button">Back</button>
//   <table class="table">
//     <tbody>
//       <tr>
//         <td>acceptRules</td>
//         <td>true</td>
//       </tr>
//       <tr>
//         <td>address</td>
//         <td>lenina street</td>
//       </tr>
//       <tr>
//         <td>city</td>
//         <td>moscow</td>
//       </tr>
//       <tr>
//         <td>country</td>
//         <td>russia</td>
//       </tr>
//       <tr>
//         <td>email</td>
//         <td>my@email.com</td>
//       </tr>
//       <tr>
//         <td>password</td>
//         <td>qwerty</td>
//       </tr>
//     </tbody>
//   </table>
// </div>

// Строки сортируются в алфавитном порядке по именам в первом столбце. В вашем
// случае результирующая таблица может отличаться, все зависит от того какие
// данные выбраны.

// Подсказки
// Forms

/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */

import React from 'react';

// BEGIN (write your solution here)
export default class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email: '',
                password: '',
                address: '',
                city: '',
                country: '',
                acceptRules: false,
            },
            submitted: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
    };

    handleBackToForm = (e) => {
        e.preventDefault();
        this.setState({ submitted: false });
    };

    handleChangeField = ({ target }) => {
        const { fields } = this.state;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ fields: { ...fields, [target.name]: value } });
    };

    renderForm() {
        const {
            fields: { email, password, address, city, country, acceptRules },
        } = this.state;
        return (
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4" className="col-form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChangeField}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4" className="col-form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChangeField}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress" className="col-form-label">
                Address
              </label>
              <textarea
                type="text"
                className="form-control"
                name="address"
                id="inputAddress"
                placeholder="1234 Main St"
                value={address}
                onChange={this.handleChangeField}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity" className="col-form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  id="inputCity"
                  value={city}
                  onChange={this.handleChangeField}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputCountry" className="col-form-label">
                  Country
                </label>
                <select
                  id="inputCountry"
                  name="country"
                  className="form-control"
                  value={country}
                  onChange={this.handleChangeField}
                >
                  <option>Choose</option>
                  <option value="argentina">Argentina</option>
                  <option value="russia">Russia</option>
                  <option value="china">China</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label" htmlFor="rules">
                  <input
                    id="rules"
                    type="checkbox"
                    name="acceptRules"
                    className="form-check-input"
                    checked={acceptRules}
                    onChange={this.handleChangeField}
                  />
                  Accept Rules
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
        );
    }

    renderTable() {
        const { fields } = this.state;

        const rows = Object.entries(fields)
            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
            .map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value.toString()}</td>
              </tr>
            ));

        return (
          <div>
            <button type="button" onClick={this.handleBackToForm}>
              Back
            </button>
            <table className="table">
              <tbody>{rows}</tbody>
            </table>
          </div>
        );
    }

    render() {
        const { submitted } = this.state;
        return !submitted ? this.renderForm() : this.renderTable();
    }
}
// END
