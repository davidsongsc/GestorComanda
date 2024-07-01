import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import FuncaoComponent from "../Outros/FuncaoComponent";
import { setNotification } from "../../features/notification/notificationSlice";
import { useSelector } from 'react-redux';

const PainelLateral = () => {
    const [sistemaVisible, setSistemaVisible] = useState(false);
    const [relatoriosVisible, setRelatoriosVisible] = useState(false);
    const [cadastroVisible, setCadastroVisible] = useState(false);
    const [estatisticas, setEstatisticas] = useState(false);
    const [usuario, setUsuario] = useState();
    const atendente = useSelector(state => state.user);

    const navigate = useNavigate();
    const handleNotification = (text) => {
        setNotification(text);

    };
    handleNotification('Painel do Gestor desbloqueado, Acesso concedido a ' + atendente.usuario + '.');
    const sistemaTransitions = useTransition(sistemaVisible, {
        from: { opacity: 0, transform: "translateY(-30px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
    });

    const relatoriosTransitions = useTransition(relatoriosVisible, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
    });

    const cadastroTransitions = useTransition(cadastroVisible, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
    });
    const estatisticasTransitions = useTransition(estatisticas, {
        from: { opacity: 0, transform: "translateY(-20px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-20px)" },
    });

    const handleSistemaClick = () => {
        setSistemaVisible(!sistemaVisible);
    };

    const handleRelatoriosClick = () => {
        setRelatoriosVisible(!relatoriosVisible);
    };

    const handleCadastroClick = () => {
        setCadastroVisible(!cadastroVisible);
    };
    const handleEstatisticas = () => {
        setEstatisticas(!estatisticas);
    };

    const navigateTo = (route) => {
        navigate(route);
    };
    function handleSairLogin() {

        localStorage.removeItem('usuario');



        window.location.reload();




    }
    return (
        <>
            <header style={{ display: 'flex', position: 'fixed', top: 0, width: '100%', background: 'white', zIndex: 965, height: '45px' }}>
                <nav style={{ width: '100%', padding: '5px 0px', display: 'flex', justifyContent: 'space-evenly' }}>
                    <h1 style={{ margin: 0, textAlign: 'center' }}>Painel</h1>
                    <ul style={{ margin: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', listStyle: 'none', height: '46px' }}>

                        <li style={{ textTransform: 'capitalize', width: '240px', marginRight: '10px', height: '25ox', display: 'flex', flexDirection: 'column' }}>
                            <div >
                                <div>
                                    {atendente.usuario}


                                </div>
                            </div>
                            <div>
                                <FuncaoComponent codigo={atendente.auth} />
                            </div>
                        </li>
                        <li style={{ marginRight: '10px' }}>
                            <label></label>
                        </li>
                        <li style={{ marginRight: '10px' }}>

                        </li>
                        <li style={{ marginRight: '10px' }}>
                            <img className="img-painel-perfil" src='https://www.petz.com.br/cachorro/racas/pinscher/img/pinscher-caracteristicas-guia-racas.webp' alt='' />
                            <div style={{ padding: '0 8px' }}>{atendente.nivel}º</div>

                        </li>

                        <li style={{ marginRight: '10px' }}>
                            <button onClick={handleSairLogin}>Sair</button>
                        </li>
                    </ul>



                </nav>
            </header>
            <div style={{
                maxHeight: '100%',
                overflowY: 'auto',
                width: '160px',
            }} className="botoes-container">
                <div style={{ display: 'flex', alignItems: 'left' }}>

                    <animated.button
                        style={{ sistemaTransitions, background: sistemaVisible ? '#4779f4' : '' }}
                        onClick={handleSistemaClick}
                    >
                        Sistema
                    </animated.button>
                </div>
                <div style={{ display: sistemaVisible ? 'block' : 'none' }}>
                    {sistemaTransitions((styles, item) =>
                        item ? (
                            <animated.div style={styles} key={item}>
                                <button style={{ sistemaTransitions, background: sistemaVisible ? '#4779f4' : '' }} onClick={() => navigateTo('/')}>Loja</button>
                                <button style={{ sistemaTransitions, background: sistemaVisible ? '#4779f4' : '' }} onClick={() => navigateTo('/gestor')}>Delivery</button>
                                <button style={{ sistemaTransitions, background: sistemaVisible ? '#4779f4' : '' }} onClick={() => navigateTo('/gestor')}>Cozinha</button>
                                <button style={{ sistemaTransitions, background: sistemaVisible ? '#4779f4' : '' }} onClick={() => navigateTo('/gestor')}>Serviço</button>
                                <button style={{ sistemaTransitions, background: sistemaVisible ? '#4779f4' : '' }} onClick={() => navigateTo('/gestor')}>Produtos</button>
                                <button style={{ sistemaTransitions, background: sistemaVisible ? '#4779f4' : '' }} onClick={() => navigateTo('/gestor')}>Cardapio</button>
                            </animated.div>
                        ) : null
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'left' }}>


                    <animated.button
                        style={{ relatoriosTransitions, background: relatoriosVisible ? '#ce8f00' : '' }}

                        onClick={handleRelatoriosClick}
                    >
                        Relatórios
                    </animated.button>
                </div>
                <div style={{ display: relatoriosVisible ? 'block' : 'none' }}>
                    {relatoriosTransitions((styles, item) =>
                        item ? (
                            <animated.div style={styles} key={item}>

                                <button style={{ relatoriosTransitions, background: relatoriosVisible ? '#ce8f00' : '' }} onClick={() => navigateTo('/venda')}>Venda</button>
                                <button style={{ relatoriosTransitions, background: relatoriosVisible ? '#ce8f00' : '' }} onClick={() => navigateTo('/venda')}>Descontos</button>
                                <button style={{ relatoriosTransitions, background: relatoriosVisible ? '#ce8f00' : '' }} onClick={() => navigateTo('/venda')}>Cancelamentos</button>
                                <button style={{ relatoriosTransitions, background: relatoriosVisible ? '#ce8f00' : '' }} onClick={() => navigateTo('/venda')}>Produtos</button>
                            </animated.div>
                        ) : null
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'left' }}>

                    <animated.button
                        style={{ cadastroTransitions, background: cadastroVisible ? 'brown' : '' }}
                        onClick={handleCadastroClick}
                    >
                        Cadastro
                    </animated.button>
                </div>
                <div style={{ display: cadastroVisible ? 'block' : 'none' }}>
                    {cadastroTransitions((styles, item) =>
                        item ? (
                            <animated.div style={styles} key={item}>
                                <button style={{ cadastroTransitions, background: cadastroVisible ? 'brown' : '' }} onClick={() => navigateTo('/cadastroprodutos')}>Produto</button>
                                <button style={{ cadastroTransitions, background: cadastroVisible ? 'brown' : '' }} onClick={() => navigateTo('/cadastrocolaborador')}>Funcionario</button>
                                <button style={{ cadastroTransitions, background: cadastroVisible ? 'brown' : '' }} onClick={() => navigateTo('/cadastroclientes')}>Cliente</button>
                                <button style={{ cadastroTransitions, background: cadastroVisible ? 'brown' : '' }} onClick={() => navigateTo('/cadastropromo')}>Promoções</button>
                                <button style={{ cadastroTransitions, background: cadastroVisible ? 'brown' : '' }} onClick={() => navigateTo('/cadastroficha')}>Ficha Tecnica</button>
                            </animated.div>
                        ) : null
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'left' }}>

                    <animated.button
                        style={{ estatisticasTransitions, background: estatisticas ? 'green' : '' }}
                        onClick={handleEstatisticas}
                    >
                        Estatisticas
                    </animated.button>
                </div>
                <div style={{ display: estatisticas ? 'block' : 'none' }}>
                    {estatisticasTransitions((styles, item) =>
                        item ? (
                            <animated.div style={styles} key={item}>
                                <button style={{ estatisticasTransitions, background: estatisticas ? 'green' : '' }} onClick={() => navigateTo('/')}>Produtividade</button>
                                <button style={{ estatisticasTransitions, background: estatisticas ? 'green' : '' }} onClick={() => navigateTo('/')}>Pesquisa</button>
                                <button style={{ estatisticasTransitions, background: estatisticas ? 'green' : '' }} onClick={() => navigateTo('/')}>Novos Clientes</button>
                                <button style={{ estatisticasTransitions, background: estatisticas ? 'green' : '' }} onClick={() => navigateTo('/')}>Campanhas</button>
                                <button style={{ estatisticasTransitions, background: estatisticas ? 'green' : '' }} onClick={() => navigateTo('/')}>Avaliações</button>
                            </animated.div>
                        ) : null
                    )}
                </div>
            </div>
        </>
    );
};

export default PainelLateral;
