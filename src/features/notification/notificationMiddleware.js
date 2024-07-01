// src/middleware/notificationMiddleware.js
const notificationMiddleware = store => next => action => {
    if (action.type === 'notification/setNotification') {
      const id = new Date().getTime(); // Gerar um ID único baseado no tempo
  
      setTimeout(() => {
        store.dispatch({ type: 'notification/removeNotification', payload: id });
      }, 5000);
  
      return next({
        ...action,
        payload: {
          ...action.payload,
          id
        }
      });
    }
  
    return next(action);
  };
  
  export default notificationMiddleware;
  