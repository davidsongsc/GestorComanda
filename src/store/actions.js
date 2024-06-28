import { CLEAR_SENHA, SET_SENHA, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';

// Ações simples
export const clearSenha = () => ({
  type: CLEAR_SENHA,
});

export const setSenha = (value) => ({
  type: SET_SENHA,
  payload: value,
});

// Ações de login assíncronas
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const enviarDadosUsuario = (socket, senha) => dispatch => {
  dispatch(loginRequest());
  socket.emit('usuariodlogin', socket.id, { senha });
  console.log({ senha });

  socket.on('autenticacao', (data) => {
    if (data.success) {
      dispatch(loginSuccess(data));
      // Salvar os dados do usuário no localStorage
      localStorage.setItem('usuario', JSON.stringify(data));
    } else {
      dispatch(loginFailure('Falha na autenticação do usuário'));
    }
  });
};
