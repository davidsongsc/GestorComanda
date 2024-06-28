import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSenha, setSenha, enviarDadosUsuario } from '../store/actions';
import socket from '../socket'; // Importe o socket conforme sua configuração

function SenhaComponent({ handleNotification, handleLoginSistema, handleClickMostrar, setIsAuthenticated }) {
    const { senha, loading, error, usuario } = useSelector(state => state.senha);
    const dispatch = useDispatch();

    const handleButtonClick = (event) => {
        const value = event.target.value;
        if (value === 'C') {
            dispatch(clearSenha());
        } else if (value === 'OK') {
            dispatch(enviarDadosUsuario(socket, senha));
        } else {
            dispatch(setSenha(value));
        }
    };

    useEffect(() => {
        if (usuario) {
            handleNotification(`Entrou como: ${usuario.usuario}`);
            handleLoginSistema(usuario);
            handleClickMostrar();
            setIsAuthenticated(true);
        }
        if (error) {
            handleNotification(error);
        }
    }, [usuario, error, handleNotification, handleLoginSistema, handleClickMostrar, setIsAuthenticated]);

    return (
        <div>
            <input type="text" value={senha} readOnly />
            {loading && <p>Autenticando...</p>}
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
                <button onClick={handleButtonClick} value="C">C</button>

            </div>
        </div>
    );
}

export default SenhaComponent;
