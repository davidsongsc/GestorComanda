import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import notificationReducer from '../features/notification/notificationSlice';
import notificationMiddleware from '../middleware/notificationMiddleware';
import localmesaReducer from '../features/localmesa/localmesaSlice';
import conexaoReducer from '../features/cservidor/conexaoSlice';
import gestorReducer from '../features/cservidor/gestorSlice';
import atendentesReducer from './atendentesReducer';

// Middleware personalizado para ignorar erros de não serialização específicos
const ignoreNonSerializableMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ['socket.socket'], // Coloque aqui o caminho para o campo não serializável
    },
  }).concat(notificationMiddleware);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    localmesa: localmesaReducer,
    socket: conexaoReducer,
    notification: notificationReducer,
    atendentes: atendentesReducer,
    mostrarGestor: gestorReducer,
  },
  middleware: (getDefaultMiddleware) => ignoreNonSerializableMiddleware(getDefaultMiddleware),
});

export default store;
