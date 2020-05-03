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

// BEGIN
export default class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: '',
                city: '',
                country: '',
                address: '',
                acceptRules: false,
            },
            submittingState: 'fillingForm',
        };
    }

    handleChangeField = ({ target }) => {
        const { form } = this.state;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...form, [target.name]: value } });
    };

    handleBackToForm = () => {
        this.setState({ submittingState: 'fillingForm' });
    };

    handleSubmitForm = () => {
        this.setState({ submittingState: 'submitted' });
    };

    renderRow = (key) => {
        const { form } = this.state;
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{form[key].toString()}</td>
          </tr>
        );
    };

    renderResult() {
        const { form } = this.state;
        const keys = Object.keys(form).sort();
        return (
          <div>
            <button type="button" onClick={this.handleBackToForm}>
              Back
            </button>
            <table key="fieldsValues" className="table">
              <tbody>{keys.map(this.renderRow)}</tbody>
            </table>
          </div>
        );
    }

    renderForm() {
        const { form } = this.state;

        return (
          <form onSubmit={this.handleSubmitForm}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4" className="col-form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={this.handleChangeField}
                  value={form.email}
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4" className="col-form-label">
                  Password
                </label>
                <input
                  type="password"
                  onChange={this.handleChangeField}
                  value={form.password}
                  name="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress" className="col-form-label">
                Address
              </label>
              <textarea
                type="text"
                name="address"
                value={form.address}
                onChange={this.handleChangeField}
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity" className="col-form-label">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  onChange={this.handleChangeField}
                  value={form.city}
                  className="form-control"
                  id="inputCity"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputCountry" className="col-form-label">
                  Country
                </label>
                <select
                  id="inputCountry"
                  name="country"
                  onChange={this.handleChangeField}
                  className="form-control"
                  value={form.country}
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
                    name="acceptRules"
                    className="form-check-input"
                    onChange={this.handleChangeField}
                    type="checkbox"
                    checked={form.acceptRules}
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

    render() {
        const { submittingState } = this.state;
        switch (submittingState) {
            case 'fillingForm':
                return this.renderForm();
            case 'submitted':
                return this.renderResult();
            default:
                throw new Error(`'${submittingState}' - unknown state`);
        }
    }
}
// END
