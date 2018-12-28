import { comparatorActionTypes } from "./comparatorActions";

const initialState = {
  items: [],
  loadings: {
    items: false
  }
};

export default (state = initialState, action) => {
  // catch all errors
  if (action.error) {
    return state;
  }
  switch (action.type) {
    case comparatorActionTypes.LOAD_ITEMS:
      if (!action.ready) {
        return {
          ...state,
          loadings: { ...state.loadings, items: true }
        };
      }
      const items = action.payload.data.items;
      return {
        ...state,
        items,
        loadings: { ...state.loadings, items: false }
      };

    default:
      return state;
  }
};
