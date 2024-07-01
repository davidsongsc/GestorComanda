// src/components/Sistema/Notification.js
import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification, removeNotification } from '../../features/notification/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch();

  // Adicione valores padrão para evitar problemas com `undefined`
  const notificationGroups = useSelector(state => state.notification?.notificationGroups || []);
  const hasNewNotification = useSelector(state => state.notification?.hasNewNotification || false);
  const user = useSelector(state => state.user || {});

  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationList, setShowNotificationList] = useState(false);
  const [maxvh, setMaxVh] = useState('');
  const notificationContainerRef = useRef(null);

  useEffect(() => {
    if (notificationGroups.length > 0) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 4500); // timeNotificacao
    }
  }, [notificationGroups]);

  useEffect(() => {
    scrollToBottom();
  }, [notificationGroups]);

  const handleIconClick = () => {
    if (user.usuario) {
      if (
        (user.posto.startsWith('g') && /^\d+$/.test(user.posto.slice(1))) ||
        (user.posto.startsWith('j') && /^\d+$/.test(user.posto.slice(1))) ||
        (user.nivel > 1)
      ) {
        setShowNotificationList(!showNotificationList);
        setShowNotification(!showNotification);
        dispatch(removeNotification());
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
        {notificationGroups.map((group) => (
          <div key={`group-${group.id}`}>
            {group.map((notification) => (
              <div className="notification-group" key={`notification-${notification.id}`}>
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
        style={{ display: user.usuario != null ? 'flex' : 'none' }}
        className={`notification-icon ${hasNewNotification ? 'nova-notification' : ''}`}
        onClick={handleIconClick}
      >
        <FaBell size={30} color={'gray'} />
      </div>
    </div>
  );
};

export default Notification;
