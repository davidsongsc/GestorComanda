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
    initializeSocket: {
      reducer(state, action) {
        state.socket = io(action.payload);
        state.isConnected = true;
      },
      prepare(url) {
        return { payload: url };
      }
    },
    connectSocket(state) {
      if (state.socket && !state.socket.connected) {
        state.socket.connect();
        state.isConnected = true;
      }
    },
    disconnectSocket(state) {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
        state.isConnected = false;
      }
    },
    setRecovered(state, action) {
      state.recovered = action.payload;
    },
  },
});

export const { initializeSocket, connectSocket, disconnectSocket, setRecovered } = socketSlice.actions;

export default socketSlice.reducer;
