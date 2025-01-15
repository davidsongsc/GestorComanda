import React, { useState, useEffect } from 'react';
import { Modal/*, Button*/ } from 'react-bootstrap';
import Mesa from './Comanda/Mesa';
import Comanda from './Comanda/ComandaMesa';
import './estilo.css';
import AlertaPersonalizado from './Sistema/AlertaPersonalizado';
import { AiOutlineUser } from 'react-icons/ai';
import { FaUtensils } from 'react-icons/fa';
import { BiUserPin } from 'react-icons/bi';
import FuncaoComponent from './Outros/FuncaoComponent';
import BarraMenuOperacional from './PagePainel/BarraMenuOperacao';
import { usuarioError } from './principal/ExtensaoMesa';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '../features/user/userSlice';
import UserLogin from '../features/user/UserLogin';
import { useSelector } from 'react-redux';
import { setNotification } from '../features/notification/notificationSlice';
import { setLocalMesa } from '../features/localmesa/localmesaSlice';
import ComandaProvider from '../features/cservidor/comandaProvedor';
import { updateListaUsuarios } from '../store/actions';
import { disconnectSocket, initializeSocket } from '../features/cservidor/conexaoSlice';
import connectarServidor from './Api/loglogin';
import Relatorios from './Administrativo/Gestor';
import { mostrarGestor } from '../features/cservidor/gestorSlice';

// ALERTA DE ERRO USUARIO NÃO AUTENTICADO

let minMesa;
let maxMesa;
let operacao;

const MesasPage = () => {
    const dispatch = useDispatch();
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

    const [listaUsuarios, setListaUsuarios] = useState();
    const [caixaStatus, setCaixaStatus] = useState(false);
    const user = useSelector(state => state.user);
    const selectedOption = useSelector(state => state.localmesa.localmesa);
    const socket = useSelector(state => state.socket.socket); // Ajuste conforme sua estrutura Redux
    const deviceName = navigator.userAgent;
    const platform = navigator.platform;
    const userLanguage = navigator.language;
    const showGestor = useSelector(state => state.mostrarGestor.showGestor);
    const handleShowGestor = () => {
        dispatch(mostrarGestor());
    };

    useEffect(() => {
        // Inicializa o socket quando o componente monta
        dispatch(initializeSocket(connectarServidor)); // Ajuste para sua URL de servidor
        //console.log(platform);
        //console.log(`Idioma do usuário: ${userLanguage}`);
        //const isOnline = navigator.onLine;
        //console.log(`O usuário está online? ${isOnline}`);
        //console.log(deviceName);
        //const isCookieEnabled = navigator.cookieEnabled;
        //console.log(`Cookies estão habilitados? ${isCookieEnabled}`);
        /*if ("geolocation" in navigator) {
            document.cookie = "username=John Doe; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";
            const cookies = document.cookie;
            console.log(cookies);
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                handleNotification(`Localização: ${latitude}, ${longitude}`);
            });
        } else {
            handleNotification("Geolocalização não suportada pelo navegador.");
            console.log("Geolocalização não suportada pelo navegador.");
        }
            */
        return () => {
            // Desconecta o socket quando o componente desmonta
            dispatch(disconnectSocket());
        };
    }, [dispatch]);

    useEffect(() => {
        if (selectedOption === 'loja') {
            dispatch(setLocalMesa(selectedOption));
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
            dispatch(setLocalMesa(selectedOption));
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
            dispatch(setLocalMesa(selectedOption));
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
            dispatch(setLocalMesa(selectedOption));
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
            dispatch(setLocalMesa(selectedOption));
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

    let timeoutId;

    const handleNotification = (text) => {
        dispatch(setNotification({ text: text }));
    };
    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            const userData = JSON.parse(usuario);
            dispatch(setUser(userData));
            setIsAuthenticated(true);
        }
        else {
            dispatch(clearUser());
            setIsAuthenticated(false);
        }
    }, [dispatch]);

    useEffect(() => {
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

    useEffect(() => {
        const fetchComandas = async () => {
            // Simula uma requisição inicial para buscar comandas
            const initialData = []; // Substitua com dados reais
            setComandas(initialData);
        };

        fetchComandas();
        const atendentes = new Set(); // Use Set para evitar duplicatas

        if (socket) {
            socket.on('comandas', (data) => {
                setComandas(data);

                setMesas((prevState) =>
                    prevState.map((prevMesa) => {
                        if (prevMesa.atendente) {
                            atendentes.add(prevMesa.atendente); // Adiciona atendentes ao Set
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

                // Enviar apenas os atendentes (dados serializáveis) para o Redux
                dispatch(updateListaUsuarios(Array.from(atendentes)));  // Converte Set para Array
            });

            return () => {
                socket.off('comandas');
            };
        }
    }, [socket, dispatch]);



    function handleFecharAlerta() {
        setMostrarAlerta(false);
    }

    const handleSairLogin = (v) => {
        handleCloseModalMesa();
        if (v === 'true') {

            dispatch(clearUser());
            setCaixaStatus(false);
            clearTimeout(timeoutId);
            handleNotification(`${user.usuario} Desconectado...`)
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
        if (user.nivel > 4 || user.auth === 'j5') {
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
        if (socket && socket.emit) {
            socket.emit('modificar_status_comanda', socket.id, data);
        }
        else {
            handleNotification('Não foi possivel carregar.')
        }
        handleClick(idMesa);
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
        if (socket && socket.emit) {
            socket.emit('modificar_gorjeta_comanda', socket.id, data);
        } else {
            handleNotification('Não é possivel modificar a gorjeta, falha na conexão com servidor.');
        }
    };

    const handleDeletarComanda = (idMesa, valorComanda) => {
        const data = {
            id: idMesa,
            status: 6,
            atendente: user.usuario,
            valor: valorComanda
        };

        if (socket && socket.emit) {
            socket.emit('deletar_status_comanda_nova', socket.id, data);
            socket.emit('notificacoes', socket.id, 'TESTE 123');

        } else {
            handleNotification('Não é possivel deletar o status da comanda, falha na conexão com servidor.');
        }
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

        if (socket && socket.emit) {
            socket.emit('anotar_item_comanda', socket.id, comanda, id, user.usuario);
        } else {
            handleNotification('Não é possivel comandar o item na comanda, falha na conexão com servidor.');
        }
    };

    const handleDeletarItem = (itemId) => {

        if (socket && socket.emit) {
            socket.emit('deletar_item_comanda', socket.id, itemId);
        } else {
            handleNotification('Não é possivel deletar comanda, falha na conexão com servidor.');
        }
    };

    const handleNovaComanda = (idMesa, op) => {

        const data = {
            id: idMesa,
            status: op,
            atendente: user.usuario,
            operacao: displayVisualizando,
            cliente: null
        };

        if (socket && socket.emit) {
            socket.emit('modificar_status_comanda_nova', socket.id, data);
        } else {
            handleNotification('Não é possivel modificar status da comanda, falha na conexão com servidor.');
        }
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
        if (!user.restricoes.abrirMesa) {
            handleNotification("Acesso não autorizado | mesa: " + mesa.mesa);
            return;
        }
        else if(mesa.status === 9 && !user.restricoes.g_maitre_abrirMesa)
        {
            handleNotification("BLOQUEIO | M-" + mesa.mesa);

        }
        else {
            if (mesa.conta) {
                handleWithConta(mesa);
            } else {
                handleWithoutConta(idMesa, mesa);
            }
        }


    };

    const handleWithConta = (mesa) => {
        if (!user.usuario) {
            handleUsuarioAusente();
        } else if (mesa.status === 5 && (user.restricoes.c_caixa_cobrar || user.restricoes.g_comanda_maitre)) {
            handleOperacaoCaixa(mesa);
        } else if (mesa.atendente !== user.usuario) {
            handleDifferentAtendente(mesa);
        } else if (mesa.atendente === user.usuario) {
            handleSameAtendente(mesa);
        }


    };

    const handleWithoutConta = (idMesa, mesa) => {
        mudarTipoAlertaId(0);
        handleNotification('Mesa ' + idMesa + ' livre, Deseja iniciar Atendimento?');
        if (user.restricoes.abrirMesa && mesa.status != 4) {
            handleClick(idMesa);
            handleNovaComanda(idMesa, 7);
        }
        else if (user.restricoes.g_maitre_abrirMesa || user.restricoes.g_caixa_operador) {
            handleEmitStatus(mesa.mesa, 1);
            handleNotification(user.usuario + ' Inicia a mesa.');
        }
        setMostrarAlerta(true);
    };

    const handleUsuarioAusente = () => {
        mudarTipoAlertaId(1);
        handleNotification('Usuário não encontrado!');
    };

    const handleOperacaoCaixa = (mesa) => {
        handleEmitStatus(mesa.mesa, 4);
        handleNotification('Operação de Caixa: ' + mesa.mesa);
    };
    const handleMaitreAcessoComanda = (mesa) => {
        if (user.restricoes.g_comanda_maitre) {
            handleEmitStatus(mesa.mesa, 1);
            handleNotification(user.usuario + ' Inicia a mesa de ' + mesa.atendente);
        }
    }
    const handleDifferentAtendente = (mesa) => {
        if (user.restricoes.g_atendenteDiferenteAbrirMesa) {
            handleEmitStatus(mesa.mesa, 1);
            handleNotification(user.usuario + ' Inicia a mesa de ' + mesa.atendente);

        } else if (user.restricoes.g_comanda_maitre && mesa.status != 5) {
            handleEmitStatus(mesa.mesa, 7);
            handleNotification(user.usuario + ' Inicia a mesa em modo titular.');
        }
        else if (mesa.status != 1 && mesa.status != 5 && mesa.status != 6) {
            handleEmitStatus(mesa.mesa, 7);
            handleNotification(user.usuario + ' Inicia a mesa em modo titular.');
        }
        else {
            handleNotification(mesa.atendente + ' está realizando lançamentos.');
        }
    };

    const handleSameAtendente = (mesa) => {
        if (mesa.status === 3) {
            mudarTipoAlertaId(5);
            handleEmitStatus(mesa.mesa, 1);
            handleNotification(user.usuario + ' Inicia a mesa ' + mesa.mesa);
        } else if (mesa.status === 5) {
            mudarTipoAlertaId(3);
            handleEmitStatus(mesa.mesa, 6);
            handleNotification(mesa.atendente + ' Inicia a mesa.');
        }

        else {
            mudarTipoAlertaId(3);
            setMostrarAlerta(true);
            handleMaitreAcessoComanda(mesa);
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

        if (user.usuario === null) {
            mudarTipoAlertaId(0);
            setNivel(1);
            handleClickMostrar();
        } else {
            mudarTipoAlertaId(1);

            setNivel(user.nivel);
        }
    }, [atendente]);


    const fazerPedido = () => { };
    //showGestor
    return (
        <div className='comandeira-comanda'>


            <div className={showGestor ? 'gestor-comandas-relatorio' : ''}>
                {user && user.restricoes && user.restricoes.g_comanda_maitre ? <Relatorios  /> : null}
            </div>
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
                    <ComandaProvider>
                        <Modal.Body>
                            {caixaStatus != false ?
                                <Comanda
                                    displayVisualizando={displayVisualizando}
                                    atendentes={listaUsuarios}
                                    caixaStatus={caixaStatus}
                                    handleDeletarComanda={handleDeletarComanda}
                                    atendente={atendente}
                                    setCaixaStatus={handleCaixaStatus}
                                    setNotification={handleNotification}
                                    socket={socket}
                                    handleSairLogin={handleSairLogin}
                                    comandaLis={comandas}
                                    mesaId={mesaAberta}
                                    handleShowModalMesa={handleShowModalMesa}
                                    handleGorjeta={handleGorjeta}
                                    handleEmitStatus={handleEmitStatus}
                                    handleComandaItens={handleComandaItens}
                                    handleDeletarItem={handleDeletarItem} />
                                :
                                <Comanda
                                    displayVisualizando={displayVisualizando}
                                    atendentes={listaUsuarios}
                                    caixaStatus={caixaStatus}
                                    handleDeletarComanda={handleDeletarComanda}
                                    atendente={atendente}
                                    setCaixaStatus={handleCaixaStatus}
                                    setNotification={handleNotification}
                                    socket={socket}
                                    handleSairLogin={handleSairLogin}
                                    comandaLis={comandas}
                                    mesaId={mesaAberta}
                                    handleShowModalMesa={handleShowModalMesa}
                                    handleGorjeta={handleGorjeta}
                                    handleEmitStatus={handleEmitStatus}
                                    handleComandaItens={handleComandaItens}
                                    handleDeletarItem={handleDeletarItem} />
                            }
                        </Modal.Body>
                    </ComandaProvider>

                </Modal>
                : <></>}
            <div className={user.auth === true ? "mesas-page senha-background" : 'mesas-page' + (isAuthenticated && user.auth === 'dt9' ? 'senha-background' : '')}>
                <div className="mesas-list">
                    <div className='area-mesas ul'>
                        {mesas.map((mesa) => (
                            <div key={mesa.mesa}
                                className={`li butaoMenuMesa - hmenu - princopa`}
                                style={{ display: mesa.operacao === displayVisualizando ? 'flex' : 'none' }}
                                onClick={() => handleMesaClick(mesa.mesa)}>
                                <Mesa key={mesa.mesa} mesa={mesa} comandas={comandas}
                                    fazerPedido={fazerPedido}
                                    sSetMesas={setMesas} />
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
                    </div>
                </div>
            </div>
            <div className={areaActive === true ? "senha-area senha-active " : 'senha-area' + (isAuthenticated && user.auth === 'dev' ? ' senha-background' : '')}>
                <div className='status-mesa-comanda' >
                    <div className='vertical' disabled={user.nivel > 1 ? false : true}>

                        <div>
                            <p> <AiOutlineUser size={16} /><em>{user.usuario}</em></p>
                            <p><BiUserPin size={16} /> <FuncaoComponent codigo={user.posto} /> N{user.nivel}</p>
                            <p><FaUtensils size={16} /> {selectedOption} </p>
                            <p></p>
                        </div>


                    </div>


                </div>


                <div className={user.auth === true ? 'digitosLogin' : 'digitosLogin mostrar-display-login'}>
                    <UserLogin />


                </div>
                {user.auth == true &&
                    <button onClick={() => handleSairLogin('true')} >SAIR</button>
                }
                <BarraMenuOperacional />
                <button onClick={handleShowGestor} >Gestor</button>


            </div>

        </div>

    );
};

export default MesasPage;
