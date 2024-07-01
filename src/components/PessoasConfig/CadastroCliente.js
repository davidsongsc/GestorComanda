import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PainelLateral from '../Administrativo/PainelLateral';
import { setNotification } from '../../features/notification/notificationSlice';
import { useSelector } from 'react-redux';

const CadastroCliente = () => {
    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [snome, setSNome] = useState('');
    const [ficha, setFicha] = useState('');
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');
    const [senha, setSenha] = useState('');
    const [staff, setStaff] = useState(0);
    const atendente = useSelector(state => state.user);
    console.log(atendente);



    const handleSubmit = (event) => {
        event.preventDefault();

        // Aqui você pode adicionar a lógica para enviar os dados do colaborador para o backend

        // Limpar os campos do formulário após o envio
        setNome('');
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
                    <div style={{
                        maxHeight: '47vh',
                        overflowY: 'auto',
                    }}>
                        <h2>Cadastro de Colaborador</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="nome">Usuario:</label>
                                <input
                                    type="text"
                                    id="nome"
                                    value={nome}
                                    onChange={(event) => setNome(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="nome">Nome:</label>
                                <input
                                    type="text"
                                    id="nome"
                                    value={nome}
                                    onChange={(event) => setNome(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="nome">Sobrenome:</label>
                                <input
                                    type="text"
                                    id="nome"
                                    value={nome}
                                    onChange={(event) => setNome(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Nivel:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cargo">Cargo:</label>
                                <input
                                    type="text"
                                    id="cargo"
                                    value={cargo}
                                    onChange={(event) => setCargo(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cargo">Setor:</label>
                                <input
                                    type="text"
                                    id="cargo"
                                    value={cargo}
                                    onChange={(event) => setCargo(event.target.value)}
                                    required
                                />
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

CadastroCliente.propTypes = {
    socket: PropTypes.object.isRequired,
    atendente: PropTypes.object.isRequired,
    setNotification: PropTypes.func.isRequired,
};

export default CadastroCliente;
