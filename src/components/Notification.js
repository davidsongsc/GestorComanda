import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';

const Notification = ({ notification }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [showNotificationList, setShowNotificationList] = useState(false);

  useEffect(() => {
    if (notification) {
      const timestamp = new Date().toLocaleString();
      const newNotification = { text: notification, timestamp };
      setNotificationHistory(prevHistory => [...prevHistory, newNotification]);

      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  }, [notification]);

  const handleIconClick = () => {
    setShowNotificationList(!showNotificationList);
  };

  return (
    <div>
      {showNotification && (
        <div className="notification-container" onClick={handleIconClick}>
          <p className="notification-text">{notification}</p>
        </div>
      )}
      <div className="notification-icon" onClick={handleIconClick}>
        <FaBell size={30} color={'gray'} />
      </div>

      {showNotificationList && (
        <div className="notification-list-container" onClick={handleIconClick}>

          <table className="notification-list">
            <thead>
              <tr style={{ color: 'white' }}>
                <th>Notificação</th>
                <th>DataHora</th>
              </tr>
            </thead>
            <tbody className='container-notifiation'>
              {notificationHistory.slice().reverse().map((notification, index) => (
                <tr style={{ background: 'white', textTransform: 'capitalize' }} key={index}>
                  <td>{notification.text}</td>
                  <td>{notification.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Notification;
