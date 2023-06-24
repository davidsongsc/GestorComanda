import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MesasPage from './components/MesasPage';
import Notification from './components/Notification';
import React, { useState, useEffect } from 'react';
import Gestor from './components/Gestor';
import Venda from './components/Venda';
import io from 'socket.io-client';
import CadastroColaborador from './components/CadastroColaborador';
import CadastroProduto from './components/CadastroProduto';
import CadastroCliente from './components/CadastroCliente';
import CadastroFichaTecnica from './components/CadastroFichaTecnica';
import CadastroPromocao from './components/CadastroPromocao';

const socket = io('http://192.168.0.50:8000');

const App = () => {
  const [notification, setNotification] = useState('');
  const [atendente, setAtendente] = useState({ "usuario": null, "nivel": null, "auth": '0' });

  const handleLoginSistema = (usuario) => {
    setAtendente(usuario)
  }
  const handleNotification = (text) => {
    setNotification(text);
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor');
      handleNotification('Conectado ao Servidor!');
    });
  }, []);

  return (
    <BrowserRouter>
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<MesasPage setNotification={handleNotification} handlelogin={handleLoginSistema} socket={socket}  />} />
        <Route path="/gestor" element={<Gestor socket={socket} setNotification={handleNotification} atendente={atendente} />} />
        <Route path="/venda" element={<Venda socket={socket} setNotification={handleNotification} atendente={atendente} />} />
        <Route path="/cadastrocolaborador" element={<CadastroColaborador socket={socket} setNotification={handleNotification} atendente={atendente} />} />
        <Route path="/cadastroProdutos" element={<CadastroProduto socket={socket} setNotification={handleNotification} atendente={atendente} />} />
        <Route path="/cadastroclientes" element={<CadastroCliente socket={socket} setNotification={handleNotification} atendente={atendente} />} />
        <Route path="/cadastroficha" element={<CadastroFichaTecnica socket={socket} setNotification={handleNotification} atendente={atendente} />} />
        <Route path="/cadastropromo" element={<CadastroPromocao socket={socket} setNotification={handleNotification} atendente={atendente} />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
