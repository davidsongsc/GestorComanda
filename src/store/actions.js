import { createAsyncThunk } from '@reduxjs/toolkit';
import { CLEAR_SENHA, SET_SENHA, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, UPDATE_LISTA_USUARIOS } from './actionTypes';

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

  socket.once('autenticacao', (data) => {
    if (data.success) {
      dispatch(loginSuccess(data));
      console.log(data);
      localStorage.setItem('usuario', JSON.stringify(data));
    } else {
      dispatch(loginFailure('Falha na autenticação do usuário'));
    }
  });
};




export const updateListaUsuarios = (usuarios) => ({
    type: UPDATE_LISTA_USUARIOS,
    payload: usuarios, // Deve ser uma lista de strings ou objetos serializáveis
});


export const carregarRestricoes = createAsyncThunk(
  'user/carregarRestricoes',
  async () => {
      try {
          const response = await fetch('/restricoes.json');
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const restricoes = await response.json();
          return restricoes;
      } catch (error) {
          throw new Error('Erro ao carregar restrições');
      }
  }
);