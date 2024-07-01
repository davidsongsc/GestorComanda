import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    localmesa: 'loja',
};

const localmesaSlice = createSlice({
    name: 'localmesa',
    initialState,
    reducers: {
        setLocalMesa: (state, action) => {
            state.localmesa = action.payload; // Atribui diretamente action.payload
        },
        limparLocalMesa: (state) => {
            state.localmesa = 'loja';
        },
    },
});

export const { setLocalMesa, limparLocalMesa } = localmesaSlice.actions;

export default localmesaSlice.reducer;
