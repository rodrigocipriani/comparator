import uuid from 'uuid/v1';
import { appActionTypes } from './appActions';

const initialState = {
  errors: []
};

export default (state = initialState, action) => {
  if (action.error) {
    const error = {
      id: uuid(),
      error: action.error
    };
    return {
      ...state,
      errors: [...state.errors, error]
    };
  }
  switch (action.type) {
    case appActionTypes.CLOSE_ERROR:
      return {
        ...state,
        errors: state.errors.filter(error => action.payload !== error.id)
      };

    default:
      return state;
  }
};
