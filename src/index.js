import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './index.css';
import { SocketProvider } from './features/cservidor/SocketProvedor';
import connectarServidor from './components/Api/loglogin';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <SocketProvider url={connectarServidor}>
      <App />
    </SocketProvider>
  </Provider>
);
