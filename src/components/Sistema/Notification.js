import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';

const Notification = ({ notification, atendente }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationGroups, setNotificationGroups] = useState([]);
  const [showNotificationList, setShowNotificationList] = useState(false);
  const [maxvh, setMaxVh] = useState('');
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const timeNotificacao = 4500;
  const notificationContainerRef = useRef(null);

  useEffect(() => {
    if (notification) {
      const timestamp = new Date().toLocaleString();
      const id = new Date().getTime(); // Gerar um ID único baseado no tempo
      const newNotification = { id, text: notification, timestamp };

      setNotificationGroups(prevGroups => {
        const lastGroup = prevGroups[prevGroups.length - 1];
        if (lastGroup && lastGroup.length < 3) {
          return [...prevGroups.slice(0, -1), [...lastGroup, newNotification]];
        } else {
          return [...prevGroups, [newNotification]];
        }
      });

      setShowNotification(true);
      setHasNewNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, timeNotificacao);
    }
  }, [notification]);

  useEffect(() => {
    scrollToBottom();
  }, [notificationGroups]);

  const handleIconClick = () => {
    if (atendente.usuario) {
      if (
        (atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))) ||
        (atendente.auth.startsWith('j') && /^\d+$/.test(atendente.auth.slice(1))) ||
        (atendente.nivel > 1)
      ) {
        setShowNotificationList(!showNotificationList);
        setShowNotification(!showNotification);
        setHasNewNotification(false);
      }
    }
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (notificationContainerRef.current) {
      const container = notificationContainerRef.current;
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  };

  useEffect(() => {
    if (showNotificationList) {
      setMaxVh('ntconter-dritive');
    } else {
      setMaxVh('');
    }
  }, [showNotificationList]);

  return (
    <div>
      <div
        className={`notification-container ${showNotification ? 'ntconter-activate' : 'ntconter-deactivate'} ${maxvh}`}
        ref={notificationContainerRef}
        style={{ overflowY: 'auto', maxHeight: '60px' }}
        onClick={handleIconClick}
      >
        {notificationGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.map((notification, index) => (
              <div className="notification-group" key={`${notification.id}`}>
                <div className="notification-item">
                  <p className="notification-text">{notification.text}</p>
                  <p className="notification-text-datahora">{notification.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{ display: atendente.usuario != null ? 'flex' : 'none' }}
        className={`notification-icon ${hasNewNotification ? 'nova-notification' : ''}`}
        onClick={handleIconClick}
      >
        <FaBell size={30} color={'gray'} />
      </div>
    </div>
  );
};

export default Notification;
