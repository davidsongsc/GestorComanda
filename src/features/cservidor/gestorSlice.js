// src/features/gestor/gestorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showGestor: false,
};

const gestorSlice = createSlice({
  name: 'gestor',
  initialState,
  reducers: {
    mostrarGestor(state) {
      state.showGestor = !state.showGestor; // Alterna o valor de showGestor
    },
  },
});

export const { mostrarGestor } = gestorSlice.actions;
export default gestorSlice.reducer;
