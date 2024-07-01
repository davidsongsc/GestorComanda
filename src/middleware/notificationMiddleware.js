// src/middleware/notificationMiddleware.js
const notificationMiddleware = store => next => action => {
  if (action.type === 'notification/setNotification') {
    const id = new Date().getTime(); // Gerar um ID único baseado no tempo

    // Despachar para remover a notificação após 5 segundos
    setTimeout(() => {
      store.dispatch({ type: 'notification/removeNotification', payload: id });
    }, 5000);

    // Passar a ação adiante com o ID gerado
    return next({
      ...action,
      payload: {
        ...action.payload,
        id
      }
    });
  }

  return next(action); // Passar a ação adiante se não for uma notificação
};

export default notificationMiddleware;
