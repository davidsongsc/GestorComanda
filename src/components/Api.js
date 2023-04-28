import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function Api() {
    const [comandasAbertas, setComandasAbertas] = useState([]);

    useEffect(() => {
        // Conecta ao servidor Socket.IO
        const socket = io('http://192.168.0.50:5000');
        //const socket = io('https://dagesico.pythonanywhere.com');

        // Escuta as atualizações
        socket.on('comandas atualizadas', (data) => {
            setComandasAbertas(data);
        });

        // Desconecta do servidor quando o componente é desmontado
        return () => {
            socket.disconnect();
        };
    }, []);

    return JSON.stringify(comandasAbertas);
}

export default Api;
