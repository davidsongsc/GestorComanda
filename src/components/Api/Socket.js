import io from 'socket.io-client';

function Socket() {
  const socket = io('https://dagesico.pythonanywhere.com:8010');
  return socket;
}

export default Socket;