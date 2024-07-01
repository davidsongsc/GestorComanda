import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';

const initialState = {
  socket: null,
  isConnected: false,
  recovered: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    initializeSocket: (state, action) => {
      // Inicializa o socket aqui, se necessário
      state.socket = io(action.payload);
      state.isConnected = true; // Marca como conectado assim que inicializa
    },
    connectSocket: (state) => {
      // Conecta o socket
      if (state.socket) {
        state.socket.connect();
        state.isConnected = true;
      }
    },
    disconnectSocket: (state) => {
      // Desconecta o socket e limpa a referência
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
        state.isConnected = false;
      }
    },
    setRecovered: (state, action) => {
      state.recovered = action.payload;
    },
  },
});

export const { initializeSocket, connectSocket, disconnectSocket, setRecovered } = socketSlice.actions;

export default socketSlice.reducer;
