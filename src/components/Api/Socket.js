import io from 'socket.io-client';

function Socket() {
  const socket = io('http://192.168.1.50:8010');
  return socket;
}

export default Socket;