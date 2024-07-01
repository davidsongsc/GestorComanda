import React from 'react';
import { useSelector } from 'react-redux';

const NotificationReducer = () => {
  const notification = useSelector((state) => state.notification.notification);

  return (
    <div>
      <p>{notification}</p>
      {/* Aqui você pode estilizar ou exibir sua notificação como preferir */}
    </div>
  );
};

export default NotificationReducer;
