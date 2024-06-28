import React from 'react';
import {
  isAndroid,
  isIOS,
  isWindows,
  isMacOs,
  isMobile,
  isTablet,
  isDesktop,
  getUA
} from 'react-device-detect';

const DeviceInfo = () => {
  const userAgent = getUA();
  let deviceName = 'Desconhecido!';

  if (isAndroid) {
    deviceName = 'Android Device';
  } else if (isIOS) {
    deviceName = 'iOS Device';
  } else if (isWindows) {
    deviceName = 'Windows PC';
  } else if (isMacOs) {
    deviceName = 'Mac OS Device';
  } else if (isMobile) {
    deviceName = 'Mobile Device';
  } else if (isTablet) {
    deviceName = 'Tablet Device';
  } else if (isDesktop) {
    deviceName = 'Desktop';
  }

  return (
    <div>
      <h2>Informações Dispositivo</h2>
      <p>Usuario: {userAgent}</p>
      <p>Dispositivo: {deviceName}</p>
    </div>
  );
};

export default DeviceInfo;
