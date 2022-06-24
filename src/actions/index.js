import fetchCurrencies from '../services';

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const CREATE_EXPENSE = 'CREATE_EXPENSE';

export function updateUserInfo(email) {
  return {
    type: UPDATE_USER_INFO,
    payload: {
      email,
    },
  };
}

export const isFetching = () => ({
  type: 'IS_FETCHING',
});

export const getCurrencies = (value) => ({
  type: 'GET_CURRENCIES',
  payload: {
    currencies: value,
  },
});

export const setExpanse = (expense) => ({
  type: 'CREATE_EXPENSE',
  payload: {
    expense,
  },
});

export const deleteExpanse = (id) => ({
  type: 'DELETE_EXPENSE',
  payload: {
    id,
  },
});

export const updateExpanse = (id, expense) => ({
  type: 'UPDATE_EXPENSE',
  payload: {
    id,
    expense,
  },
});

export const buscaCurrencies = () => (dispatch) => fetchCurrencies()
  .then((response) => {
    dispatch(getCurrencies(response));
  })
  .catch((error) => {
    console.log(error);
  });
