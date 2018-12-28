import { authActionTypes } from "./authActions";
// import {USUARIOS} from '../shared/mock';

// //Busca um usuário forçado nas variáveis de ambiente
// const usuario = process.env.REACT_APP_USUARIO || null;
// console.log('usuario', usuario);

const initialState = {
  token: null,
  // user: usuario ? USUARIOS[usuario] : null,
  user: null,
  redirectToLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      if (!action.ready) {
        return {
          ...state
        };
      }
      const user = {
        ...action.payload.data, avatarImage: `https://humanograma.intranet.bb.com.br/avatar/${action.payload.data.chave.toUpperCase()}`
      };
      return {
        ...state,
        user
      };

    case authActionTypes.REDIRECT_TO_LOGIN:
      return {
        ...state,
        redirectToLogin: true
      };

    default:
      return state;
  }
};
