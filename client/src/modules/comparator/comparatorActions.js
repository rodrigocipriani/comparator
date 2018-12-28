import { appApi } from "../../shared/api";

export const comparatorActionTypes = {
  LOAD_ITEMS: "LOAD_ITEMS"
};

export const loadItems = () => async (
  dispatch,
  getState,
  api
) => {
  return dispatch({
    type: comparatorActionTypes.LOAD_ITEMS,
    promise: appApi.get(`api/v1/item/listall`)
  });
};
