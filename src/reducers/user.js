import { UPDATE_USER_INFO } from '../actions';

const initialState = {
  email: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case UPDATE_USER_INFO:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
}
