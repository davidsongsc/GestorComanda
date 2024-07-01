// reducers/atendentesReducer.js
import { UPDATE_LISTA_USUARIOS } from './actionTypes'

const initialState = {
    listaUsuarios: [], // Inicialmente vazio, uma lista de strings ou IDs
    // outros estados iniciais
};

const atendentesReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LISTA_USUARIOS:
            return {
                ...state,
                listaUsuarios: action.payload, // Certifique-se de que payload é uma lista serializável
            };
        // outros cases
        default:
            return state;
    }
};

export default atendentesReducer;
