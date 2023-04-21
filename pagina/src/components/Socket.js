import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const useSocket = (url, options = {}) => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(url, options);

    return () => {
      socketRef.current.disconnect();
    };
  }, [url, options]);

  return socketRef.current;
};

export default useSocket;
