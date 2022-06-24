import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import style from './header.module.scss';

const Header = ({ user, expenses }) => (
  <div className={ style.header }>
    <h3 data-testid="email-field" className={ style.user }>{user}</h3>
    <h3 data-testid="total-field" className={ style.total }>
      {new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(expenses.reduce(
        (acc, { value, currency, exchangeRates }) => (
          acc + Number(value) * exchangeRates[currency].ask
        ), 0,
      ).toFixed(2))}
    </h3>
    <h3 data-testid="header-currency-field" className={ style.currency }>BRL</h3>
  </div>
);

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  user: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,

};
