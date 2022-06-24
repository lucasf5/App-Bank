import { v4 as uuidv4 } from 'uuid';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case 'GET_CURRENCIES':
    return {
      ...state,
      currencies: Object.keys(action.payload.currencies).filter(
        (customer) => customer !== 'USDT',
      ),
    };
  case 'CREATE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, {
        id: uuidv4(),
        ...action.payload.expense,
      }],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id,
      ),
    };
  case 'UPDATE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return {
            ...expense,
            ...action.payload.expense,
          };
        }
        return expense;
      }),
    };
  default:
    return state;
  }
}
