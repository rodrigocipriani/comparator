import { combineReducers } from "redux";
import comparatorReducer from "../modules/Comparator/comparatorReducer";
import appReducer from '../modules/App/appReducer';
import authReducer from '../modules/Auth/authReducer';

export default combineReducers({
  // homeReducer: persistentReducer(homeReducer, "homeReducer")
  comparatorReducer,
  authReducer,
  appReducer
});
