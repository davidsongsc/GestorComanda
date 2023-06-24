import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PieChart from './PieChart';
import PainelLateral from './PainelLateral';
import ServerStatus from './ServerStatus';

const Relatorios = ({ socket, atendente, setNotification }) => {
  const [relatorios, setRelatorios] = useState([]);
  const [totalValores, setTotalValores] = useState(0);
  const [nomesFrequentes, setNomesFrequentes] = useState([]);
  const [relatoriosClassificados, setRelatoriosClassificados] = useState([]);
  const [dadosPieChart, setDadosPieChart] = useState([]);

  const navigate = useNavigate();
  const handleNotification = (text) => {
    setNotification(text);
  };

  useEffect(() => {
    if (!atendente.auth.startsWith('g')) {
      handleNotification('Usuario não identificado como gestor, Acesso restringido a ' + atendente.usuario + '. Area restrita aos administradores. ');
      navigate('/'); // Redireciona para a página de erro ou qualquer outra página desejada

    } else {
      consultarRelatorios();
      socket.on('relatorios_encontrados', handleRelatoriosEncontrados);

      return () => {
        socket.off('relatorios_encontrados', handleRelatoriosEncontrados);
      };
    }
  }, []);

  useEffect(() => {
    calcularTotalValores();
    encontrarNomesFrequentes();
    classificarRelatorios();
  }, [relatorios]);


  const consultarRelatorios = () => {
    socket.emit('consultar_relatorios');
  };

  const handleRelatoriosEncontrados = (data) => {
    setRelatorios(data.relatorios);
  };

  const calcularTotalValores = () => {
    const valoresNumericos = relatorios.filter(relatorio => !isNaN(parseFloat(relatorio.valor)));
    const total = valoresNumericos.reduce((acc, relatorio) => acc + parseFloat(relatorio.valor), 0);
    setTotalValores(total.toLocaleString(undefined, { minimumFractionDigits: 2 }));
  };

  const encontrarNomesFrequentes = () => {
    const nomes = {};
    relatorios.forEach((relatorio) => {
      if (nomes[relatorio.responsavel]) {
        nomes[relatorio.responsavel].totalValores += parseFloat(relatorio.valor);
        nomes[relatorio.responsavel].frequencia++;
      } else {
        nomes[relatorio.responsavel] = {
          totalValores: parseFloat(relatorio.valor),
          frequencia: 1,
        };
      }
    });

    const nomesOrdenados = Object.entries(nomes).sort((a, b) => b[1].frequencia - a[1].frequencia);
    setNomesFrequentes(nomesOrdenados);
  };

  const classificarRelatorios = () => {
    const relatoriosOrdenados = [...relatorios].sort((a, b) => {
      // Personalize a lógica de classificação com base nos critérios desejados
      if (a.tipo_relatorio < b.tipo_relatorio) {
        return -1;
      } else if (a.tipo_relatorio > b.tipo_relatorio) {
        return 1;
      } else {
        return 0;
      }
    });

    setRelatoriosClassificados(relatoriosOrdenados);
  };
  useEffect(() => {
    // ...

    encontrarNomesFrequentes();

    // ...
  }, [relatorios]);

  useEffect(() => {
    // ...

    setDadosPieChart(nomesFrequentes.map(([nome, totalValores]) => ({
      nome,
      totalValores
    })));
    console.log(dadosPieChart);
    // ...
  }, [nomesFrequentes]);
  const handleSistema = () => {
    navigate('/');
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
        <div className="painel-container">
          <h1>Dados Sistema</h1>
          <ServerStatus setNotification={handleNotification} />
          <h1>Informação</h1>
          <div style={{
            maxHeight: '39vh',
            overflowY: 'auto',
          }}>
            <table>
              <thead>
                <tr>
                  <th>Responsavel</th>
                  <th>Frequencia</th>
                  <th>Valor</th>


                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ background: 'brown', fontWeight: '800', textTransform: 'uppercase' }}>Loja</td>
                  <td style={{ background: 'brown', fontWeight: '800' }}> ... </td>
                  <td style={{ background: 'red', fontWeight: '800' }}>R$ {totalValores}</td>
                </tr>
                {nomesFrequentes.map(([nome, { totalValores, frequencia }]) => (
                  <tr key={nome}>
                    <td>{nome} </td>
                    <td>{frequencia}</td>
                    <td>R$ {totalValores.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        <div className="painel-dados">
          <h1>Cancelamentos</h1>
          <PieChart dados={dadosPieChart} />
          <h1>Dados</h1>
          <div style={{
            maxHeight: '60vh',
            overflowY: 'auto',
          }} className="painel-vendas">
            <table>
              <thead>
                <tr>
                  <th>Valor</th>
                  <th>Responsável</th>
                  <th>Data/Hora</th>
                  <th>Ocorrência</th>
                  <th>Texto</th>

                </tr>
              </thead>
              <tbody>
                {relatoriosClassificados.map((relatorio) => (
                  <tr key={relatorio.id}>
                    <td>R$  {relatorio.valor}</td>
                    <td>{relatorio.responsavel}</td>
                    <td>{relatorio.data_hora}</td>
                    <td>{relatorio.ocorrencia}</td>
                    <td>{relatorio.texto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

};

Relatorios.propTypes = {
  socket: PropTypes.object.isRequired,
  atendente: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default Relatorios;
