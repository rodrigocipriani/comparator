
import Cookies from 'js-cookie';
import { userApi } from '../../shared/api';

export const authActionTypes = {
  LOGIN: "LOGIN",
  REDIRECT_TO_LOGIN: "REDIRECT_TO_LOGIN",
  LOGOUT: "LOGOUT",
};

export const login = () => async (dispatch, getState, api) => {

  userApi.get(`/v1/usuario/proprio`).then(user => {
    if (!user) {
      return dispatch({
        type: authActionTypes.REDIRECT_TO_LOGIN
      });
    }
    return dispatch({
      type: authActionTypes.LOGIN,
      payload: user,
      ready: true
    });
  }).catch(error => {
    return dispatch({
      type: authActionTypes.REDIRECT_TO_LOGIN
    });
  });
};

export const logout = () => async (dispatch, getState, api) => {
  return dispatch({
    type: authActionTypes.LOGOUT,
    promise: userApi.get(`/v1/usuario/sair`)
  });
};

export const authCheckState = () => async (dispatch, getState, api) => {

  // e este token está salvo para *(.bb.com.br)
  //Verifica se ja perdeu o token do BB e faz logout
  const token = Cookies.get('BBSSOToken');
  if (!token) {
    return dispatch(logout());
  }
};
