import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { carregarRestricoes, setUser } from './userSlice';
import { useSelector } from 'react-redux';
import { setNotification } from '../notification/notificationSlice';
import { disconnectSocket, initializeSocket, connectSocket } from '../cservidor/conexaoSlice';
import connectarServidor from '../../components/Api/loglogin';


const UserLogin = () => {
  const dispatch = useDispatch();
  const [senha, setSenha] = useState('');
  const user = useSelector(state => state.user);
  const socket = useSelector(state => state.socket.socket); // Ajuste conforme sua estrutura Redux
  useEffect(() => {
    // Inicializa o socket quando o componente monta
    dispatch(initializeSocket(connectarServidor)); // Ajuste para sua URL de servidor


    return () => {
      // Desconecta o socket quando o componente desmonta
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  const handleNotification = (message) => {
    dispatch(setNotification({ text: message }));
  };

  const handleLoginSistema = (userData) => {
    console.log('Login realizado:', userData);

    dispatch(setUser(userData));

  };

  const handleClickMostrar = () => {
    console.log('Mostrar painel');
  };

  const handleButtonClick = (event) => {
    const value = event.target.value;
    if (value === 'C') {
      setSenha('');
    } else if (value === 'OK') {
      setSenha('');
      enviarDadosUsuario();
    } else {
      setSenha(senha + value);
    }
  };

  const enviarDadosUsuario = () => {

    if (socket) { // Verifica se socket está disponível e conectado

      socket.emit('usuariodlogin', socket.id, { senha });

      socket.on('autenticacao', (data) => {
        if (data.success) {
          handleNotification(`Entrou como: ${data.usuario}`);
          const userData = {
            usuario: data.usuario,
            nivel: data.nivel,
            posto: data.auth,
            auth: true,
            restricoes: JSON.parse(data.restricoes),

          };
          if (userData.restricoes.loginSistema) {
            //handleNotification('Usuário autorizado a fazer login');
            dispatch(setUser(userData));
            handleLoginSistema(userData);
            localStorage.setItem('usuario', JSON.stringify(userData));
            handleClickMostrar();
            setSenha('');
          } else {
            handleNotification('Usuário não autorizado a fazer login');
          }

        } else {
          handleNotification('Falha na autenticação do usuário');
        }
      });
    } else {
      handleNotification('Falha: servidor não disponível ou desconectado.');
      if (socket) {
        console.log(socket);
      } else {
        console.error('Socket não está disponível para reconectar.');
      }
    }
  };




  return (
    <div>
      <div className='g1'>
        <input
          type="password"
          placeholder="Senha"
          value={senha || ''}
          disabled={user.auth === null ? false : true} />
      </div>

      <div className='g1'>
        <button onClick={handleButtonClick} value="1">1</button>
        <button onClick={handleButtonClick} value="2">2</button>
        <button onClick={handleButtonClick} value="3">3</button>
      </div>
      <div className='g1'>
        <button onClick={handleButtonClick} value="4">4</button>
        <button onClick={handleButtonClick} value="5">5</button>
        <button onClick={handleButtonClick} value="6">6</button>
      </div>
      <div className='g1'>
        <button onClick={handleButtonClick} value="7">7</button>
        <button onClick={handleButtonClick} value="8">8</button>
        <button onClick={handleButtonClick} value="9">9</button>
      </div>
      <div className='g1'>
        <button onClick={handleButtonClick} value="OK">OK</button>
        <button onClick={handleButtonClick} value="0">0</button>
        <button onClick={handleButtonClick} value="C">🗑️</button>
      </div>
    </div>
  );
};

export default UserLogin;
