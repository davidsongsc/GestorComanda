import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';

const Notification = ({ notification }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationGroups, setNotificationGroups] = useState([]);
  const [showNotificationList, setShowNotificationList] = useState(false);
  const [maxvh, setMaxVh] = useState('');

  const notificationContainerRef = useRef(null);

  useEffect(() => {
    if (notification) {
      const timestamp = new Date().toLocaleString();
      const newNotification = { text: notification, timestamp };
      setNotificationGroups(prevGroups => {
        const lastGroup = prevGroups[prevGroups.length - 1];
        if (lastGroup && lastGroup.length < 3) {
          return [...prevGroups.slice(0, -1), [...lastGroup, newNotification]];
        } else {
          return [...prevGroups, [newNotification]];
        }
      });

      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 4200);
    }
  }, [notification]);

  const handleIconClick = () => {
    setShowNotificationList(!showNotificationList);
    setShowNotification(!showNotification);
  };

  useEffect(() => {
    if (showNotificationList) {
      setMaxVh('ntconter-dritive');
    }
    else{
      setMaxVh('');
    }
  }, [showNotificationList]);

  return (
    <div>
      {/* showNotification */}

      <div className={`notification-container ${showNotification ? 'ntconter-activate' : ''} ${maxvh}`}  ref={notificationContainerRef} onClick={handleIconClick}>
        {notificationGroups.slice().reverse().map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.reverse().map((notification, index) => (
              <div className="notification-group" >
                <div className="notification-item" key={index}>
                  <p className="notification-text">{notification.text}</p>
                  <p className="notification-text">{notification.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="notification-icon" onClick={handleIconClick}>
        <FaBell size={30} color={'gray'} />
      </div>

      
    </div>

  );
};

export default Notification;
