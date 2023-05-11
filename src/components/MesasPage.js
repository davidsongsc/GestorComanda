import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Mesa from './Mesa';
import Comanda from './ComandaMesa';
import './estilo.css';
import io from 'socket.io-client';
import AlertaPersonalizado from './AlertaPersonalizado';
import { AiOutlineUser } from 'react-icons/ai';
import { FaUtensils } from 'react-icons/fa';
import { BiUserPin } from 'react-icons/bi';
import ServerStatus from './ServerStatus';
//<ServerStatus onClick={handleAlertClose} />
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

}]

const cargos = {
    s1: () => 'Atendente de Salão',
    s2: () => 'Bartender',
    c1: () => 'Auxiliar de Cozinha',
    l1: () => 'Auxiliar de Limpeza',
};

function funcao(codigo) {
    switch (codigo) {
        case 's1':
            return 'aux limpeza';
        case 's2':
            return 'aux sv geral';
        case 's3':
            return 'aux manutenção';
        case 'c1':
            return 'aux limpeza';
        case 'c2':
            return 'aux copa';
        case 'c3':
            return 'aux preparo';
        case 'c4':
            return 'aux linha';
        case 'c5':
            return 'aux cozinha';
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
        case 'a3':
            return 'apoio operacional';
        case 'a4':
            return 'delivery';
        case 'a5':
            return 'supervisor';
        case 'g1':
            return 'Assistant Manager';
        case 'g2':
            return 'Manager';
        case 'g3':
            return 'assistente rh';
        case 'g4':
            return 'recursos humanos';
        case 'g5':
            return 'assistente financeiro';
        case 'g6':
            return 'financeiro';
        case 'g7':
            return 'assistente administrativo';
        case 'g8':
            return 'administrador';
        case 'g9':
            return 'assistente t.i.';
        case 'g10':
            return 'gerente de projetos';
        case 'g11':
            return 'socio';
        case 'g12':
            return 'proprietario';
        case 'dev':
            return 'Desenvolvedor Sistema'

        default:
            return '';
    }
}
const MesasPage = () => {
    const [ws, setWs] = useState(null);
    const [nome, setNome] = useState('');
    const [showModalMesa, setShowModalMesa] = useState(false);
    const navigation = useNavigate();
    const [mesas, setMesas] = useState([...Array(126)].map((_, index) => ({ mesa: index + 1, ocupada: false, status: 0, aberta: false, conta: null, atendente: null })));
    const [senha, setSenha] = useState('');
    const [fullscreen, setFullscreen] = useState(false);
    const [mesaSelecionada, setMesaSelecionada] = useState(null);
    const [erroSenha, setErroSenha] = useState(false);
    const [comandas, setComandas] = useState([]);
    const [atendente, setAtendente] = useState({ "usuario": null, "nivel": null, "auth": '0' });
    const [mesaAberta, setMesaAberta] = useState(null);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [tipoAlertaId, setTipoAlertaId] = useState(0);
    const [areaActive, setActive] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [nivel, setNivel] = useState(1);
    let timeoutId;

    const enviarDadosUsuario = () => {
        socket.emit('dados_usuario', { senha });

        // Ouça o evento 'autenticacao' para receber a resposta do servidor
        socket.on('autenticacao', (data) => {
            if (data.success) {
                console.log(`Usuário autenticado com sucesso, nível: ${data.nivel}`);
 
                setAtendente({ "usuario": data.usuario, "nivel": data.nivel, "auth": data.auth });
                handleClickMostrar();
                setSenha('');
                setIsAuthenticated(true);
                /*
                timeoutId = setTimeout(() => {
                    setAtendente({ "usuario": null });;
                    setIsAuthenticated(false)
                }, 11000);
                */
            } else {
                console.log('Falha na autenticação do usuário');

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
        socket.on('connect', () => {
            console.log('Conectado ao servidor');
        });
    }, []);

    useEffect(() => {
        fetchComandas();

        // atualiza as comandas a cada 1 segundos
        const intervalId = setInterval(fetchComandas, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    socket.on('comandas', (data) => {
        setComandas(data);

        setMesas((prevState) =>
            prevState.map((prevMesa) => {
                const comanda = comandas.find((comanda) => comanda.mesa === prevMesa.mesa);
                return comanda ? { ...prevMesa, atendente: comanda.operador, ocupada: true, aberta: true, conta: comanda, status: comanda.status } : prevMesa;
            })
        );

    });


    const handleFullscreen = () => {
        const elem = document.documentElement;
        if (!fullscreen) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        setFullscreen(!fullscreen);
    };

    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };
    function handleExibirAlerta() {
        setMostrarAlerta(true);
    }

    function handleFecharAlerta() {
        setMostrarAlerta(false);
    }

    function handleSairLogin() {
        clearTimeout(timeoutId);
        setAtendente({ "usuario": null });
        setIsAuthenticated(false);
        handleCloseModalMesa();
        handleClickMostrar();
    }
    const handleClickMostrar = () => {
        if (areaActive === false) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    };


    const handleMesaClick = (idMesa) => {
        const mesa = mesas.find((mesa) => mesa.mesa === idMesa);
        if (atendente.usuario) {
            if (mesa.ocupada) {
                handleClick(idMesa);
                // Abrir comanda
                setMesas((prevState) =>
                    prevState.map((prevMesa) =>
                        prevMesa.mesa === idMesa ? { ...prevMesa, aberta: true, status: 2 } : prevMesa
                    )
                );
            }

            else {
                console.log('modifique-aqui')
                
                setMostrarAlerta(true);
                handleClick(idMesa);
                
            }
        } else {
            setMostrarAlerta(true);
        }


    };

    const handleClick = (mesaId) => {
        if (mesaId) {
            setMesaAberta(mesaId);
            navigation(`/mesa/${mesaId}/comanda`);
            //handleShowModalMesa();
            
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

            <Modal show={showModalMesa} onHide={handleCloseModalMesa}
                style={{
                    position: 'absolute',
                    top: '-27px',
                    left: '-6px'
                }}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Comanda comandaLis={comandas} mesaId={mesaAberta} handleShowModalMesa={handleShowModalMesa} handleCloseModalMesa={handleCloseModalMesa} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModalMesa}>Fechar</Button>
                </Modal.Footer>
            </Modal>
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
                        {mesaSelecionada !== null && (
                            <div className="comanda-area">
                                <Comanda usuarioError={usuarioError}
                                    tipoAlertaId={tipoAlertaId}
                                    message={usuarioError[tipoAlertaId].mensagem}
                                    onClose={handleFecharAlerta}
                                    hAlerta={handleClickMostrar}
                                    handleClickMostrar={handleClickMostrar}
                                    handleFecharAlerta={handleFecharAlerta} />
                            </div>
                        )}


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
                        {nivel >= 2 ? <div className='g1s'>
                            <button>reserva</button>
                            <button>fila</button>
                            <button>status</button>
                        </div> : <></>}

                        {nivel >= 3 ? <div className='g1s'>
                            <button>BAR</button>
                            <button>VARANDA</button>
                            <button>RESERVA</button>
                        </div> : <></>}

                        {nivel >= 4 ? <div className='g1s'>
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
                <ServerStatus />
            </div>




        </div>

    );
};

export default MesasPage;