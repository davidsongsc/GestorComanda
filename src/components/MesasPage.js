import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Mesa from './Mesa';
import Comanda from './Comanda';
import './estilo.css';
import io from 'socket.io-client';
import AlertaPersonalizado from './AlertaPersonalizado';

import ServerStatus from './ServerStatus';
//<ServerStatus onClick={handleAlertClose} />
const socket = io('http://192.168.0.50:8000');
//const ipNucleo = 'https://dagesico.pythonanywhere.com;'
const ipNucleo = 'http://192.168.0.50:5000';
//const ipSokkect = 'https://dagesico.pythonanywhere.com:8000'
const ipSokkect = 'http://192.168.0.50:8000'

// ALERTA DE ERRO USUARIO NÃO AUTENTICADO
const usuarioError = [{
    "titulo": "Usuario Erro!",
    "mensagem": "Para acessar a mesa ou imprimir a conta, por favor identifique-se com sua credencial!",
    "btn1": "logar",
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
            return 'aux limpeza';
        case 'b2':
            return 'cummim';
        case 'b3':
            return 'recepcionista';
        case 'b4':
            return 'garçom';
        case 'b5':
            return 'bartender';
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
            return 'assistente gerente';
        case 'g2':
            return 'gerente';
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

    const navigation = useNavigate();
    const [mesas, setMesas] = useState([...Array(126)].map((_, index) => ({ mesa: index + 1, ocupada: false, status: 0, aberta: false, conta: null, atendente: null })));
    const [senha, setSenha] = useState('');
    const [fullscreen, setFullscreen] = useState(false);
    const [mesaSelecionada, setMesaSelecionada] = useState(null);
    const [messages, setMessages] = useState([]);
    const [erroSenha, setErroSenha] = useState(false);
    const [comandas, setComandas] = useState([]);
    const [atendente, setAtendente] = useState({ "usuario": null, "nivel": null, "auth": '0' });
    const [comanda, setComanda] = useState();
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [tipoAlertaId, setTipoAlertaId] = useState(0);
    const [areaActive, setActive] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const enviarDadosUsuario = () => {
        console.log(senha)
        socket.emit('dados_usuario', { senha });

        // Ouça o evento 'autenticacao' para receber a resposta do servidor
        socket.on('autenticacao', (data) => {
            if (data.success) {
                console.log(`Usuário autenticado com sucesso, nível: ${data.nivel}`);
                console.log(data);
                setAtendente({ "usuario": data.usuario, "nivel": data.nivel, "auth": data.auth });
                handleClickMostrar();
                setSenha('');
                setIsAuthenticated(true);
                setTimeout(() => {
                    setAtendente({ "usuario": null });;
                    setIsAuthenticated(false)
                }, 11000);

            } else {
                console.log('Falha na autenticação do usuário');

            }
        })
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

        // atualiza as comandas a cada 1,5 segundos
        const intervalId = setInterval(fetchComandas, 1500);

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
    function handleSairLogin() {
        setAtendente({ "usuario": null });
        setIsAuthenticated(false);
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
    const handleCancelarClick = () => {
        setSenha('');
    };
    const handleStatusMesaClick = (idMesa) => {
        const statusMesas = mesas.find((mesa) => mesa.mesa === idMesa);
    }
    const handleMesaClick = (idMesa) => {
        const mesa = mesas.find((mesa) => mesa.mesa === idMesa);
        if (atendente.usuario) {

            if (mesa.aberta) {
                console.log(mesa)
                handleClick(idMesa);
                // Abrir comanda
                setMesas((prevState) =>
                    prevState.map((prevMesa) =>
                        prevMesa.mesa === idMesa ? { ...prevMesa, aberta: true, status: 2 } : prevMesa
                    )
                );

            }

            else {
                handleStatusMesaClick(idMesa);
                setMostrarAlerta(true);
            }
        } else {
            setMostrarAlerta(true);
        }


    };

    const handleClick = (mesaId) => {
        navigation(`/mesa/${mesaId}/comanda`);
    }

    function mudarTipoAlertaId(novoId) {
        setTipoAlertaId(novoId);
    }

    useEffect(() => {
        if (atendente.usuario !== null) {
            mudarTipoAlertaId(1);
            console.log(atendente.usuario);
        } else {
            mudarTipoAlertaId(0);
        }
    }, []);

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
                    <h2>Comandas: {comandas.length} </h2>

                    <h2>Atendente: <em>{atendente.usuario}</em> </h2>
                    <div style={{ display: "flex" }}>
                        <h2>Nivel: {atendente.nivel} - </h2>
                        <h2>- {funcao(atendente.auth)}</h2>
                    </div>
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
                        <h1>Menu</h1>

                        <div className='g1'>
                            <button onClick={handleSairLogin}>SAIR</button>
                            <button>status</button>
                            <button>fila</button>
                        </div>
                        <div className='g1'>
                            <button>BAR</button>
                            <button>VARANDA</button>
                            <button>RESERVA</button>
                        </div>
                        <div className='g1'>
                            <button>SALÃO</button>
                            <button>COZINHA</button>
                            <button>LIMPEZA</button>
                        </div>
                        <div className='g1'>
                            <button>GERENTE</button>
                            <button>SV</button>

                            <button onClick={handleFullscreen}>TELA</button>
                        </div>
                    </div>
                }
                <button className='butaoUps' onClick={handleClickMostrar}>↑</button>
                <ServerStatus />
            </div>




        </div>

    );
};

export default MesasPage;