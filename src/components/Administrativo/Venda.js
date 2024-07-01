import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PieChart from '../Comanda/PieChart';
import PainelLateral from './PainelLateral';
import { setNotification } from '../../features/notification/notificationSlice';
import { useSelector } from 'react-redux';

const Caixa = ({ socket }) => {
  const [relatorios, setRelatorios] = useState([]);
  const [totalValores, setTotalValores] = useState(0);
  const [nomesFrequentes, setNomesFrequentes] = useState([]);
  const [estado, setEstado] = useState(1);
  const [produtosFrequentes, setProdutosFrequentes] = useState([]);
  const [relatoriosClassificados, setRelatoriosClassificados] = useState([]);
  const [dadosPieChart, setDadosPieChart] = useState([]);
  const [itens, setItens] = useState([]);
  const [inventario, setInventario] = useState([]);
  const atendente = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleNotification = (text) => {
    setNotification(text);
  };

  useEffect(() => {
    if (!atendente.posto.startsWith('g')) {
      handleNotification('Usuario não identificado como gestor, Acesso restringido a ' + atendente.usuario + '. Area restrita aos administradores. ');
      navigate('/'); // Redireciona para a página de erro ou qualquer outra página desejada

    } else {
      consultarRelatorios();
      socket.on('vendas_encontrados', handleRelatoriosEncontrados);

      return () => {
        socket.off('vendas_encontrados', handleRelatoriosEncontrados);
      };
    }
  }, []);
  const handleProdutosGraficos = () => {
    setEstado(1);
  }
  const handleVendedoresGraficos = () => {
    setEstado(0);
  }
  useEffect(() => {
    // Recupera os dados do localStorage
    const savedProdutos = localStorage.getItem('produtos');
    const savedInventario = localStorage.getItem('inventario');

    // Verifica se existem dados salvos
    if (savedProdutos && savedInventario) {
      const parsedProdutos = JSON.parse(savedProdutos);
      const parsedInventario = JSON.parse(savedInventario);

      // Atualiza os estados com os dados salvos
      setItens(parsedProdutos);
      setInventario(parsedInventario);
      setEstado(1);
    } else {
      // Se não houver dados salvos, faz a requisição e salva os dados no localStorage
      fetchData();
    }
  }, []);

  useEffect(() => {
    calcularTotalValores();
    encontrarNomesFrequentes();
    classificarRelatorios();

  }, [relatorios]);
  useEffect(() => {
    // ...

    encontrarNomesFrequentes();
    encontrarProdutosFrequentes();
    // ...
  }, [relatorios]);

  useEffect(() => {
    // ...
    if (estado === 0) {
      setDadosPieChart(nomesFrequentes.map(([nome, totalValores]) => ({
        nome,
        totalValores: totalValores < 0 ? 0 : totalValores
      })));
    } else if (estado === 1) {
      setDadosPieChart(produtosFrequentes.map(([nome, totalValores]) => ({
        nome,
        totalValores: totalValores < 0 ? 0 : totalValores
      })));
    } else {
      setDadosPieChart(nomesFrequentes.map(([nome, totalValores]) => ({
        nome,
        totalValores: totalValores < 0 ? 0 : totalValores
      })));
    }
    console.log(dadosPieChart);
    // ...
  }, [relatorios]);
  

  const nomeProdutos = (produto_id) => {


    const xal = inventario ? inventario.filter(d => d.produto_id === produto_id) : [];
    if (xal.length > 0 && xal[0].nomeproduto) {
      return (<>
        {`${xal[0].nomeproduto}`}</>)

    }

    else {
      return produto_id
    }

  }
  const nomeProduto = (produto_id) => {
    const val = itens ? itens.filter(o => o.id === produto_id) : [];
    if (produto_id === 30 || produto_id === 31 || produto_id === 33) {
      if (val.length > 0 && val[0].nomeproduto) {
        return ''
      }

    }
    else if (val.length > 0 && val[0].nomeproduto) {
      return val[0].nomeproduto
    }
    else {
      return (<td className={`ndd obs`}>
        {nomeProdutos(produto_id)}
      </td>)
    }
  }
  const consultarRelatorios = () => {
    socket.emit('consultar_venda', socket.id);
  };

  const handleRelatoriosEncontrados = (data) => {
    setRelatorios(data.venda);
  };

  const calcularTotalValores = () => {
    console.log(relatorios);
    const valoresNumericos = relatorios.filter(relatorio => !isNaN(parseFloat(relatorio.valor * relatorio.qtd)));
    const total = valoresNumericos.reduce((acc, relatorio) => acc + parseFloat(relatorio.valor * relatorio.qtd), 0);
    setTotalValores(total.toLocaleString(undefined, { minimumFractionDigits: 2 }));
  };
  
  
  const encontrarNomesFrequentes = () => {
    const nomes = {};
    relatorios.forEach((relatorio) => {
      const valor = parseFloat(relatorio.valor);
      const valorAtribuido = valor < 0 ? 0 : valor;
  
      if (nomes[relatorio.operador]) {
        nomes[relatorio.operador].totalValores += (valorAtribuido*relatorio.qtd);
        nomes[relatorio.operador].frequencia++;
      } else {
        nomes[relatorio.operador] = {
          totalValores: valorAtribuido,
          frequencia: 1,
        };
      }
    });
  
    const nomesOrdenados = Object.entries(nomes).sort((a, b) => b[1].frequencia - a[1].frequencia);
    setNomesFrequentes(nomesOrdenados);
  };
  

  const encontrarProdutosFrequentes = () => {
    const nomes = {};
    relatorios.forEach((relatorio) => {
      const valor = parseFloat(relatorio.valor);
      const valorAtribuido = valor < 0 ? 0 : valor;
  
      const nomeProdutoRelatorio = nomeProduto(relatorio.produto);
      if (nomes[nomeProdutoRelatorio]) {
        nomes[nomeProdutoRelatorio].totalValores += valorAtribuido;
        nomes[nomeProdutoRelatorio].frequencia++;
      } else {
        nomes[nomeProdutoRelatorio] = {
          totalValores: valorAtribuido,
          frequencia: 1,
        };
      }
    });
  
    const nomesOrdenados = Object.entries(nomes).sort((a, b) => b[1].frequencia - a[1].frequencia);
    setProdutosFrequentes(nomesOrdenados);
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


  const handleSistema = () => {
    navigate('/');
  }
  const handleRelatorios = () => {
    navigate('/gestor');
  }
  return (
    <>
      <PainelLateral  />
      <div className="relatorios-container">
        <div />
        <div className="painel-container">
          <h1>Vendas Abertas</h1>
          <div style={{
            maxHeight: '47vh',
            overflowY: 'auto',
          }}>
            <table >
              <thead >
                <tr>
                  <th className='pnconfg-table-th'>Funcionario</th>
                  <th className='pnconfg-table-th'>Vendas</th>
                  <th className='pnconfg-table-th'>Valor Total</th>


                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='pnconfg-table-td'>Loja</td>
                  <td className='pnconfg-table-td'> ... </td>
                  <td className='pnconfg-table-td'>R$ {totalValores}</td>
                </tr>
                <tr>
                  <td className='pnconfg-table-td'>Bar</td>
                  <td className='pnconfg-table-td'> ... </td>
                  <td className='pnconfg-table-td'>R$ 0</td>
                </tr>
                <tr>
                  <td className='pnconfg-table-td'>Giral</td>
                  <td className='pnconfg-table-td'> ... </td>
                  <td className='pnconfg-table-td'>R$ 0</td>
                </tr>
                <tr>
                  <td className='pnconfg-table-td'>Externa</td>
                  <td className='pnconfg-table-td'> ... </td>
                  <td className='pnconfg-table-td'>R$ 0</td>
                </tr>
                <tr>
                  <td className='pnconfg-table-td'>Delivery</td>
                  <td className='pnconfg-table-td'> ... </td>
                  <td className='pnconfg-table-td'>R$ 0</td>
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
          <h1>Grafico</h1>

          <PieChart dados={dadosPieChart} />
          <div style={{ margin: '0px', background: 'white', padding: '1px 0px' }}>
            <button onClick={handleProdutosGraficos}>Produtos</button>
            <button onClick={handleVendedoresGraficos}>Vendedores</button>
          </div>

        </div>
        <div>
          <h1>Relação Itens lançados</h1>
          <div style={{
            maxHeight: '80vh',
            overflowY: 'auto',
          }} className="painel-vendas">

            <table  >
              <thead>
                <tr >
                  <th className='pnconfg-table-th'>Produto</th>
                  <th className='pnconfg-table-th'>Valor</th>
                  <th className='pnconfg-table-th'>Comanda</th>
                  <th className='pnconfg-table-th'>Vendedor</th>
                  <th className='pnconfg-table-th'>Data/Hora</th>


                </tr>
              </thead>
              <tbody>
                {relatoriosClassificados
                  .filter((relatorio) => relatorio.valor > 1)
                  .reverse()
                  .map((relatorio) => (
                    <tr key={relatorio.id}>
                      <td style={{ position: 'relative', zIndex: '1', textTransform: 'uppercase'}}>{nomeProduto(relatorio.produto)}</td>
                      <td>R$ {(relatorio.valor*relatorio.qtd)}</td>
                      <td>{relatorio.comanda}</td>
                      <td>{relatorio.operador}</td>
                      <td>{relatorio.datahora}</td>
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

Caixa.propTypes = {
  socket: PropTypes.object.isRequired,
  atendente: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default Caixa;
