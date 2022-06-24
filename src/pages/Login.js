import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dinheiro from '../imagens/dinheiro.svg';
import style from './Login.module.scss';
import { updateUserInfo as updateUser } from '../actions';
import isValidEmail from '../utils/validations';

const Login = ({ updateUserInfo, history }) => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserInfo(login.email);
    history.push('/carteira');
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
    event.target.setCustomValidity('');
  };

  useEffect(() => {
    const VALID_PASSWORD = 6;
    if (login.password.length >= VALID_PASSWORD && isValidEmail(login.email)) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  }, [login.email, login.password]);

  return (
    <section className={ style.home }>
      <form
        className={ style.formulario }
        onSubmit={ (event) => handleSubmit(event) }
      >
        <img src={ Dinheiro } alt="dinheiro" className={ style.money } />
        <label htmlFor="email-input" className={ style.formulario__label }>
          E-mail
          <input
            type="email"
            name="email"
            data-testid="email-input"
            value={ login.email }
            onChange={ handleChange }
            className={ style.formulario__label__input }
          />
        </label>
        <label htmlFor="password-input" className={ style.formulario__label }>
          Password
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onInvalid={
              (e) => e.target.setCustomValidity('Senha precisa de pelo menos 6 digitos')
            }
            value={ login.password }
            onChange={ handleChange }
            className={ style.formulario__label__input }
          />
        </label>
        <button
          type="submit"
          className={ style.formulario__button }
          disabled={ validation }
        >
          Entrar
        </button>
      </form>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (userInfo) => dispatch(updateUser(userInfo)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  updateUserInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
