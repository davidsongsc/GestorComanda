// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Função assíncrona para carregar restrições
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

// Definição do slice de usuário
const userSlice = createSlice({
    name: 'user',
    initialState: {
        usuario: '',
        nivel: 0,
        posto: '',
        auth: false,
        restricoes: '',
        carregandoRestricoes: true,
        erroRestricoes: null
    },
    reducers: {
        setUser: (state, action) => {
            const { usuario, nivel, posto, auth, restricoes, carregandoRestricoes } = action.payload;
            state.usuario = usuario;
            state.nivel = nivel;
            state.posto = posto;
            state.auth = auth;
            state.restricoes = restricoes;
            state.carregandoRestricoes = carregandoRestricoes;
        },
        clearUser: (state) => {
            state.usuario = '';
            state.nivel = 0;
            state.posto = 'a0';
            state.auth = false;
            state.restricoes = null;
            state.carregandoRestricoes = false;
            state.erroRestricoes = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(carregarRestricoes.pending, (state) => {
                state.carregandoRestricoes = true;
                state.erroRestricoes = null;
            })
            .addCase(carregarRestricoes.fulfilled, (state, action) => {
                state.restricoes = action.payload;
                state.carregandoRestricoes = false;
                state.erroRestricoes = null;
            })
            .addCase(carregarRestricoes.rejected, (state, action) => {
                state.carregandoRestricoes = false;
                state.erroRestricoes = action.error.message || 'Erro ao carregar restrições';
            });
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
