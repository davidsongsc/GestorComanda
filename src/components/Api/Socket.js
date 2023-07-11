import io from 'socket.io-client';

function Socket() {
  const socket = io('http://192.168.0.50:8010');
  return socket;
}

export default Socket;