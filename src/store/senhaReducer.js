import { CLEAR_SENHA, SET_SENHA, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';

const initialState = {
  senha: '',
  loading: false,
  error: null,
  usuario: null,
};

const senhaReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_SENHA:
      return { ...state, senha: '' };
    case SET_SENHA:
      return { ...state, senha: state.senha + action.payload };
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        usuario: action.payload,
        senha: '',
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default senhaReducer;
