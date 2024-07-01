// notificationActions.js

import { setNotification } from './notificationSlice'; // Importe sua action setNotification

// Exemplo de ação que faz uma chamada assíncrona (simulada)
export const fetchNotifications = () => {
  return async (dispatch) => {
    try {
      // Simulação de uma chamada assíncrona (por exemplo, uma requisição fetch)
      const response = await fetch('https://api.example.com/notifications');
      const data = await response.json();

      // Disparar a ação setNotification com os dados recebidos
      dispatch(setNotification(data));
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      // Lidar com erros, se necessário
    }
  };
};
