import React, { useEffect } from 'react';
import { useSocket } from './Hooks';

const SocketTest = () => {
    const { socket } = useSocket('ws://192.168.0.50:8000/ws/myapp/');

    useEffect(() => {
        // registra um evento para receber dados do servidor
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
        };

        // retorna uma função de cleanup para desconectar o socket quando o componente é desmontado
        return () => {
            socket.close();
        };
    }, [socket]);

    return <div>Teste de conexão com socket</div>;
};

export default SocketTest;
