import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PainelLateral from '../Administrativo/PainelLateral';
import ProdutoImagem from './ProdutoImagem';
import { useSelector } from 'react-redux';
import { setNotification } from '../../features/notification/notificationSlice';

const nomeSistema = 'maquina';
const token = 'abc123';
const ipNucleo = 'http://192.168.1.50:5000';

const CadastroProduto = () => {
    const [grupo, setGrupo] = useState([]);
    const [valor, setValor] = useState('');
    const [idProduto, setIdProduto] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [ficha, setFicha] = useState('');
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');
    const [senha, setSenha] = useState('');
    const [staff, setStaff] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const atendente = useSelector(state => state.user);
    const [opcoes, setOpcoes] = useState({
        principal: false,
        executivo: false,
        extra: false,
    });
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

    const handleOpcaoChangeR = (event) => {
        setOpcaoSelecionada(event.target.value);
    };
    const handleOpcaoChange = (event) => {
        const { name, checked } = event.target;
        setOpcoes((prevOpcoes) => ({
            ...prevOpcoes,
            [name]: checked,
        }));
    };
    //console.log(filtrarPorGrupo)
    useEffect(() => {

        fetch(`${ipNucleo}/grupos?nome=${nomeSistema}&token=${token}&version=100a`)
            .then(response => response.json())
            .then(data => {
                const grupoArray = data.grupos.filter(comad => comad.grupoc === 1);

                setGrupo(grupoArray.map(listaGrupo => (
                    {
                        nome: listaGrupo.nome,
                        id: listaGrupo.estilo
                    }
                )
                ));
            })
            .catch(error => console.error(error));


    }, [nomeSistema, token]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        // Aqui você pode adicionar a lógica para enviar os dados do colaborador para o backend

        // Limpar os campos do formulário após o envio
        setNomeProduto('');
        setEmail('');
        setCargo('');
    };

    const navigate = useNavigate();
    const handleNotification = (text) => {
        setNotification(text);
    };

    useEffect(() => {
        if (!atendente.posto.startsWith('g')) {
            handleNotification('Usuario não identificado como gestor, Acesso restringido a ' + atendente.usuario + '. Area restrita aos administradores. ');
            navigate('/'); // Redireciona para a página de erro ou qualquer outra página desejada

        }

    }, []);


    const handleSistema = () => {
        navigate('/');
    }

    const handleGestor = () => {
        navigate('/gestor');
    }
    const handleVendas = () => {
        navigate('/venda');
    }
    const handleCadastroFuncionario = () => {
        navigate('/cadastrocolaborador');

    }
    return (
        <>
            <PainelLateral atendente={atendente} setNotification={setNotification} />
            <div className="relatorios-container">
                <div style={{
                    maxHeight: '80vh',
                    overflowY: 'auto',

                }} />
                <div style={{
                    width: '480px'
                }} className="painel-container">
                    <h1>Cadastro Produtos</h1>
                    <div className='div-cont-dados'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h2>Tipo:</h2>
                                <select value={selectedOption} onChange={handleOptionChange}>
                                    <option value="">Selecione...</option>
                                    {grupo.map((item, index) => (
                                        <option key={index} value={item.nome}>{item.nome}</option>

                                    ))}

                                </select>
                                {selectedOption && (
                                    <div>
                                        <label htmlFor="lb-id">ID:</label>
                                        <input
                                            type="text"
                                            id="lb-id"
                                            placeholder='F Tirinhas'
                                            value={idProduto}
                                            onChange={(event) => setIdProduto(event.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                                {idProduto && (
                                    <div>
                                        <label htmlFor="lb-nome">Nome:</label>
                                        <input
                                            type="text"
                                            id="lb-nome"
                                            placeholder='Tirinhas de Frango'
                                            value={nomeProduto}
                                            onChange={(event) => setNomeProduto(event.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                                {nomeProduto && (
                                    <div>
                                        <label htmlFor="lb-nome">Valor:</label>
                                        <input
                                            type="text"
                                            id="lb-nome"
                                            placeholder='10,95'
                                            value={valor}
                                            onChange={(event) => setValor(event.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                                <div className='cadastro-produtos-vc'>
                                    {valor && (
                                        <div>
                                            <h2>Visualização:</h2>
                                            <div className="checkbox-container">
                                                <input
                                                    className="checkbox-input"
                                                    type="checkbox"
                                                    name="opcao1"
                                                    id="checkbox1"
                                                    checked={opcoes.opcao1}
                                                    onChange={handleOpcaoChange}
                                                />
                                                <label className="checkbox-label" htmlFor="checkbox1">Cardapio Loja</label>
                                            </div>
                                            <div className="checkbox-container">
                                                <input
                                                    className="checkbox-input"
                                                    type="checkbox"
                                                    name="opcao2"
                                                    checked={opcoes.opcao2}
                                                    onChange={handleOpcaoChange}
                                                />
                                                <label className="checkbox-label">Cardapio Delivery</label>
                                            </div>
                                            <div className="checkbox-container">
                                                <input
                                                    className="checkbox-input"
                                                    type="checkbox"
                                                    name="opcao3"
                                                    checked={opcoes.opcao3}
                                                    onChange={handleOpcaoChange}
                                                    disabled
                                                />
                                                <label className="checkbox-label">Cardapio Sistema</label>
                                            </div>
                                        </div>
                                    )}

                                    {valor && (
                                        <div>
                                            <h2>Cardapio:</h2>
                                            <div className="radio-container">
                                                <input
                                                    className="radio-input"
                                                    type="radio"
                                                    name="opcao"
                                                    value="principal"
                                                    checked={opcaoSelecionada === 'principal'}
                                                    onChange={handleOpcaoChangeR}
                                                />
                                                <label className="radio-label">Cardapio Principal</label>
                                            </div>
                                            <div className="radio-container">
                                                <input
                                                    className="radio-input"
                                                    type="radio"
                                                    name="opcao"
                                                    value="executivo"
                                                    checked={opcaoSelecionada === 'executivo'}
                                                    onChange={handleOpcaoChangeR}
                                                />
                                                <label className="radio-label">Almoço Executivo</label>
                                            </div>
                                            <div className="radio-container">
                                                <input
                                                    className="radio-input"
                                                    type="radio"
                                                    name="opcao"
                                                    value="extra"
                                                    checked={opcaoSelecionada === 'extra'}
                                                    onChange={handleOpcaoChangeR}
                                                    disabled
                                                />
                                                <label className="radio-label">ADD EXTRA</label>
                                            </div>
                                        </div>
                                    )}

                                </div>
                                {valor && (
                                    <ProdutoImagem />
                                )}
                            </div>


                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                </div>
                <div className="painel-container">
                    <h1>Produtos Cadastrados</h1>
                    <div style={{
                        maxHeight: '47vh',
                        overflowY: 'auto'
                    }}>
                        <table>
                            <thead>
                                <tr>
                                    <th className='pnconfg-table-th'>Nome</th>
                                    <th className='pnconfg-table-th'>Setor</th>
                                    <th className='pnconfg-table-th'>Equipe</th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='pnconfg-table-td'>Crécio da Silva</td>
                                    <td className='pnconfg-table-td'> Operacional </td>
                                    <td className='pnconfg-table-td'> Limpeza</td>
                                </tr>
                                <tr>
                                    <td className='pnconfg-table-td'>Helton Andrade</td>
                                    <td className='pnconfg-table-td'> Operacional </td>
                                    <td className='pnconfg-table-td'> Garçom</td>
                                </tr>
                                <tr>
                                    <td className='pnconfg-table-td'>Monique Esteves</td>
                                    <td className='pnconfg-table-td'> Estratégia </td>
                                    <td className='pnconfg-table-td'> Gerencia</td>
                                </tr>
                                <tr>
                                    <td className='pnconfg-table-td'>Bruna Monica</td>
                                    <td className='pnconfg-table-td'> Operacional </td>
                                    <td className='pnconfg-table-td'> Bartender</td>
                                </tr>
                                {/*nomesFrequentes.map(([nome, { totalValores, frequencia }]) => (
                                    <tr key={nome}>
                                        <td>{nome} </td>
                                        <td>{frequencia}</td>
                                        <td>R$ {totalValores.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                ))*/}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>

            <div className="painel-dados">
                <h1>Dados</h1>
                <div style={{
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }} className="painel-vendas">

                </div>
            </div>

        </>
    );

};

CadastroProduto.propTypes = {
    socket: PropTypes.object.isRequired,
    atendente: PropTypes.object.isRequired,
    setNotification: PropTypes.func.isRequired,
};

export default CadastroProduto;
