import './comanda.css';
import React, { useState, useRef, useEffect } from 'react';
import InventarioGrupo from './InventarioGrupo';
import AlertaPersonalizado from '../Sistema/AlertaPersonalizado';
import PagamentoForm from './Pagamento';
import TelaOption from './TelaOption';
import { useDispatch } from 'react-redux';

import ControleDigitosComanda from '../PagePainel/ControleDigitosComanda';
import { ipNucleo, usuarioError, TX, limiteOptionsCardapio, nome, token, options } from '../principal/ExtensoesApi';
import removerItem from './extra_comandas/C_removeritem';
import { useSelector } from 'react-redux';
import { setNotification } from '../../features/notification/notificationSlice';


function Comanda({
  displayVisualizando,
  handleGorjeta,
  handleDeletarComanda,
  setCaixaStatus,
  mesaId,
  handleSairLogin,
  handleEmitStatus,
  handleShowModalMesa,
  handleComandaItens,
  handleDeletarItem }) {
  const dispatch = useDispatch();
  const atendente = useSelector(state => state.user);
  const atendentes = useSelector(state => state.atendentes.listaUsuarios);

  // eslint-disable-next-line no-unused-vars
  const [tipoAlertaId, setTipoAlertaId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [scrollTop, setScrollTop] = useState(0);
  const [grupoSelecionado, setGrupoSelecionado] = useState(6615);
  const listaRef = useRef(null);
  const [itens, setItens] = useState([]);
  const [mesa, setMesa] = useState();
  // eslint-disable-next-line no-unused-vars
  const [grupo, setGrupo] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [areaActive, setActive] = useState(false);
  const [comanda, setComanda] = useState([]);
  const [inventario, setInventario] = useState();
  const [teclado, setTeclado] = useState(1);
  const [mostrarInventario, setMostrarInventario] = useState(false);
  const [mostrarInventario2, setMostrarInventario2] = useState(false);
  const [GORJETA, setGorjeta] = useState(0);
  const [pagamento, setPagamento] = useState(0);
  const [grupoCompain, setGrupoCompain] = useState(0);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectCodeDelete, setSelectCodeDelete] = useState(null);
  const [selectCombinaG, setCombinaG] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarFormularioConfirm, setMostrarFormularioConfirm] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValueUser, setSelectedValueUser] = useState('');
  const [mudarAtendenteComanda, setMudarAtendimento] = useState(false);
  const [botaoMudarAtendenteComanda, setBotaoMudarAtendimento] = useState(true);
  const [mudarAreaComanda, setMudarArea] = useState(false);
  const [botaoMudarAreaComanda, setBotaoMudarArea] = useState(true);

  const tbodyRef = useRef(null);
  //ADICIONAR SOCKET PARA MUDAR ATENDENTE NO BANCO DE DADOS
  const handleMudarAtendimento = () => {
    setUsuario(selectedValueUser);
    setMudarAtendimento(!mudarAtendenteComanda);
    setBotaoMudarAtendimento(!botaoMudarAtendenteComanda);

  }
  const handleNotification = (text) => {
    dispatch(setNotification({ text: text }));
  };

  const handleMudarArea = () => {

    setMudarArea(!mudarAreaComanda);
    setBotaoMudarArea(!botaoMudarAreaComanda);

  }

  const optionsAtendente = atendentes.map((atendente, index) => ({
    value: index,
    label: atendente,
  }));

  const optionElements = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  const optionElementsAtendimento = optionsAtendente.map((user) => {
    if (user.value === usuario) {
      return (
        <option key={user.value} value={user.label}>
          {user.label}
        </option>

      );
    } else {
      return (
        <option key={user.value} value={user.label}>
          {usuario} → {user.label}
        </option>
      );
    }
  });

  const handleMostrarFormulario = () => {
    if (atendente.restricoes.c_caixa_cobrar) {
      setMostrarFormulario(true);
      handleEmitStatus(mesaId, 4);
    }
    else {
      handleNotification(`Usuário ${atendente.usuario} não pode receber pagamentos na comanda!`);
    }
  };

  const handleSelectItem = (index) => {
    const isSelected = selectedItems.includes(index);
    if ((atendente.posto.startsWith('j') && /^\d+$/.test(atendente.posto.slice(1))) ||
      (atendente.posto.startsWith('g') && /^\d+$/.test(atendente.posto.slice(1)))) {
      if (!isSelected) {
        // Caso contrário, adicione o item ao array de selecionadoss
        setSelectedItems([...selectedItems, index]);
        setSelectCodeDelete(null);
        setSelectedItemId(comanda[index].id); // Define o ID do item selecionado
        setCombinaG(comanda[index].combinag);

      } else {
        handleClick('remover');
        // Se estiver selecionado, remova o item do array de selecionados
        setSelectedItems(selectedItems.filter((item) => item !== index));
        setSelectedItemId(comanda[index].id); // Define o ID do item selecionado
        setSelectCodeDelete(comanda[index].combinag);
        setMostrarFormularioConfirm(false);
        setCombinaG(comanda[index].combinag);

      }
    }
  };


  const handleDelComanda = (comanda, valor) => {
    handleDeletarComanda(comanda, valor);
  }
  const handleDelItem = (item) => {
    handleDeletarItem(item);
  }
  const handleUpInsert = () => {
    handleComandaItens(comanda, mesaId);
  }
  const handleMostrarCaixaStatus = () => {
    setCaixaStatus(true);
    handleEmitStatus(mesa, 4);
  }

  const handleDisponibilidade = (id, disponibilidade, quantidade) => {
    if (disponibilidade && disponibilidade === 0) {
      return (
        <>

        </>
      )
    }
    else if (disponibilidade && disponibilidade === 1) {
      return (
        <>
        </>
      )
    } else if (disponibilidade && disponibilidade === 2) {
      return (
        <text style={{ fontWeight: '900' }}>
          {quantidade}
        </text>
      )
    }
  }
  useEffect(() => {
    function carregarComanda() {


      fetch(`${ipNucleo}/comandas?nome=${nome}&token=${token}`)
        .then(response => response.json())
        .then(data => {
          const comandaMesa = data.filter(comad => comad.mesa === parseInt(mesaId));

          comandaMesa.map(listaComanda => {


            setMesa(listaComanda.mesa);
            setUsuario(listaComanda.operador);
            setGorjeta(listaComanda.gorjeta);
            setComanda(listaComanda.itens[0].map(item => ({ ...item, status: 0 })));
          });

        })
        .catch(error => console.error(error));

      fetch(`${ipNucleo}/produtos?nome=${nome}&token=${token}&version=100a`)
        .then(response => response.json())
        .then(data => {
          setItens(data.produtos);
          localStorage.setItem('produtos', JSON.stringify(data.produtos));
        })
        .catch(error => console.error(error));

      fetch(`${ipNucleo}/inventario?nome=${nome}&token=${token}&version=100a`)
        .then(response => response.json())
        .then(data => {
          setInventario(data.inventario);
          localStorage.setItem('inventario', JSON.stringify(data.inventario));
        })
        .catch(error => console.error(error));

    }

    carregarComanda();
  }, [mesaId]);


  function handleFecharAlerta() {
    setMostrarAlerta(false);
  };

  const handleFecharComanda = () => {
    handleShowModalMesa();
  };
  // Pagina Options On/Off 
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const removerGorjeta = () => {
    if (atendente.restricoes.c_comanda_RemoverGorjeta) {
      setGorjeta(0);
      handleNotification(atendente.usuario + ' modificou a gorjeta da mesa ' + mesaId + ' para R$ 0.');
      handleGorjeta(mesaId, 0)
    }
    else {
      handleNotification('usuario não tem permissão para remover gorjeta.');
    }
  };

  const adicionarGorjeta = (valor) => {
    if (atendente.restricoes.c_comanda_alterarGorjeta) {
      if (valor === 10) {
        setGorjeta(0.10);
        handleGorjeta(mesaId, 0.10)
        handleNotification(atendente.usuario + ' modificou a gorjeta da mesa ' + mesaId + ' para ' + valor + '%.');
      } else if (valor === 11) {
        setGorjeta(0.11)
        handleGorjeta(mesaId, 0.11)
        handleNotification(atendente.usuario + ' modificou a gorjeta da mesa ' + mesaId + ' para ' + valor + '%.');
      } else if (valor === 12) {
        setGorjeta(0.12)
        handleGorjeta(mesaId, 0.12)
        handleNotification(atendente.usuario + ' modificou a gorjeta da mesa ' + mesaId + ' para ' + valor + '%.');
      }


    }
    else {
      handleNotification('Usuario: ' + atendente.usuario + ' sem privilégios para modificar a gorjeta da mesa ' + mesaId + '.')
    }

  };
  const handleClickMostrar = () => {
    if (areaActive === false) {
      setActive(true)
    }
    else {
      setActive(false)
    }
  };

  const handleComandaFilter = (id, lista) => {
    return parseInt(
      lista
        .filter(item => item.id === id)
        .map(item => item.produto_id)
        .join(", ")
    );
  };

  const handleTeclado = (tecla) => {

    if (tecla === 0) {
      setTeclado(1)
    }
    else {
      setTeclado(tecla)
    }
  }

  const calcularValorSelecionado = () => {
    let valorTotal = 0;

    selectedItems.forEach((selectedIndex) => {
      const selectedItem = comanda[selectedIndex];
      if (selectedItem) {

        var d = selectedItem.combinac;
        if (d === 1) {
          //
        } else if (d === 2) {
          //
        } else {
          const itemValor = selectedItem.valor * selectedItem.qtd;
          valorTotal += itemValor;
        }
      };
    });

    return valorTotal;
  };

  const calcularPagamento = () => {
    let total = 0;

    comanda.forEach(item => {
      if (item.combinag === 900) {
        total += item.valor;
      } else if (item.combinag === 2) {
        setPagamento(prevPagamento => prevPagamento + item.valor);
      };

    });

    return total;
  };

  const calcularGorjeta = () => {
    return calcularTotal() * GORJETA;
  };

  const calcularTaxa = () => {
    return calcularTotal() * TX;
  };

  const calcularDesconto = () => {
    let total = 0;

    comanda.forEach(item => {
      if (item.combinag === 999) {
        total += item.valor;
      }
    });

    return total;
  };

  const calcularContaMostrar = () => {
    return (calcularTotal() + calcularGorjeta() + calcularTaxa() + calcularDesconto()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const calcularConta = () => {
    return (calcularTotal() + calcularGorjeta() + calcularTaxa() + calcularDesconto() - calcularPagamento()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calcularContaPaga = () => {
    return (calcularTotal() + calcularGorjeta() + calcularDesconto() + calcularTaxa() - calcularPagamento()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calcularValorRestante = () => {
    const valorPago = calcularContaPaga(); // Implemente a função para calcular o valor total pago até agora
    return valorPago.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };


  const handleClick = (id) => {

    if (id === 'O.K.') {
      handleFecharComanda();
      if (displayVisualizando === 4) {
        handleEmitStatus(mesa, 2);
      } else {
        handleEmitStatus(mesa, 3);
      }

      handleUpInsert();

      if (atendente.restricoes.loginSistemaSempreOn) {
        handleSairLogin();
      } else {
        handleSairLogin('true');
      }
    } else if (id === 'conta') {
      if (atendente.restricoes.loginSistemaSempreOn) {
        handleNotification('Imprimindo conferência mesa: ' + mesa);
        handleEmitStatus(mesa, 5);
        handleUpInsert();
        handleSairLogin();
      }
      else {
        handleNotification('Não é possivel imprimir: ' + mesa);

      }

    } else if (id === 'fechar') {
      handleFecharComanda();
      handleEmitStatus(mesa, 3);
      handleSairLogin();


    } else if (id === 'cancelar') {
      if (atendente.restricoes.c_caixa_cancelamento) {
        handleDelComanda(mesaId, calcularConta().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        handleEmitStatus(mesa, 3);
        handleNotification('Comanda encerrada');
        window.location.reload();
      } else {
        handleNotification('Usuario ' + atendente.usuario + ' não pode finalizar a comanda!');
      }


    }
    else if (id === 'finalizarcontarecebida') {
      if (atendente.restricoes.c_caixa_receber) {

        handleNotification('Comanda Finalizada.');
        handleDelComanda(mesaId, calcularConta().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

        window.location.reload();
      } else {
        handleNotification('Usuario ' + atendente.usuario + ' não pode finalizar a comanda!');
      }

    }
    else if (id === 'desconto') {
      const valorSelecionado = parseFloat(calcularValorSelecionado().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.'));
      const contaAtual = parseFloat(calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.'));
      const valorDescontos = Math.abs(calcularDesconto().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.'));
      const abc = valorDescontos + valorSelecionado;
      if (atendente.restricoes.c_caixa_desconto) {

        if (contaAtual >= valorSelecionado) {
          if (abc <= contaAtual) {
            handleNotification(`${atendente.usuario} concedeu desconto de R$ ${valorSelecionado} para comanda ${mesaId}`);
            adicionarItem(
              {
                avaliacao: 0,
                combinac: 1,
                combinag: 999,
                descricao: 0,
                disponibilidade: 0,
                grupo: 0,
                grupoc: 0,
                id: 999,
                listaid: 4,
                nomefantasia: null,
                nomeproduto: null,
                produto_id: 999,
                push: 0,
                qtd: 0,
                status: 1,
                valor: -valorSelecionado,
              },
              'M'
            );
          } else {
            handleNotification(`${atendente.usuario} a conta não possui valores minimos para desconto.`);
          }

        }
      } else {
        handleNotification(`Usuário ${atendente.usuario} não pode solicitar desconto a comanda!`);
      }
      console.log(valorSelecionado, contaAtual, valorDescontos)
    } else if (id === 'remover') {
      if (atendente.restricoes.g_caixa_remover_desconto) {

        if (selectedItems.length === 1) {
          setSelectCodeDelete(null);
          setSelectedItemId(null);
          removerItem(atendente,
            mesaId,
            selectedItemId,
            comanda,
            setSelectedItems,
            setComanda,
            selectedItems,
            selectCombinaG,
            handleNotification,
            handleDelItem,
            handleComandaFilter,
            nomeProdutoSis,
            valorProduto,
            setCombinaG
          );

          handleNotification('Item removido da comanda!');
        }

      } else {
        handleNotification('Usuario ' + atendente.usuario + ' não pode finalizar a comanda!');
      }

    }
  };

  // demais códigos de renderização e manipulação de estado
  const nomeProdutos = (produto_id) => {


    const xal = inventario ? inventario.filter(d => d.id === produto_id) : [];
    if (xal.length > 0 && xal[0].nomeproduto) {
      return (<>
        {`${xal[0].nomeproduto}`}</>)

    }

    else {
      return produto_id
    }

  };

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
  };

  const nomeProdutoSis = (produto_id) => {
    const val = inventario ? inventario.filter(o => o.id === produto_id) : [];

    if (produto_id === 30 || produto_id === 31 || produto_id === 33) {
      if (val.length > 0 && val[0].nomeproduto) {
        return ''; // Retorna uma string vazia
      }
    } else if (val.length > 0 && val[0].nomeproduto) {
      return val[0].nomeproduto; // Retorna o valor de val[0].nomeproduto
    } else {
      return nomeProdutos(produto_id); // Retorna o valor da função nomeProdutos
    }
  };

  const valorProduto = (produto_id) => {
    const val = comanda ? comanda.filter(o => o.produto_id === produto_id) : [];

    if (produto_id === 30 || produto_id === 31 || produto_id === 33) {
      if (val.length > 0 && val[0].valor) {
        return ''; // Retorna uma string vazia
      }
    } else if (val.length > 0 && val[0].valor) {
      return val[0].valor; // Retorna o valor de val[0].nomeproduto
    } else {
      return val[0].valor; // Retorna o valor da função nomeProdutos
    }
  };

  const handleMostrarFormularioConfirm = () => {
    return mostrarFormularioConfirm;
  };

  const adicionarItem = (item, t) => {
    if (atendente.restricoes.mesaComandarItem) {

      const itemExistente = itens.find((i) => i.nome === item.nomeproduto);
      const numeros = [];
      handleEmitStatus(mesaId, 1);
      for (let i = 1; i <= limiteOptionsCardapio; i++) {
        numeros.push(i);
      }
      if (itemExistente) {
        setComanda((comanda) =>
          [comanda.map((i) =>
            i.nome === item.nomeproduto ? { ...item, qtd: i.qtd + 1, status: 0 } : i
          )]
        );

      } else {
        setComanda((comanda) => [
          ...comanda,
          { ...item, qtd: parseInt(teclado), produto_id: item.id, status: 1 },
        ]);

      }

    }
    else {
      handleNotification('Lançamentos não autorizados.');
    }

    handleNotification(item.nomeProduto);
    if (item.grupoc != 0) {
      setGrupoCompain(item.grupoc);
      toggleModal();
    }
  };

  const adicionarItemOption = (item, t) => {
    setMostrarInventario(false);
    setMostrarInventario2(false);
    setMostrarInventario2(false);
    const itemExistente = itens.find((i) => i.nome === item.nomeproduto);
    if (itemExistente) {
      setComanda(
        comanda.map((i) =>
          i.nome === item.nomeproduto ? { ...item, qtd: i.qtd + 1, status: 0 } : i
        )
      );
    } else {
      setComanda([...comanda, { ...item, qtd: parseInt(teclado), produto_id: item.id, status: 1 }]);
      if (item.grupoc === 2323)
        toggleModal()
    }
  };

  const calcularTotal = () => {
    let total = 0;

    comanda.forEach(item => {
      if (item.combinag < 100 && item.valor >= 0) {
        total += item.valor * item.qtd;
      }

    });

    return total;
  };

  useEffect(() => {
    scrollToBottom();
  }, [comanda]); // Certifique-se de substituir "comanda" pela variável correta que indica a matriz de itens


  const scrollToBottom = () => {
    if (tbodyRef.current) {
      const tbody = tbodyRef.current;
      const lastItem = tbody.lastElementChild;
      if (lastItem) {
        setTimeout(() => {
          lastItem.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  };

  function filtrarPorGrupo(grupo) {
    setGrupoSelecionado(grupo);
  };

  function mostrarTodos() {
    setGrupoSelecionado(null);
  };

  let itensFiltrados = itens;
  if (grupoSelecionado != null) {
    itensFiltrados = itens.filter((item) => item.grupo === grupoSelecionado);
  };

  // eslint-disable-next-line no-unused-vars

  const isCancelarValido = (atendente) =>
    (calcularTotal() == 0 && atendente.restricoes.g_comandaZeradaCancelar || atendente.restricoes.g_comandaCancelamento);

  const isCaixaValido = (atendente) =>
    (atendente.restricoes.c_caixa_operador);

  const isGerenteValido = (atendente) =>
    (atendente.restricoes.g_comanda_maitre);

  const IsReceberConta = (atendente) =>
    (atendente.restricoes.c_caixa_cobrar) && calcularTotal() > 0;

  const isGestorValido = (atendente) =>
    (atendente.restricoes.g_caixa_operador);

  const isTransferirAtendenteValido = (atendente) =>
    (atendente.restricoes.m_ComandaTransfere);

  const isDividirMesaValido = (atendente) =>
    (atendente.restricoes.m_ComandaDivide);

  const isTransferirAreaComandaValido = (atendente) =>
    (atendente.restricoes.m_AreaComandaTransfere);

  const IsImprimirValido = (atendente) =>
    (atendente.restricoes.imprimirMesa);

  const buttons = [
    { label: 'O.K.', handleClick: () => handleClick('O.K.'), className: 'H' },
    { label: 'IMPRIMIR', handleClick: () => handleClick('conta'), className: 'A', disabled: IsImprimirValido(atendente) ? false : true, visualizar: IsImprimirValido(atendente) ? 'block' : 'none' },

    {
      label: 'Receber',
      handleClick: handleMostrarFormulario,
      className: IsReceberConta(atendente) ? 'A' : 'C',
      disabled: IsReceberConta(atendente) ? false : true,
      visualizar: IsReceberConta(atendente) ? 'block' : 'none',
    },
    {
      label: 'Desconto',
      handleClick: () => handleClick('desconto'),
      className: IsReceberConta(atendente) ? 'A' : 'C',
      disabled: IsReceberConta(atendente) ? false : true,
      visualizar: IsReceberConta(atendente) ? 'block' : 'none',
    },
    {
      label: 'CANCELAR',
      handleClick: () => handleClick('cancelar'),
      className: isCancelarValido(atendente) ? 'A' : 'C',
      disabled: isCancelarValido(atendente) ? false : true,
      visualizar: isCancelarValido(atendente) ? 'block' : 'none',
    },
    {
      label: 'CAIXA',
      handleClick: handleMostrarCaixaStatus,
      className: isGestorValido(atendente) ? 'A' : 'C',
      disabled: isCaixaValido(atendente) ? false : true,
      visualizar: isGerenteValido(atendente) ? 'block' : 'none',
    },
    { label: 'COZINHA', className: 'B', visualizar: isGerenteValido(atendente) ? 'block' : 'none' },
    { label: 'FECHAR', handleClick: () => handleClick('fechar'), className: 'F' },
    {
      label: 'Zerar Gorjeta', handleClick: removerGorjeta,
      className: GORJETA === 0 ? 'A' : 'B',
      visualizar: isGerenteValido(atendente) ? 'block' : 'none',
    },
    {
      label: 'GORJETA 10%', handleClick: () => adicionarGorjeta(10),
      className: GORJETA === 0.10 ? 'A' : 'B'
    },
    {
      label: 'GORJETA 11%', handleClick: () => adicionarGorjeta(11),
      className: GORJETA === 0.11 ? 'A' : 'B'
    },
    {
      label: 'GORJETA 12%', handleClick: () => adicionarGorjeta(12),
      className: GORJETA === 0.12 ? 'A' : 'B'
    },
    {
      label: 'Remover', handleClick: () => handleClick('remover'),
      className: isCaixaValido(atendente) ? 'A' : 'C',
      disabled: isCaixaValido(atendente) ? false : true,
      visualizar: isCaixaValido(atendente) ? 'block' : 'none',
    },
    { label: 'Dividir Conta', handleClick: () => handleClick('fechar'), className: 'F', disabled: isDividirMesaValido(atendente) ? true : false, visualizar: isDividirMesaValido(atendente) ? 'block' : 'none' },
    { label: 'mudar area', handleClick: () => handleMudarArea(), className: mudarAreaComanda ? 'A' : 'C', disabled: isTransferirAreaComandaValido(atendente) ? false : true, visualizar: isTransferirAreaComandaValido(atendente) ? 'block' : 'none' },
    { label: 'mudar atendente', handleClick: () => handleMudarAtendimento(), className: botaoMudarAtendenteComanda ? 'A' : 'C', disabled: isTransferirAtendenteValido(atendente) ? false : true, visualizar: isTransferirAtendenteValido(atendente) ? 'block' : 'none' },
  ];

  function renderizarBotoes() {
    return buttons.map((button, index) => {
      if (button.className === '') return null;

      return (
        <button
          key={index}
          onClick={button.handleClick}
          className={button.className}
          disabled={button.disabled}
          style={{ display: button.visualizar }}
        >
          {button.label}
        </button>
      );
    });
  }

  const finalizarComanda = (pagamento, resta, verificador) => {

    let p = pagamento.replace(',', '.')
    let r = resta.replace(',', '.')

    if ((r - p) <= 0) {

      setMostrarFormularioConfirm(true);
      if (verificador === 1) {
        handleEmitStatus(mesaId, 6);
        handleClick('finalizarcontarecebida');
      }


    }

  }

  let telaOptionSistema;

  telaOptionSistema = (

    <TelaOption
      cmdComanda={comanda}
      showModal={showModal}
      toggleModal={setShowModal}
      itens={inventario}
      listaRef={listaRef}
      adicionarItem={adicionarItemOption}
      grupoCompain={grupoCompain}
    />
  )
  useEffect(() => {
    console.log('executado!')

  }, [showModal]);

  return (
    <div className='container-comanda fade-in' style={{ position: 'relative', top: '0px', left: '0%' }}>
      {mostrarAlerta && (
        <AlertaPersonalizado
          usuarioError={usuarioError}
          tipoAlertaId={tipoAlertaId}
          message={usuarioError[tipoAlertaId].mensagem}
          onClose={handleFecharAlerta}
          hAlerta={handleClickMostrar}
        />
      )}

      <div className="comandar">
        <div className='cm-comanda-pn'>
          <table className='menu-itens-catal'>
            <thead>
              <tr className='titulo-tb'>
                <td>QTD</td>
                <td>PRODUTO</td>
                <td>V UND</td>
                <td>V TOTAL</td>
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {comanda.map((item, index) => (
                <tr
                  key={index}
                  className={`linhas-tb ${selectedItems.includes(index) ? 'selected' : ''}`}
                  onClick={() => handleSelectItem(index)}
                >
                  <td
                    className="itemNormalB"
                    style={item.combinac === 0 ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}
                  >
                    {item.combinac === 0 ? item.qtd : '▲'}
                  </td>
                  <td className={`ndd ${item.combinac === 1 ? 'obs' : 'itemNormal'}`}>
                    {item.combinac === 0 ? nomeProduto(item.produto_id) : nomeProdutos(item.produto_id)}
                  </td>
                  <td className="itemNormalB" style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2px' }}>
                    {item.valor !== 0 ? item.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'Error no valor...' : ''}
                    <br />
                  </td>
                  <td className="itemNormalB" style={{ fontSize: '25px', fontWeight: '800', color: 'goldenrod', letterSpacing: '4px' }}>
                    {item.valor !== 0 ? (item.combinac === 2 ? (item.valor)?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : (item.valor * item.qtd)?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) ?? 'Valor não definido' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {telaOptionSistema}

        <InventarioGrupo
          mostrarTodos={mostrarTodos}
          filtrarPorGrupo={filtrarPorGrupo} />
        <div className='inventario'>
          <ul ref={listaRef} className='i-inventario'>
            {mostrarFormulario ? (
              <PagamentoForm
                handleMostrarFormularioConfirm={handleMostrarFormularioConfirm}
                finalizarComanda={finalizarComanda}
                setNotification={setNotification}
                setPagamento={setPagamento}
                calcularValorRestante={calcularValorRestante}
                calcularTotal={calcularTotal}
                adicionarItem={adicionarItem}

              />
            ) : (
              <>
                {itensFiltrados.map((item, index) => (
                  <li key={index}>
                    <div className='obs-produtos-inventario'>
                      <text style={{ position: 'absolute', margin: '2px 16px' }}>{handleDisponibilidade(item.id, item.disponibilidade, item.qtd)}</text>
                      <button className={`GPX${item.grupo}`} onClick={() => adicionarItem(item)}>
                        {item.nomeproduto}
                      </button>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
        <ControleDigitosComanda handleTeclado={handleTeclado} />

        <div className='controleb'>
          <div className='operadores'>
            {renderizarBotoes()}
          </div>
        </div>
        <table className='tabela-fixa'>
          <thead>
            <tr className='titulo-tb'>
              <td className='titulo-table'>{atendente.posto.startsWith('g') && /^\d+$/.test(atendente.posto.slice(1)) ?
                <select
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}

                >
                  {optionElements}
                </select> : 'mesa'}
              </td>
              <td className='titulo-table'>{atendente.posto.startsWith('g') && /^\d+$/.test(atendente.posto.slice(1)) ?
                <select
                  value={selectedValueUser}
                  onChange={(e) => setSelectedValueUser(e.target.value)}
                  disabled={mudarAtendenteComanda}
                >
                  {optionElementsAtendimento}
                </select> : 'atendimento'}</td>
              <td className='titulo-table'>TOTAL</td>


              <td className='titulo-table'>CONSUMO</td>
              <td className='titulo-table' style={{ opacity: calcularPagamento() != 0 ? '1' : '0' }}>Pago</td>
              <td className='titulo-table gorjeta-table' style={{ opacity: calcularGorjeta() != 0 ? '1' : '0' }}>GORJETA</td>
              <td className='titulo-table desconto-table' style={{ opacity: calcularDesconto() != 0 ? '1' : '0' }}>DESCONTOS</td>

              <td className='titulo-table pendente-table' style={{ opacity: calcularPagamento() != 0 ? '1' : '0' }}>PENDENTE</td>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='linha-table' style={{ backgroundColor: 'white', color: 'black', borderRadius: '35px', width: '205px', fontWeight: '800', boxshadow: 'inset 0px 4px 5px 4px' }}>
                {mesa}
              </td>
              <td className='linha-table' style={{ backgroundColor: 'white', color: 'black', borderRadius: '13px', width: '305px', textTransform: 'capitalize', fontWeight: '800', boxshadow: 'inset 0px 4px 5px 4px' }}>
                <em>{usuario}</em>
              </td>
              <td className='linha-table' style={{ backgroundColor: 'rgb(193 107 50)', fontWeight: 900, fontSize: '30px' }}>
                R$ {calcularContaMostrar().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>


              <td className='linha-table' style={{ backgroundColor: 'rgb(114 97 86)' }}>
                {calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className='linha-table' style={{ backgroundColor: 'rgb(193 107 50)', opacity: calcularPagamento() != 0 ? '1' : '0' }}>
                R$ {calcularPagamento().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className='linha-table gorjeta-table' style={{ opacity: calcularGorjeta() != 0 ? '1' : '0', fontWeight: '800' }} >R$ {calcularGorjeta().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className='linha-table desconto-table' style={{ backgroundColor: '#8f2020', opacity: calcularDesconto() != 0 ? '1' : '0' }}>
                {calcularDesconto().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>


              <td className='linha-table pendente-table' style={{ backgroundColor: '#8f2020', opacity: calcularPagamento() != 0 ? '1' : '0' }}>
                R$ {calcularContaPaga().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>


            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}



export default Comanda;