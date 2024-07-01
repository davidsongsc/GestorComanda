import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateListaUsuarios } from '../../store/actions';
import { setNotification } from '../notification/notificationSlice';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const ComandaProvider = ({ socket, children }) => {
    const [comandas, setComandas] = useState([]);
    const [mesas, setMesas] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (socket) {
            const handleComandas = (data) => {
                const atendentes = [];
                setComandas(data);
                setMesas((prevState) =>
                    prevState.map((prevMesa) => {
                        if (!atendentes.includes(prevMesa.atendente) && prevMesa.atendente != null) {
                            atendentes.push(prevMesa.atendente);
                        }
                        const comanda = data.find((comanda) => comanda.mesa === prevMesa.mesa);
                        return comanda
                            ? {
                                ...prevMesa,
                                atendente: comanda.atendente,
                                ocupada: true,
                                aberta: true,
                                conta: comanda,
                                status: comanda.status,
                                operacao: comanda.operacao,
                                cliente: null,
                            }
                            : prevMesa;
                    })
                );
                dispatch(updateListaUsuarios(atendentes));
                dispatch(setNotification('Conectado ao Provedor Comandas...'));
            };

            // Adicione o listener
            socket.on('comandas', handleComandas);

            // Limpe o listener ao desmontar ou atualizar o socket
            return () => {
                socket.off('comandas', handleComandas);
            };
        }
    }, [socket, dispatch]);

    return (
        <SocketContext.Provider value={{ comandas, mesas }}>
            {children}
        </SocketContext.Provider>
    );
};

export default ComandaProvider;
