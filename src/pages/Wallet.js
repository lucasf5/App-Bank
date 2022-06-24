import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { buscaCurrencies as Currencies } from '../actions';
import Forms from '../components/Forms';
import Table from '../components/Table';

const Wallet = ({ buscaCurrencies }) => {
  useEffect(() => {
    buscaCurrencies();
  }, []);

  return (
    <div>
      <Header />
      <Forms />
      <Table />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  buscaCurrencies: () => dispatch(Currencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  buscaCurrencies: propTypes.func.isRequired,
};
