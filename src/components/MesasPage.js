import React, { useState, useEffect } from 'react';
import { Modal/*, Button*/ } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Mesa from './Comanda/Mesa';
import Comanda from './Comanda/ComandaMesa';
import './estilo.css';
import AlertaPersonalizado from './Sistema/AlertaPersonalizado';
import { AiOutlineUser } from 'react-icons/ai';
import { FaUtensils } from 'react-icons/fa';
import { BiUserPin } from 'react-icons/bi';
import FuncaoComponent from './Outros/FuncaoComponent';
import BarraMenuOperacional from './PagePainel/BarraMenuOperacao';


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

},
{
    "titulo": "",
    "mensagem": "Confira antes do O.K.",
    "btn1": "OK",
    "fnb1": "",
    "btn2": "Fechar",
    "fnb2": ""

},
{
    "titulo": "",
    "mensagem": "Por favor, observe que os itens serão registrados com o nome do garçom responsável pela comanda!",
    "btn1": "OK",
    "fnb1": "",
    "btn2": "Fechar",
    "fnb2": ""

}]


const MesasPage = ({ setNotification, handlelogin, socket }) => {
    const [showModalMesa, setShowModalMesa] = useState(false);
    const [senha, setSenha] = useState('');
    const [comandas, setComandas] = useState([]);

    const [atendente, setAtendente] = useState({ "usuario": null, "nivel": null, "auth": '0' });
    const [mesaAberta, setMesaAberta] = useState(null);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [tipoAlertaId, setTipoAlertaId] = useState(0);
    const [areaActive, setActive] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [nivel, setNivel] = useState(1);
    const [displayVisualizando, setDisplayVisualizador] = useState(0);
    const [selectedOption, setSelectedOption] = useState('loja');
    useEffect(() => {
        if (selectedOption === 'loja') {
            setDisplayVisualizador(0);
            const minMesa = 1;
            const maxMesa = 99;
            const operacao = 0;
            setMesas(
                [...Array(maxMesa - minMesa + 1)].map((_, index) => ({
                    mesa: index + minMesa,
                    ocupada: false,
                    status: 0,
                    aberta: false,
                    conta: null,
                    atendente: null,
                    nivel: 0,
                    operacao: operacao,
                }))
            );
        }
        else if (selectedOption === 'bar') {
            setDisplayVisualizador(1);
            const minMesa = 100;
            const maxMesa = 120;
            const operacao = 1;
            setMesas(
                [...Array(maxMesa - minMesa + 1)].map((_, index) => ({
                    mesa: index + minMesa,
                    ocupada: false,
                    status: 0,
                    aberta: false,
                    conta: null,
                    atendente: null,
                    nivel: 0,
                    operacao: operacao,
                }))
            );
        }
        else if (selectedOption === 'giral') {
            setDisplayVisualizador(2);
            const minMesa = 121;
            const maxMesa = 200;
            const operacao = 2;
            setMesas(
                [...Array(maxMesa - minMesa + 1)].map((_, index) => ({
                    mesa: index + minMesa,
                    ocupada: false,
                    status: 0,
                    aberta: false,
                    conta: null,
                    atendente: null,
                    nivel: 0,
                    operacao: operacao,
                }))
            );
        }
        else if (selectedOption === 'externa') {
            setDisplayVisualizador(3);
            const minMesa = 201;
            const maxMesa = 299;
            const operacao = 3;
            setMesas(
                [...Array(maxMesa - minMesa + 1)].map((_, index) => ({
                    mesa: index + minMesa,
                    ocupada: false,
                    status: 0,
                    aberta: false,
                    conta: null,
                    atendente: null,
                    nivel: 0,
                    operacao: operacao,
                }))
            );
        }
        if (selectedOption === 'delivery') {
            setDisplayVisualizador(4);
            const minMesa = 300;
            const maxMesa = 420;
            const operacao = 4;
            setMesas(
                [...Array(maxMesa - minMesa + 1)].map((_, index) => ({
                    mesa: index + minMesa,
                    ocupada: false,
                    status: 0,
                    aberta: false,
                    conta: null,
                    atendente: null,
                    nivel: 0,
                    operacao: operacao,
                }))
            );
        }
    }, [selectedOption]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    let minMesa;
    let maxMesa;
    let operacao;

    if (displayVisualizando === 0) {
        minMesa = 1;
        maxMesa = 99;
        operacao = 0;
    } else if (displayVisualizando === 1) {
        minMesa = 100;
        maxMesa = 120;
        operacao = 1;
    } else if (displayVisualizando === 2) {
        minMesa = 200;
        maxMesa = 300;
        operacao = 2;
    } else if (displayVisualizando === 3) {
        minMesa = 300;
        maxMesa = 400;
        operacao = 3;
    } else if (displayVisualizando === 4) {
        minMesa = 400;
        maxMesa = 600;
        operacao = 4;
    }

    const [mesas, setMesas] = useState(
        [...Array(maxMesa - minMesa + 1)].map((_, index) => ({
            mesa: index + minMesa,
            ocupada: false,
            status: 0,
            aberta: false,
            conta: null,
            atendente: null,
            nivel: 0,
            operacao: operacao,
        }))
    );

    const [listaUsuarios, setListaUsuarios] = useState();

    const [caixaStatus, setCaixaStatus] = useState(false);
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [erroSenha, setErroSenha] = useState(false);
    let timeoutId;

    const handleLoginSistema = (usuario) => {
        handlelogin(usuario);
    }

    const handleNotification = (text) => {
        setNotification(text);
    };
    const handleMesaLenght = (mesa) => {
        return (<h1>{mesa.lenght}</h1>);
    };
    const enviarDadosUsuario = () => {
        socket.emit('dados_usuario', { senha });

        socket.on('autenticacao', (data) => {
            if (data.success) {
                handleNotification(`Entrou como: ${data.usuario}`);
                setAtendente({ "usuario": data.usuario, "nivel": data.nivel, "auth": data.auth });
                handleLoginSistema({ "usuario": data.usuario, "nivel": data.nivel, "auth": data.auth });
                handleClickMostrar();
                setSenha('');
                setIsAuthenticated(true);

                // Salvar os dados do usuário no localStorage
                localStorage.setItem('usuario', JSON.stringify(data));

            } else {
                handleNotification('Falha na autenticação do usuário');


            }
        });
    };

    useEffect(() => {
        // Recuperar os dados do usuário do localStorage
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            const data = JSON.parse(usuario);
            handleNotification(`Entrou como: ${data.usuario}`);
            setAtendente({ "usuario": data.usuario, "nivel": data.nivel, "auth": data.auth });
            handleClickMostrar();
            setSenha('');
            setIsAuthenticated(true);
        }
    }, []);

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
        const atendentes = [];
        socket.on('comandas', (data) => {
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
            setListaUsuarios(atendentes);

        });

        socket.on('disconnect', () => {
            // Implemente a lógica para lidar com a desconexão do cliente, se necessário
        });

        socket.on('connect', () => {
            // Implemente a lógica para lidar com a reconexão do cliente, se necessário
        });

        return () => {
            socket.off('comandas');
            socket.off('disconnect');
            socket.off('connect');
        };
    }, []);




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

    const handleSairLogin = (v) => {
        handleCloseModalMesa();
        if (v === 'true') {
            setCaixaStatus(false);
            clearTimeout(timeoutId);
            handleNotification(`${atendente.usuario} Desconectado...`)
            //handleNotification('Usuario Desconectado!');
            setAtendente({ "usuario": null });
            handleLoginSistema({ "usuario": null });
            setIsAuthenticated(false);
            localStorage.removeItem('usuario');
        }

        /*
        window.location.reload();
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
            operacao: displayVisualizando,
            cliente: null
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

    const handleDeletarComanda = (idMesa, valorComanda) => {

        const data = {
            id: idMesa,
            status: 6,
            atendente: atendente.usuario,
            valor: valorComanda
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
    const handleComandaItens = (comanda, id) => {

        socket.emit('anotar_item_comanda', comanda, id, atendente.usuario);

    };
    const handleDeletarItem = (itemId) => {

        socket.emit('deletar_item_comanda', itemId);

    };

    const handleNovaComanda = (idMesa, op) => {

        const data = {
            id: idMesa,
            status: op,
            atendente: atendente.usuario,
            operacao: displayVisualizando,
            cliente: null
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
        console.log(mesa);
        console.log(listaUsuarios);

        if (mesa.conta) {
            if (!atendente.usuario) {
                mudarTipoAlertaId(1);
                handleNotification('Usuário não encontrado!');
            } else if (mesa.status === 5 && atendente.auth === 'j5' && mesa.ocupada) {
                handleEmitStatus(idMesa, 4);
                handleNotification('Operação de Caixa: ' + mesa.mesa);
            } else if (mesa.atendente != atendente.usuario) {
                if (atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))) {
                    handleEmitStatus(idMesa, 1);
                    handleNotification(mesa.atendente + ' Inicia a mesa.');
                    mudarTipoAlertaId(6);
                    setMostrarAlerta(true);
                }

            } else {
                if (
                    (mesa.status !== 1 && mesa.status !== 5 && mesa.status !== 4) ||
                    (atendente.auth === 'j5' && (mesa.status === 5 || mesa.status === 4)) ||
                    (atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1)))
                ) {
                    mudarTipoAlertaId(5);
                    handleEmitStatus(idMesa, 1);
                    handleNotification(atendente.usuario + ' Inicia a mesa ' + mesa.mesa);
                } else if (mesa.status === 1) {
                    mudarTipoAlertaId(3);
                    handleNotification('Aberta no terminal!');
                } else if (mesa.status === 4 || mesa.status === 5) {
                    mudarTipoAlertaId(4);
                    handleNotification('Comanda em Recebimento!');
                } else {
                    mudarTipoAlertaId(0);
                    handleNotification('Acesso negado, Por favor, informe sua senha!');
                }
                setMostrarAlerta(true);
            }
        } else {
            mudarTipoAlertaId(0);
            handleNotification('Mesa ' + idMesa + ' livre, Deseja iniciar Atendimento?');
            if (isAuthenticated) {
                handleClick(idMesa);
                handleNovaComanda(idMesa, 1);
            }
            setMostrarAlerta(true);
        }
    };



    const handleClick = (mesaId) => {

        if (mesaId) {
            setMesaAberta(mesaId);
            /*navigation(`/mesa/${mesaId}/comanda`);*/
            handleShowModalMesa();

        }
    }

    function mudarTipoAlertaId(novoId) {
        setTipoAlertaId(novoId);
    }

    useEffect(() => {

        if (atendente.usuario === null) {
            mudarTipoAlertaId(0);
            setNivel(1);
            handleClickMostrar();
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
                        {caixaStatus != false ?
                            <Comanda displayVisualizando={displayVisualizando} atendentes={listaUsuarios} caixaStatus={caixaStatus} handleDeletarComanda={handleDeletarComanda} atendente={atendente} setCaixaStatus={handleCaixaStatus} setNotification={handleNotification} socket={socket} handleSairLogin={handleSairLogin} comandaLis={comandas} mesaId={mesaAberta} handleShowModalMesa={handleShowModalMesa} handleGorjeta={handleGorjeta} handleEmitStatus={handleEmitStatus} handleComandaItens={handleComandaItens} handleDeletarItem={handleDeletarItem} /> : <Comanda displayVisualizando={displayVisualizando} atendentes={listaUsuarios} caixaStatus={caixaStatus} handleDeletarComanda={handleDeletarComanda} atendente={atendente} setCaixaStatus={handleCaixaStatus} setNotification={handleNotification} socket={socket} handleSairLogin={handleSairLogin} comandaLis={comandas} mesaId={mesaAberta} handleShowModalMesa={handleShowModalMesa} handleGorjeta={handleGorjeta} handleEmitStatus={handleEmitStatus} handleComandaItens={handleComandaItens} handleDeletarItem={handleDeletarItem} />
                        }


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
                            <li key={mesa.mesa}
                                className={`butaoMenuMesa - hmenu - princopa`}
                                style={{ display: mesa.operacao === displayVisualizando ? 'flex' : 'none' }}
                                onClick={() => handleMesaClick(mesa.mesa)}>
                                <Mesa key={mesa.mesa} mesa={mesa} comandas={comandas}
                                    fazerPedido={fazerPedido}
                                    sSetMesas={setMesas} />
                            </li>
                        ))}<li><select id="selecaoAreaLoja" value={selectedOption} onChange={handleChange} disabled={atendente.nivel > 4 ? false : true}>
                            <option value="loja">Loja</option>
                            <option value="bar">Bar</option>
                            <option value="giral">Giral</option>
                            <option value="externa">Externa</option>
                            <option value="delivery">Delivery</option>
                        </select></li>

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
                <div className='status-mesa-comanda' >
                    <table className='vertical' disabled={atendente.nivel > 1 ? false : true}>
                        <thead>
                            <tr>
                                <th><em>{atendente.usuario}</em></th>
                                <th><FuncaoComponent codigo={atendente.auth} /></th>
                                <th>{selectedOption} </th>
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

                    {atendente.usuario != null &&
                        <button onClick={() => handleSairLogin('true')} style={{ width: '300px', position: 'relative', margin: '25px' }}>SAIR</button>
                    }

                </div>

                {!isAuthenticated &&
                    <div className='digitosLogin'>
                        <div className='g1'>
                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha || ''}


                                disabled={atendente.auth === null ? false : true} />

                        </div>

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





                {isAuthenticated && <BarraMenuOperacional atendente={atendente} />
                }

                <button className='butaoUps' onClick={handleClickMostrar}>↑</button>
            </div>




        </div>

    );
};

export default MesasPage;