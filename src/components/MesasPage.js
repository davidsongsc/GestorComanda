import React, { useState, useEffect } from 'react';
import { Modal/*, Button*/ } from 'react-bootstrap';

import Mesa from './Mesa';
import Comanda from './ComandaMesa';
import ComandaMesa from './CaixaComanda';
import './estilo.css';
import io from 'socket.io-client';
import AlertaPersonalizado from './AlertaPersonalizado';
import { AiOutlineUser } from 'react-icons/ai';
import { FaUtensils } from 'react-icons/fa';
import { BiUserPin } from 'react-icons/bi';
import ServerStatus from './ServerStatus';
const socket = io('http://192.168.0.50:8000');

// ALERTA DE ERRO USUARIO NÃO AUTENTICADO
const usuarioError = [{
    "titulo": "Login",
    "mensagem": "Você deve entrar primeiro.",
    "btn1": "login",
    "fnb1": "cmdlogar",
    "btn2": "o.k.",
    "fnb2": ""
},
{
    "titulo": "Mesa Livre",
    "mensagem": "Deseja iniciar a mesa?",
    "btn1": "Iniciar",
    "fnb1": "",
    "btn2": "Fechar",
    "fnb2": ""

},
{
    "titulo": "Erro! Login",
    "mensagem": "Você não é o responsavel da mesa!",
    "btn1": "Iniciar",
    "fnb1": "",
    "btn2": "Fechar",
    "fnb2": ""

},
{
    "titulo": "Erro! Login",
    "mensagem": "Atendimento em andamento!",
    "btn1": "OK",
    "fnb1": "",
    "btn2": "Fechar",
    "fnb2": ""

},
{
    "titulo": "Caixa",
    "mensagem": "O operador de Caixa esta recebendo a conta!",
    "btn1": "OK",
    "fnb1": "",
    "btn2": "ALERT",
    "fnb2": ""

}]


function funcao(codigo) {
    switch (codigo) {
        case 's1':
            return 'Limpeza [B,M,T,P,C]';
        case 's2':
            return 'Limpeza [M,T,P,C]';
        case 's3':
            return 'Limpeza [M,T,P]';
        case 's4':
            return 'Limpeza [T,P]';
        case 's5':
            return 'Limpeza [LIDER]';
        case 's6':
            return 'Limpeza [SUPERVISOR]';
        case 's7':
            return 'Limpeza [GERÊNCIA]';
        case 'm1':
            return 'Manutenção';
        case 'c1':
            return 'Cozinha [COPA]';
        case 'c2':
            return 'Cozinha [AUX.PREPARO]';
        case 'c3':
            return 'Cozinha [AUX.SOBREMESA]';
        case 'c4':
            return 'Cozinha [AUX.CHAPA]';
        case 'c5':
            return 'Cozinha [AUX.FORNO]';
        case 'c6':
            return 'Cozinha [AUX.GRELHA]';
        case 'c7':
            return 'Cozinha [AUX.LIDER]';
        case 'c8':
            return 'Cozinha [AUX.SUPERVISOR]';
        case 'c9':
            return 'Cozinha [AUX.GERÊNCIA]';
        case 'b1':
            return 'Clean';
        case 'b2':
            return 'Apoio';
        case 'b3':
            return 'Hostess ';
        case 'b4':
            return 'Delivery ';
        case 'b5':
            return 'Cummim';
        case 'b6':
            return 'Garçom';
        case 'b7':
            return 'Bartender';
        case 'b8':
            return 'Sommelier';
        case 'b9':
            return 'Trainee Manager';
        case 'a1':
            return 'aprendiz';
        case 'a2':
            return 'treinamento';
        case 'j3':
            return 'apoio operacional';
        case 'j4':
            return 'delivery';
        case 'j5':
            return 'Operador Caixa';
        case 'a5':
            return 'supervisor';
        case 'g1':
            return 'Assistente de Confiança';
        case 'g2':
            return 'Assistente de Supervisão';
        case 'g3':
            return 'Assistente de Gerência';
        case 'x1':
            return 'Supervisor de Compras';
        case 'x2':
            return 'Gerente de Compras';
        case 'x3':
            return 'Supervisor de Pagamentos';
        case 'x4':
            return 'Gerente de Pagamentos';
        case 'x5':
            return 'Supervisor de Recurso Humanos';
        case 'x6':
            return 'Gerente de Recursos Humanos';
        case 'x7':
            return 'Supervisor de T.I.';
        case 'x8':
            return 'Gerente de T.I.';
        case 'x9':
            return 'proprietario';
        case 'dev':
            return 'Dev Program'

        default:
            return '';
    }
}
const MesasPage = ({ setNotification }) => {
    const [showModalMesa, setShowModalMesa] = useState(false);
    const [senha, setSenha] = useState('');
    const [comandas, setComandas] = useState([]);
    const [mesas, setMesas] = useState([...Array(99)].map((_, index) => ({ mesa: index + 1, ocupada: false, status: 0, aberta: false, conta: null, atendente: null, nivel: 0 })));
    const [atendente, setAtendente] = useState({ "usuario": null, "nivel": null, "auth": '0' });
    const [mesaAberta, setMesaAberta] = useState(null);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [tipoAlertaId, setTipoAlertaId] = useState(0);
    const [areaActive, setActive] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [nivel, setNivel] = useState(1);
    const [caixaStatus, setCaixaStatus] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [mesaSelecionada, setMesaSelecionada] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [erroSenha, setErroSenha] = useState(false);
    let timeoutId;


    useEffect(() => {
        socket.on('connect', () => {
            console.log('Conectado ao servidor');
            handleNotification('Conectado ao Servidor!');
        });
    }, []);



    const handleNotification = (text) => {
        setNotification(text);
    };

    const enviarDadosUsuario = () => {
        socket.emit('dados_usuario', { senha });

        // Ouça o evento 'autenticacao' para receber a resposta do servidor
        socket.on('autenticacao', (data) => {
            if (data.success) {
                handleNotification(`Entrou como: ${data.usuario}`);
                setAtendente({ "usuario": data.usuario, "nivel": data.nivel, "auth": data.auth });
                handleClickMostrar();
                setSenha('');
                setIsAuthenticated(true);

            } else {
                handleNotification('Falha na autenticação do usuário');
                handleSairLogin();

            }
        })
    }

    const handleShowModalMesa = () => {
        setShowModalMesa(true);
    }
    const handleCloseModalMesa = () => {
        setShowModalMesa(false);
    }




    const fetchComandas = () => {
        socket.emit('get_comandas');
    };
    useEffect(() => {
        fetchComandas();

        /*
        // atualiza as comandas a cada 1 segundos
        const intervalId = setInterval(fetchComandas, 1000);

        return () => {
            clearInterval(intervalId);
        };
        */
    }, []);

    socket.on('comandas', (data) => {
        setComandas(data);
        console.log(data);
        setMesas((prevState) =>
            prevState.map((prevMesa) => {
                const comanda = comandas.find((comanda) => comanda.mesa === prevMesa.mesa);
                return comanda ? { ...prevMesa, atendente: comanda.operador, ocupada: true, aberta: true, conta: comanda, status: comanda.status } : prevMesa;
            })
        );

    });


    const handleFullscreen = () => {
        const element = document.documentElement; // Elemento raiz da página
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }

    };



    function handleFecharAlerta() {
        setMostrarAlerta(false);
    }

    function handleSairLogin() {
        handleCloseModalMesa();
        setCaixaStatus(false);
        clearTimeout(timeoutId);
        //handleNotification('Usuario Desconectado!');
        setAtendente({ "usuario": null });
        setIsAuthenticated(false);
        /*
        
        */



    }
    const handleClickMostrar = () => {
        if (areaActive === false) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    };
    const handleCaixaStatus = () => {
        if (atendente.nivel > 6 || atendente.auth === 'j5') {
            setCaixaStatus(true);
        }
        else {
            handleNotification('Acesso restrito, Usuario sem privilégios. Por favor, procure um gerente!');
            setCaixaStatus(false);
        }

    };

    const handleEmitStatus = (idMesa, op) => {

        const data = {
            id: idMesa,
            status: op,
        };

        socket.emit('modificar_status_comanda', data);
        handleClick(idMesa);
        // Abrir comanda
        setMesas((prevState) =>
            prevState.map((prevMesa) =>
                prevMesa.mesa === idMesa ? { ...prevMesa, aberta: true, status: 2 } : prevMesa
            )
        );

    };

    const handleGorjeta = (idMesa, valor) => {

        const data = {
            id: idMesa,
            gorjeta: valor,
        };

        socket.emit('modificar_gorjeta_comanda', data);
        

    };

    const handleDeletarComanda = (idMesa) => {

        const data = {
            id: idMesa,
            status: 6,
            atendente: atendente.usuario
        };

        socket.emit('deletar_status_comanda_nova', data);
        handleClick(idMesa);
        // Abrir comanda
        setMesas((prevState) =>
            prevState.map((prevMesa) =>
                prevMesa.mesa === idMesa ? { ...prevMesa, aberta: true, status: 2 } : prevMesa
            )
        );
        // window.location.reload();
    };

    const handleNovaComanda = (idMesa, op) => {

        const data = {
            id: idMesa,
            status: op,
            atendente: atendente.usuario
        };

        socket.emit('modificar_status_comanda_nova', data);
        handleClick(idMesa);
        // Abrir comanda
        setMesas((prevState) =>
            prevState.map((prevMesa) =>
                prevMesa.mesa === idMesa ? { ...prevMesa, aberta: true, status: 2 } : prevMesa
            )
        );

    };


    const handleMesaClick = (idMesa) => {
        const mesa = mesas.find((mesa) => mesa.mesa === idMesa);
        console.log(idMesa);
        console.log(mesa);
        if (mesa.conta) {
            if (atendente.usuario === null) {
                mudarTipoAlertaId(1);
                handleNotification('Usuario não encontrado!');
                setMostrarAlerta(true);
            }
            else if (!atendente.usuario) {
                mudarTipoAlertaId(1);
                handleNotification(mesa.atendente + ' ');
                setMostrarAlerta(true);
            }
            else if (mesa.status === 5 && atendente.auth === 'j5') {
                if (mesa.ocupada) {
                    handleEmitStatus(idMesa, 4);
                    handleNotification('Operação de Caixa: ' + mesa.mesa);
                }
            } else if (
                (mesa.status !== 1 && mesa.status !== 5 && mesa.status !== 4) ||
                atendente.auth === 'j5' && mesa.status === 5 ||
                atendente.auth === 'j5' && mesa.status === 4 ||
                (atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))
                )
            ) {
                mudarTipoAlertaId(2);

                handleEmitStatus(idMesa, 1);
                handleNotification(atendente.usuario+' Inicia a mesa ' + mesa.mesa);


            } else if (mesa.status === 1) {
                mudarTipoAlertaId(3);
                handleNotification('Aberta no terminal!');
                setMostrarAlerta(true);

            } else if (mesa.status === 4 || mesa.status === 5) {
                mudarTipoAlertaId(4);
                handleNotification('Comanda em Recebimento!');
                setMostrarAlerta(true);
            }
            else {
                mudarTipoAlertaId(0);
                setMostrarAlerta(true);
                handleNotification('Acesso negado, Por favor, informe sua senha!');
            }

        } else {
            mudarTipoAlertaId(0);
            setMostrarAlerta(true);
            handleNotification('Mesa ' + idMesa + ' livre, Deseja iniciar Atendimento?');
            if (isAuthenticated) {
                handleClick(idMesa);
                handleNovaComanda(idMesa, 1);
            }
        }
    };


    const handleClick = (mesaId) => {
        if (mesaId) {
            setMesaAberta(mesaId);
            /*navigation(`/mesa/${mesaId}/comanda`);*/
            handleShowModalMesa();

        } else {
            console.log('MesaId é null, não faz nada.');
        }
    }

    function mudarTipoAlertaId(novoId) {
        setTipoAlertaId(novoId);
    }

    useEffect(() => {

        if (atendente.usuario === null) {
            mudarTipoAlertaId(0);
            setNivel(1);
            console.log(atendente.usuario);


        } else {
            mudarTipoAlertaId(1);

            setNivel(atendente.nivel);
        }
    }, [atendente]);

    const handleButtonClick = (event) => {
        const value = event.target.value;
        if (value === 'C') {
            setSenha('');
        } else if (value === 'OK') {
            // Executa a ação necessária com a senha...
            setSenha('');
            enviarDadosUsuario();
        } else {
            setSenha(senha + value);
        }
    };
    const fazerPedido = () => { };
    return (

        <div className='comandeira-comanda'>

            {showModalMesa != false ?
                <Modal show={showModalMesa} onHide={handleCloseModalMesa}
                    style={{
                        position: 'absolute',
                        top: '-27px',
                        left: '-6px'
                    }}>
                    {/*showModalMesa */}
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {caixaStatus != false ? <ComandaMesa handleGorjeta={handleGorjeta} handleDeletarComanda={handleDeletarComanda} atendente={atendente} setCaixaStatus={handleCaixaStatus} setNotification={handleNotification} socket={socket} handleSairLogin={handleSairLogin} comandaLis={comandas} mesaId={mesaAberta} handleShowModalMesa={handleShowModalMesa} handleEmitStatus={handleEmitStatus} /> : <Comanda handleDeletarComanda={handleDeletarComanda} atendente={atendente} setCaixaStatus={handleCaixaStatus} setNotification={handleNotification} socket={socket} handleSairLogin={handleSairLogin} comandaLis={comandas} mesaId={mesaAberta} handleShowModalMesa={handleShowModalMesa} handleGorjeta={handleGorjeta} handleEmitStatus={handleEmitStatus} />}


                    </Modal.Body>
                    {/*
                <Modal.Footer>
                    <Button onClick={handleCloseModalMesa}>Fechar</Button>
                </Modal.Footer>
                 */}
                </Modal>
                : <></>}

            <div className={isAuthenticated === true ? "mesas-page senha-background" : 'mesas-page' + (isAuthenticated && atendente.auth === 'dt9' ? 'senha-background' : '')}>

                <div className="mesas-list">

                    <ul className='area-mesas'>
                        {mesas.map((mesa) => (
                            <div key={mesa.mesa} className={`butaoMenuMesa - hmenu - princopa`} onClick={() => handleMesaClick(mesa.mesa)}><Mesa key={mesa.mesa} mesa={mesa} comandas={comandas} fazerPedido={fazerPedido} sSetMesas={setMesas} />

                            </div>
                        ))}

                        {mostrarAlerta && (
                            <AlertaPersonalizado
                                usuarioError={usuarioError}
                                tipoAlertaId={tipoAlertaId}
                                message={usuarioError[tipoAlertaId].mensagem}
                                onClose={handleFecharAlerta}
                                hAlerta={handleClickMostrar}
                            />
                        )}
                    </ul>
                </div>
            </div>

            <div className={areaActive === true ? "senha-area senha-active " : 'senha-area' + (isAuthenticated && atendente.auth === 'dev' ? ' senha-background' : '')}>

                <div className='status-mesa-comanda'>
                    <table className='vertical'>
                        <thead>
                            <tr>
                                <th><em>{atendente.usuario}</em></th>
                                <th>{funcao(atendente.auth)}</th>
                                <th>{comandas.length}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><AiOutlineUser size={32} /></td>
                                <td><BiUserPin size={32} /></td>
                                <td>
                                    <FaUtensils size={32} />
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>
                {!isAuthenticated &&
                    <div className='digitosLogin'>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha || ''}


                        />

                        {erroSenha && <p className="senha-erro">Senha incorreta. Tente novamente.</p>}



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
                    </div>}

                {isAuthenticated &&
                    <div className='digitos'>
                        <button onClick={handleSairLogin} style={{ width: '300px', position: 'relative', left: '20px' }}>SAIR</button>
                        {nivel >= 1 ? <div className='g1s'>
                            <button>conta</button>
                            <button>fila</button>
                            <button>status</button>
                        </div> : <></>}

                        {nivel >= 2 ? <div className='g1s'>
                            <button>BAR</button>
                            <button>VARANDA</button>
                            <button>RESERVA</button>
                        </div> : <></>}

                        {nivel >= 3 ? <div className='g1s'>
                            <button>SALÃO</button>
                            <button>COZINHA</button>
                            <button>LIMPEZA</button>
                        </div> : <></>}
                        {nivel >= 5 ?
                            <div className='g1s'>
                                <button>GESTOR</button>
                                <button>SV</button>

                                <button onClick={handleFullscreen}>TELA</button>
                            </div> : <></>}


                    </div>
                }
                <button className='butaoUps' onClick={handleClickMostrar}>↑</button>
                {/*
                <ServerStatus setNotification={handleNotification} />
                */}
            </div>




        </div>

    );
};

export default MesasPage;