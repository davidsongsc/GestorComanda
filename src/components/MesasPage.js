import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Mesa from './Mesa';
import axios from 'axios';
import Comanda from './Comanda';
import './estilo.css';
import useSocket from './Socket';

const MesasPage = () => {
    const navigation = useNavigate();
    const [mesas, setMesas] = useState([...Array(66)].map((_, index) => ({ mesa: index + 1, ocupada: false, status: '0', aberta: false, conta: null })));
    const [senha, setSenha] = useState('');
    const [mesaSelecionada, setMesaSelecionada] = useState(null);
    const [messages, setMessages] = useState([]);
    const [erroSenha, setErroSenha] = useState(false);
    const [dataFormatada, setDataFormatada] = useState('');
    const [comandas, setComandas] = useState([]);
    const [comanda, setComanda] = useState();
    const [comandasAbertas, setComandasAbertas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const socket = useSocket('https://dagesico.pythonanywhere.com:8000');
    const nome = 'maquina'
    const token = 'abc123'

    
    const fazerPedido = () => { };

    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };

    const handleOkClick = () => {
        // Verificar se a senha está correta e permitir acesso à mesa correspondente
        if (senha === '1234') {
            setMesaSelecionada(parseInt(senha.charAt(0))); // seleciona a mesa correspondente
            setSenha(''); // limpa o campo de senha
            setErroSenha(false); // esconde a mensagem de erro, se estiver sendo exibida

        } else {
            setErroSenha(true); // exibe mensagem de erro
        }
    };

    const handleCancelarClick = () => {
        setSenha('');
    };
    const handleStatusMesaClick = (idMesa) => {
        const statusMesas = mesas.find((mesa) => mesa.mesa === idMesa);
    }
    const handleMesaClick = (idMesa) => {
        const mesa = mesas.find((mesa) => mesa.mesa === idMesa);

        if (mesa.ocupada) {
            handleClick(idMesa);
            // Abrir comanda
            setMesas((prevState) =>
                prevState.map((prevMesa) =>
                    prevMesa.mesa === idMesa ? { ...prevMesa, aberta: true, status: 2 } : prevMesa
                )
            );

        } else {
            handleStatusMesaClick(idMesa);
        }
    };
    const handleClick = (mesaId) => {
        navigation(`/mesa/${mesaId}/comanda`);
    }

    useEffect(() => {
        // Carrega as comandas abertas nas mesas
        setIsLoading(true);
        axios.get(`https://dagesico.pythonanywhere.com/comandas?nome=${nome}&token=${token}&version=100a`)
            .then(response => {
                setComandas(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        // Atualiza o estado das mesas
        setMesas((prevState) =>
            prevState.map((prevMesa) => {
                const comanda = comandas.find((comanda) => comanda.mesa === prevMesa.mesa);
                return comanda ? { ...prevMesa, ocupada: true, aberta: true, conta: comanda } : prevMesa;
            })
        );
    }, [comandas]);

    return (
        <div className='comandeira-comanda'>
            
            <div className="mesas-page">
                <div className="mesas-list">

                    <ul className='area-mesas'>
                        {mesas.map((mesa) => (
                            <div key={mesa.mesa} className={`butaoMenuMesa - hmenu - princopa`} onClick={() => handleMesaClick(mesa.mesa)}><Mesa key={mesa.mesa} mesa={mesa} comandas={comandas} fazerPedido={fazerPedido} sSetMesas={setMesas} /></div>
                        ))}

                    </ul>
                </div>
            </div>
            <div className="senha-area">
                <h2>Mesas: {comandas.length} | Ocupadas:  | Conta: </h2>
                <h2>Área do Garçom</h2>
                <input type="password" placeholder="Digite a senha" value={senha} onChange={handleSenhaChange} />
                {erroSenha && <p className="senha-erro">Senha incorreta. Tente novamente.</p>}
                {mesaSelecionada !== null && (
                    <div className="comanda-area">
                        <Comanda mesas={comanda} />
                    </div>
                )}
                <div className='digitos'>
                    <div className='g1'>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                    </div>
                    <div className='g1'>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                    </div>
                    <div className='g1'>
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                    </div>
                    <div className='g1'>
                        <button>OK</button>
                        <button>0</button>
                        <button >C</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MesasPage;