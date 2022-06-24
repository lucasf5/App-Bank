import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteExpanse as deleteBtn,
  updateExpanse as updateBtn,
} from '../actions';
import style from './Table.module.scss';

const Table = ({ expenses, deleteExpanse, updateExpanse }) => {
  const tableHeaders = [
    'Descrição',
    'Tag',
    'Método de pagamento',
    'Valor',
    'Moeda',
    'Câmbio utilizado',
    'Valor convertido',
    'Moeda de conversão',
    'Editar/Excluir',
  ];

  const queryCurrency = (array, currency, key) => {
    const resultado = Object.entries(array).find(
      (item) => item[0] === currency,
    )[1][key];
    return resultado;
  };

  return (
    <table className={ style.table }>
      <thead>
        <tr>
          {tableHeaders.map((item) => (
            <th key={ item }>{item}</th>
          ))}
        </tr>
      </thead>
      {expenses.map(
        (
          { tag, currency, exchangeRates, description, method, value, id },
          index,
        ) => (
          <tbody key={ index }>
            <tr key={ description + id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value).toFixed(2)}</td>
              <td>
                {queryCurrency(exchangeRates, currency, 'name').split('/')[0]}
              </td>
              <td>
                {Number(queryCurrency(exchangeRates, currency, 'ask')).toFixed(
                  2,
                )}
              </td>
              <td>
                {(
                  Number(value)
                  * Number(queryCurrency(exchangeRates, currency, 'ask'))
                ).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => {
                    updateExpanse(id, expenses);
                  } }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => {
                    deleteExpanse(id);
                  } }
                >
                  Deletar
                </button>
              </td>
            </tr>
          </tbody>
        ),
      )}
    </table>
  );
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpanse: (id) => dispatch(deleteBtn(id)),
  updateExpanse: (id, expense) => dispatch(updateBtn(id, expense)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpanse: PropTypes.func.isRequired,
  updateExpanse: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
