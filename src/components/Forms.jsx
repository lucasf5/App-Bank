/* eslint-disable sonarjs/no-identical-functions */
import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  setExpanse as ExpanseSET,
  buscaCurrencies as Currencies,
} from '../actions';
import style from './Forms.module.scss';

const Forms = ({ currencies, expenses, setExpanse }) => {
  const INITIAL_STATE = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };
  const [information, setInformation] = React.useState(INITIAL_STATE);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInformation({ ...information, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rates = await fetch(
      'https://economia.awesomeapi.com.br/json/all',
    ).then((response) => response.json());
    setExpanse({ ...information, exchangeRates: rates });
    console.log(expenses);
    setInformation(INITIAL_STATE);
  };

  return (
    <form onSubmit={ handleSubmit } className={ style.formulario }>
      <article className={ style.formulario__inputs }>
        <label htmlFor="value-input">
          Valor da despesa
          <input
            value={ information.value }
            onChange={ handleChange }
            name="value"
            type="text"
            placeholder="Valor"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description-input">
          Descrição
          <input
            value={ information.description }
            onChange={ handleChange }
            name="description"
            type="text"
            placeholder="Descrição"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="expense-currency">
          Moeda
          <select
            value={ information.currency }
            onChange={ handleChange }
            name="currency"
            id="expense-currency"
            data-testid="currency-input"
          >
            {currencies.map((item) => (
              <option key={ item } value={ item }>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="expense-pay-method">
          Pagamento
          <select
            value={ information.method }
            onChange={ handleChange }
            name="method"
            id="expense-pay-method"
            data-testid="method-input"
          >
            {['Dinheiro', 'Cartão de crédito', 'Cartão de débito'].map((item) => (
              <option key={ item } value={ item }>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="expense-category">
          Categoria
          <select
            value={ information.tag }
            onChange={ handleChange }
            name="tag"
            id="expense-category"
            data-testid="tag-input"
          >
            {['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'].map(
            // eslint-disable-next-line sonarjs/no-identical-functions
              (item) => (
                <option key={ item } value={ item }>
                  {item}
                </option>
              ),
            )}
          </select>
        </label>
      </article>
      <article className={ style.formulario__button }>
        <button type="submit" className={ style.ButtonTransacao }>
          Adicionar despesa
        </button>
      </article>
    </form>
  );
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setExpanse: (expense) => dispatch(ExpanseSET(expense)),
  buscaCurrencies: () => dispatch(Currencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);

Forms.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  setExpanse: propTypes.func.isRequired,
  //   buscaCurrencies: propTypes.func.isRequired,
};
