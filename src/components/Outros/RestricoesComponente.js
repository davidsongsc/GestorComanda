import React, { useState } from 'react';
import './restricoesEstilo.css';
import restricoesPredefinidas from '../Sistema/Restricoes';

const initialState = {
    usuario: '',
    nivel: 'basico',
    posto: '',
    auth: false,
    restricoes: {
        area_rLoja: false,
        area_rBar: false,
        area_rDelivery: false,
        area_rGiral: false,
        area_rExterna: false,
        area_rRecepcao: false,
        abrirMesa: false,
        loginSistema: false,
        loginSistema: false,
        loginSistemaSempreOn: false,
        loginSistemaAdm: false,
        loginSistemaCozinha: false,
        loginSistemaRecepcao: false,
        loginSistemaManutencao: false,
        imprimirMesa: false,
        mesaComandarItem: false,

        r_cadastrarFila: false,
        r_cadastrarClienteFila: false,
        r_chamarClienteFila: false,
        r_cadastrarCliente: false,
        r_alterarCliente: false,
        r_alterarFila: false,
        r_cadastrarPrioridade: false,

        c_caixa_cancelamento: false,
        c_caixa_receber: false,
        c_caixa_desconto: false,
        c_caixa_cobrar: false,
        c_comanda_alterarGorjeta: false,
        c_comanda_RemoverGorjeta: false,
        c_caixa_operador: false,
        c_caixa_fecharCaixa: false,
        c_caixa_abrirCaixa: false,
        c_caixa_gavetaCaixa: false,
        c_caixa_retiradaCaixa: false,
        c_cadastrar_entregador: false,


        m_ComandaTransfere: false,
        m_ComandaDivide: false,
        m_AreaComandaTransfere: false,
        m_iniciarOperacao: false,
        m_controleIluminacao: false,
        m_controleVentilacao: false,
        m_controleAcessos: false,
        m_visualizarCameras: false,

        g_controleCameras: false,
        g_cadastrarColaborador: false,
        g_caixa_operador: false,
        g_comandaZeradaCancelar: false,
        g_comandaCancelamento: false,
        g_maitre_abrirMesa: false,
        g_comanda_maitre: false,
        g_caixa_remover_desconto: false

    },
    carregandoRestricoes: true,
    erroRestricoes: null
};

const groupByPrefix = (restricoes) => {

    const grupos = {
        geral: {}
    };

    Object.keys(restricoes).forEach(restricao => {
        const prefixo = restricao.split('_')[0];
        if (['g', 'm', 'c', 'area', 'r'].includes(prefixo)) {
            if (!grupos[prefixo]) {
                grupos[prefixo] = {};
            }
            grupos[prefixo][restricao] = restricoes[restricao];
        } else {
            grupos.geral[restricao] = restricoes[restricao];
        }
    });

    return grupos;
};

const RestricoesComponente = () => {
    const [state, setState] = useState(initialState);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setState(prevState => ({
            ...prevState,
            restricoes: {
                ...prevState.restricoes,
                [name]: checked
            }
        }));
    };

    const handleNivelChange = (event) => {
        const selectedNivel = event.target.value;
        setState(prevState => ({
            ...prevState,
            nivel: selectedNivel,
            restricoes: selectedNivel === 'personalizada' ? { ...prevState.restricoes } : { ...restricoesPredefinidas[selectedNivel] }
        }));
    };

    const gruposRestricoes = groupByPrefix(state.restricoes);

    return (
        <div className="funcionario-container">
            <h2>Informações do Colaborador</h2>
            <div className="informacoes-colaborador">
                <div>
                    <label>
                        Nome:
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        E-mail:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Telefone:
                        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    </label>
                </div>
            </div>

            <h2>Restrições do Funcionário</h2>
            <div className="nivel-acesso">
                <label>
                    Nível de Acesso:
                    <select value={state.nivel} onChange={handleNivelChange}>
                        <option value="freelancer">FreeLancer</option>
                        <option value="contratado">Treinamento</option>
                        <option value="atendente">Efetivo</option>
                        <option value="caixa">Caixa</option>
                        <option value="gerente">Gestor</option>
                        <option value="personalizada">Personalizada</option>
                    </select>
                </label>
            </div>

            {Object.keys(gruposRestricoes).map((grupoKey) => (
                <div key={grupoKey} className="restricoes-grupo">
                    <h3>{grupoKey === 'geral' ? 'Geral' : grupoKey.toUpperCase()}</h3>
                    <div className="restricoes">
                        {Object.keys(gruposRestricoes[grupoKey]).map((restricao) => (
                            <div key={restricao} className="restricao-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        name={restricao}
                                        checked={state.restricoes[restricao]}
                                        onChange={handleCheckboxChange}
                                        disabled={state.nivel !== 'personalizada'}
                                    />
                                    {restricao}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

    );
};

export default RestricoesComponente;
