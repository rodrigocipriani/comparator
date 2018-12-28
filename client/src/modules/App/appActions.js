export const appActionTypes = {
  CLOSE_ERROR: 'CLOSE_ERROR'
};

export const closeError = errorId => async (dispatch, getState, api) => {
  return dispatch({
    type: appActionTypes.CLOSE_ERROR,
    payload: errorId
  });
};
