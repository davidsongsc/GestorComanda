// Exemplo de redutor
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usuarios: []
};

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    updateListaUsuarios(state, action) {
      // Certifique-se de que 'action.payload' seja serializável
      state.usuarios = action.payload;
    },
    // Outros reducers...
  },
});

export const { updateListaUsuarios } = usuariosSlice.actions;
export default usuariosSlice.reducer;
