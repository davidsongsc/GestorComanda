import './comanda.css';
import React, { useState, useRef, useEffect } from 'react';
import InventarioGrupo from './InventarioGrupo';
import AlertaPersonalizado from '../Sistema/AlertaPersonalizado';
import PagamentoForm from './Pagamento';
import TelaOption from './TelaOption';

const TX = 0;
const limiteOptionsCardapio = 55;
const nome = 'maquina';
const token = 'abc123';
//const ipNucleo = 'https://dagesico.pythonanywhere.com;'
const ipNucleo = 'http://192.168.0.50:5000';

const usuarioError = [{
  "titulo": "Impressora!",
  "mensagem": "Por favor Aguarde! ...",
  "btn1": "OK",
  "fnb1": "",
  "btn2": "fechar",
  "fnb2": ""
}]

function Comanda({

  handleGorjeta,
  handleDeletarComanda,
  atendente,
  setCaixaStatus,
  mesaId,
  handleSairLogin,
  handleEmitStatus,
  setNotification,
  handleShowModalMesa,
  handleComandaItens,
  handleDeletarItem }) {

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
  const tbodyRef = useRef(null);


  const handleMostrarFormulario = () => {
    if (
      (atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))) ||
      (atendente.auth.startsWith('j') && /^\d+$/.test(atendente.auth.slice(1)))
    ) {
      setMostrarFormulario(true);
    }
    else {
      handleNotification(`Usuário ${atendente.usuario} não pode receber pagamentos na comanda!`);
    }
  };

  const handleSelectItem = (index) => {
    const isSelected = selectedItems.includes(index);
    if ((atendente.auth.startsWith('j') && /^\d+$/.test(atendente.auth.slice(1))) ||
      (atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1)))) {
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

  const handleNotification = (text) => {
    setNotification(text);
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

  useEffect(() => {

    function carregarComanda() {

      fetch(`${ipNucleo}/comandas?nome=${nome}&token=${token}`)
        .then(response => response.json())
        .then(data => {
          const comandaMesa = data.filter(comad => comad.mesa === parseInt(mesaId));

          comandaMesa.map(listaComanda => (

            // eslint-disable-next-line no-sequences
            setMesa(listaComanda.mesa),
            setUsuario(listaComanda.operador),
            setGorjeta(listaComanda.gorjeta),
            setComanda(listaComanda.itens[0].map(item => ({ ...item, status: 0 })))

          ));

        })
        .catch(error => console.error(error));

      //setComanda(clManad[0].itens[0].map(item => ({ ...item, })))
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
    setGorjeta(0);
    handleNotification('Gorjeta alterada ');
    handleGorjeta(mesaId, 0)
  };

  const adicionarGorjeta = (valor) => {
    if ((atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1)))) {
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
      handleEmitStatus(mesa, 3);
      handleUpInsert();
      handleSairLogin();
    } else if (id === 'conta') {
      handleNotification('Imprimindo conferência mesa: ' + mesa);
      handleEmitStatus(mesa, 5);
      handleUpInsert();
      handleSairLogin();

    } else if (id === 'fechar') {
      handleFecharComanda();
      handleEmitStatus(mesa, 3);
      handleSairLogin();


    } else if (id === 'cancelar') {
      if ((atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))) ||
        (atendente.auth.startsWith('j') && /^\d+$/.test(atendente.auth.slice(1)))) {

        handleNotification('Comanda encerrada');
        handleDelComanda(mesaId, calcularConta().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

        window.location.reload();
      } else {
        handleNotification('Usuario ' + atendente.usuario + ' não pode finalizar a comanda!');
      }


    }
    else if (id === 'finalizarcontarecebida') {
      if ((atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))) ||
        (atendente.auth.startsWith('j') && /^\d+$/.test(atendente.auth.slice(1)))) {

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
      if (
        (atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))) ||
        (atendente.auth.startsWith('j') && /^\d+$/.test(atendente.auth.slice(1)))
      ) {

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
        handleNotification(`Usuário ${atendente.usuario} não pode finalizar a comanda!`);
      }
      console.log(valorSelecionado, contaAtual, valorDescontos)
    } else if (id === 'remover') {
      if ((atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))) ||
        (atendente.auth.startsWith('j') && /^\d+$/.test(atendente.auth.slice(1)))) {

        if (selectedItems.length === 1) {
          setSelectCodeDelete(null);
          setSelectedItemId(null);
          removerItem();
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
    const itemExistente = itens.find((i) => i.nome === item.nomeproduto);
    const numeros = [];

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
  const removerItem = () => {

    if (atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))) {
      // Filtra as linhas que não estão selecionadas
      const novaComanda = comanda.filter((_, i) => !selectedItems.includes(i));
      // Atualiza o estado da comanda com as linhas restantes

      if (selectCombinaG > 899) {
        //aqui
        setComanda(novaComanda);

        handleDelItem({
          "comanda": mesaId,
          "produto": handleComandaFilter(selectedItemId, comanda),
          "nomesis": nomeProdutoSis(handleComandaFilter(selectedItemId, comanda)),
          "atendente": atendente.usuario,
          "valor": valorProduto(handleComandaFilter(selectedItemId, comanda)),
          "anotacoes": handleComandaFilter(selectedItemId, comanda),
        });
        setCombinaG(null);
      }
      else {
        handleNotification('Este produto não pode ser removido!')
      }

      // Limpa as seleções
      setSelectedItems([]);
    }
  };

  const isCaixaValido = (atendente) =>
    (atendente.auth.startsWith('j')) &&
    /^\d+$/.test(atendente.auth.slice(1));

  const isGerenteValido = (atendente) =>
    (atendente.auth.startsWith('g') || atendente.auth.startsWith('j')) &&
    /^\d+$/.test(atendente.auth.slice(1));

  const isGestorValido = (atendente) =>
    (atendente.auth.startsWith('g')) &&
    /^\d+$/.test(atendente.auth.slice(1));

  const buttons = [
    { label: 'O.K.', handleClick: () => handleClick('O.K.'), className: 'H' },
    { label: 'IMPRIMIR', handleClick: () => handleClick('conta'), className: 'A' },

    {
      label: 'Receber',
      handleClick: handleMostrarFormulario,
      className: isGerenteValido(atendente) ? 'A' : 'C',
      disabled: isGerenteValido(atendente) ? false : true,
      visualizar: isGerenteValido(atendente) ? 'block' : 'none',
    },
    {
      label: 'Desconto',
      handleClick: () => handleClick('desconto'),
      className: isGestorValido(atendente) ? 'A' : 'C',
      disabled: isGestorValido(atendente) ? false : true,
      visualizar: isGerenteValido(atendente) ? 'block' : 'none',
    },
    {
      label: 'CANCELAR',
      handleClick: () => handleClick('cancelar'),
      className: isGestorValido(atendente) ? 'A' : 'C',
      disabled: isGestorValido(atendente) ? false : true,
      visualizar: isGerenteValido(atendente) ? 'block' : 'none',
    },
    {
      label: 'CAIXA',
      handleClick: handleMostrarCaixaStatus,
      className: isCaixaValido(atendente) ? 'A' : 'C',
      disabled: isCaixaValido(atendente) ? false : true,
      visualizar: isGerenteValido(atendente) ? 'block' : 'none',

    },
    { label: 'COZINHA', className: 'B' },
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
    { label: 'Dividir Conta', handleClick: () => handleClick('fechar'), className: 'F', disabled: true },
    { label: 'Juntar Conta', handleClick: () => handleClick('fechar'), className: 'F', disabled: true },
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
                    <button className={`GPX${item.grupo}`} onClick={() => adicionarItem(item)}>
                      {item.nomeproduto}
                    </button>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
        <div className='controlea'>
          <div className='digitosComanda'>
            <div className='g2'>
              <button onClick={() => handleTeclado(1)}>1</button>
              <button onClick={() => handleTeclado(2)}>2</button>
              <button onClick={() => handleTeclado(3)}>3</button>
            </div>
            <div className='g2'>
              <button onClick={() => handleTeclado(4)}>4</button>
              <button onClick={() => handleTeclado(5)}>5</button>
              <button onClick={() => handleTeclado(6)}>6</button>
            </div>
            <div className='g2'>
              <button onClick={() => handleTeclado(7)}>7</button>
              <button onClick={() => handleTeclado(8)}>8</button>
              <button onClick={() => handleTeclado(9)}>9</button>
            </div>
            <div className='g2'>
              <button onClick={() => handleTeclado('A')}>A</button>
              <button onClick={() => handleTeclado(0)}>0</button>
              <button onClick={() => handleTeclado('B')}>B</button>
            </div>
          </div>
        </div>
        <div className='controleb'>
          <div className='operadores'>{renderizarBotoes()}</div>
        </div>
        <table className='tabela-fixa'>
          <thead>
            <tr className='titulo-tb'>
              <td className='titulo-table'>ATENDIMENTO</td>
              <td className='titulo-table'>TOTAL</td>
              <td className='titulo-table'>MESA</td>
              <td className='titulo-table'>CONSUMO</td>
              <td className='titulo-table' style={{ opacity: calcularPagamento() != 0 ? '1' : '0' }}>Pago</td>
              <td className='titulo-table' style={{ opacity: calcularGorjeta() != 0 ? '1' : '0' }}>GORJETA</td>
              <td className='titulo-table' style={{ opacity: calcularDesconto() != 0 ? '1' : '0' }}>DESCONTOS</td>

              <td className='titulo-table' style={{ opacity: calcularPagamento() != 0 ? '1' : '0' }}>Falta</td>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='linha-table' style={{ backgroundColor: 'white', color: 'black', borderRadius: '13px', width: '305px', textTransform: 'capitalize', fontSize: '27px', fontWeight: '800', boxshadow: 'inset 0px 4px 5px 4px' }}>
                <em>{usuario}</em>
              </td>
              <td className='linha-table' style={{ backgroundColor: 'rgb(193 107 50)', fontWeight: 900, fontSize: '30px' }}>
                R$ {calcularContaMostrar().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>

              <td className='linha-table' style={{ backgroundColor: 'white', color: 'black', borderRadius: '35px', width: '205px', fontSize: '65px', fontWeight: '800', boxshadow: 'inset 0px 4px 5px 4px' }}>
                {mesa}
              </td>
              <td className='linha-table' style={{ backgroundColor: 'rgb(114 97 86)' }}>
                {calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className='linha-table' style={{ backgroundColor: 'rgb(193 107 50)', opacity: calcularPagamento() != 0 ? '1' : '0' }}>
                R$ {calcularPagamento().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className='linha-table' style={{ opacity: calcularGorjeta() != 0 ? '1' : '0', fontWeight: '800' }} >R$ {calcularGorjeta().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className='linha-table' style={{ backgroundColor: '#8f2020', opacity: calcularDesconto() != 0 ? '1' : '0' }}>
                {calcularDesconto().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>



              <td className='linha-table' style={{ backgroundColor: '#8f2020', opacity: calcularPagamento() != 0 ? '1' : '0' }}>
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