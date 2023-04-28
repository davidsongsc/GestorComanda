import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Relogio from './Relogio';
import io from 'socket.io-client';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineExclamationCircle } from 'react-icons/ai';

function ServerStatus() {
    const tamanhoIcon = 20;
    const corDesconectado = '#f2310d'
    const corConectado = '#089919'
    const corFalha = '#656565'
    const [siteStatus, setSiteStatus] = useState(<AiOutlineCloseCircle color="red" size={tamanhoIcon} />);
    const [socketStatus, setSocketStatus] = useState(<AiOutlineCloseCircle color="red" size={tamanhoIcon} />);
    const [cozinhaStatus, setCozinhaStatus] = useState(<AiOutlineCloseCircle color="red" size={tamanhoIcon} />);
    const [caixaStatus, setCaixaStatus] = useState(<AiOutlineCloseCircle color="red" size={tamanhoIcon} />);
    const [estoqueStatus, setEstoqueStatus] = useState(<AiOutlineCloseCircle color="red" size={tamanhoIcon} />);
    const [cardapioDigitalStatus, setCardapioDigitalStatus] = useState(<AiOutlineCloseCircle color="red" size={tamanhoIcon} />);
    const [serverTesteStatus, setServerTesteStatus] = useState(<AiOutlineCloseCircle color="red" size={tamanhoIcon} />);
    const [impressoraOpStatus, setImpressoraOpStatus] = useState(<AiOutlineCloseCircle color="red" size={tamanhoIcon} />);
    const [terminais, setTerminaisStatus] = useState(<AiOutlineCloseCircle color="red" size={tamanhoIcon} />);

    async function connectSocket() {
        return new Promise((resolve, reject) => {
            const socket = io('http://192.168.0.50:8000');
            socket.on('connect', () => {
                resolve(socket);
            });
            socket.on('connect_error', (error) => {
                reject(error);
            });
        });
    }

    async function connectPrinter() {
        return new Promise((resolve, reject) => {
            const printer = io('http://192.168.0.50:8100');
            printer.on('connect', () => {
                resolve(printer);
            });
            printer.on('connect_error', (error) => {
                reject(error);
            });
        });
    }

    async function connectEstoque() {
        return new Promise((resolve, reject) => {
            const estoque = io('http://192.168.0.50:8200');
            estoque.on('connect', () => {
                resolve(estoque);
            });
            estoque.on('connect_error', (error) => {
                reject(error);
            });
        });
    }

    async function connectTerminais() {
        return new Promise((resolve, reject) => {
            const terminais = io('http://192.168.0.50:8300');
            terminais.on('connect', () => {
                resolve(terminais);
            });
            terminais.on('connect_error', (error) => {
                reject(error);
            });
        });
    }
    async function connectCozinha() {
        return new Promise((resolve, reject) => {
            const cozinha = io('http://192.168.0.50:8400');
            cozinha.on('connect', () => {
                resolve(cozinha);
            });
            cozinha.on('connect_error', (error) => {
                reject(error);
            });
        });
    }
    async function checkServerStatus() {
        try {
            const siteResponse = await axios.get('http://192.168.0.50:5000');
            setSiteStatus(<AiOutlineCheckCircle color={corConectado} size={tamanhoIcon} />);
        } catch (error) {
            setSiteStatus(<AiOutlineExclamationCircle color={corDesconectado} size={tamanhoIcon} />);
        }
        try {
            const siteResponse = await axios.get('http://192.168.0.50:8080');
            setCardapioDigitalStatus(<AiOutlineCheckCircle color={corConectado} size={tamanhoIcon} />);
        } catch (error) {
            setCardapioDigitalStatus(<AiOutlineExclamationCircle color={corDesconectado} size={tamanhoIcon} />);
        }

        try {
            const siteResponse = await axios.get('http://192.168.0.50:3000');
            setServerTesteStatus(<AiOutlineCheckCircle color={corConectado} size={tamanhoIcon} />);
        } catch (error) {
            setServerTesteStatus(<AiOutlineExclamationCircle color={corDesconectado} size={tamanhoIcon} />);
        }

        try {
            const socket = await connectSocket();
            setSocketStatus(<AiOutlineCheckCircle color={corConectado} size={tamanhoIcon} />);
            socket.on('disconnect', () => {
                setSocketStatus(<AiOutlineCheckCircle color={corDesconectado} size={tamanhoIcon} />);
            });
        } catch (error) {
            setSocketStatus(<AiOutlineExclamationCircle color={corFalha} size={tamanhoIcon} />);
        }

        try {
            const printer = await connectPrinter();
            setImpressoraOpStatus(<AiOutlineCheckCircle color={corConectado} size={tamanhoIcon} />);
            printer.on('disconnect', () => {
                setImpressoraOpStatus(<AiOutlineCheckCircle color={corDesconectado} size={tamanhoIcon} />);
            });
        } catch (error) {
            setImpressoraOpStatus(<AiOutlineExclamationCircle color={corFalha} size={tamanhoIcon} />);
        }
        try {
            const estoque = await connectEstoque();
            setEstoqueStatus(<AiOutlineCheckCircle color={corConectado} size={tamanhoIcon} />);
            estoque.on('disconnect', () => {
                setEstoqueStatus(<AiOutlineCheckCircle color={corDesconectado} size={tamanhoIcon} />);
            });
        } catch (error) {
            setImpressoraOpStatus(<AiOutlineExclamationCircle color={corFalha} size={tamanhoIcon} />);
        }
        try {
            const terminais = await connectEstoque();
            setCaixaStatus(<AiOutlineCheckCircle color={corConectado} size={tamanhoIcon} />);
            terminais.on('disconnect', () => {
                setCaixaStatus(<AiOutlineCheckCircle color={corDesconectado} size={tamanhoIcon} />);
            });
        } catch (error) {
            setCaixaStatus(<AiOutlineExclamationCircle color={corFalha} size={tamanhoIcon} />);
        }
        try {
            const cozinha = await connectEstoque();
            setCozinhaStatus(<AiOutlineCheckCircle color={corConectado} size={tamanhoIcon} />);
            cozinha.on('disconnect', () => {
                setCozinhaStatus(<AiOutlineCheckCircle color={corDesconectado} size={tamanhoIcon} />);
            });
        } catch (error) {
            setImpressoraOpStatus(<AiOutlineExclamationCircle color={corFalha} size={tamanhoIcon} />);
        }
    }

    useEffect(() => {
        checkServerStatus();
    }, []);




    return (
        <div>
            <table className='server-status-table'>
                <thead>
                    <tr>
                        <th>Hora</th>
                        <th><Relogio /></th>
                    </tr>
                    <tr>
                        <th>Serviço</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Servidor</td>
                        <td>{socketStatus}</td>
                    </tr>
                    <tr>
                        <td>Impressoras</td>
                        <td>{impressoraOpStatus}</td>
                    </tr>
                    <tr>
                        <td>Delivery</td>
                        <td>{siteStatus}</td>
                    </tr>
                    <tr>
                        <td>Estoque</td>
                        <td>{estoqueStatus}</td>
                    </tr>
                    <tr>
                        <td>Terminais</td>
                        <td>{caixaStatus}</td>
                    </tr>
                    <tr>
                        <td>Cozinha</td>
                        <td>{cozinhaStatus}</td>
                    </tr>
                    <tr>
                        <td>Cardapio Digital</td>
                        <td>{cardapioDigitalStatus}</td>
                    </tr>
                    <tr>
                        <td>Modolo Testes</td>
                        <td>{serverTesteStatus}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ServerStatus;
