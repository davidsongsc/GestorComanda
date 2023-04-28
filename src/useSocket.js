import { useEffect, useState } from "react";
import io from "socket.io-client";

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url, {
      path: '/mesas'
    });

    setSocket(socketIo);

    // Encerra a conexão quando o componente é desmontado
    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  return socket;
};

export default useSocket;
