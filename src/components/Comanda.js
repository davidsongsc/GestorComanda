
//  O import de react inclui funções que são usadas no componente, como useState, useRef e useEffect.

// useParams é um hook do react-router-dom usado para obter parâmetros de rota, como o ID da mesa na qual a comanda é exibida.

//  Modal é um componente de terceiros usado para exibir um menu de opções.

// GORJETA, TX e DESCONTO são constantes que definem os valores de gorjeta, taxa e desconto que serão aplicados à conta.

// Comanda é o componente principal que representa a comanda. Ele usa vários hooks para gerenciar o estado do componente, como useState para gerenciar os itens da comanda, useRef para obter uma referência à lista de itens e useEffect para carregar os dados da API.

// A função carregarComanda é uma função auxiliar que é usada pelo useEffect para carregar os dados da API. Ele usa o fetch para carregar dados de três endpoints diferentes.

// toggleModal é uma função que é chamada quando o usuário clica no botão de opções. Ele alterna o valor de showModal, que é usado para exibir ou ocultar o modal.

// handleScrollUp e handleScrollDown são funções que são chamadas quando o usuário clica nas setas para cima ou para baixo na lista de itens. Eles usam a referência à lista obtida com useRef para rolar a lista para cima ou para baixo.

//  handleClick é uma função que é chamada quando o usuário clica em um botão no menu. Ele redireciona o usuário para a página inicial ou exibe um alerta se o botão de conta ou caixa for clicado.

//  nomeProdutos é uma função auxiliar que é usada para obter o nome de um produto a partir do ID do produto. Ele procura o produto no inventário e retorna o nome do produto se encontrado, ou o ID do produto se não encontrado.

//  nomeProduto é uma função auxiliar que é usada para obter o nome de um produto a partir do ID do produto. Ele procura o produto na lista de itens e retorna o nome do produto se encontrado, ou chama nomeProdutos se não encontrado.

// adicionarItem é uma função que é chamada quando o usuário clica em um item na lista de itens. Ele adiciona o item à lista de itens da comanda ou aumenta a quantidade do item se já estiver presente na lista.



import './comanda.css';
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import InventarioOption from './InventarioOption';
import InventarioGrupo from './InventarioGrupo';

Modal.setAppElement("#root");
const GORJETA = 0.10;
const TX = 0;
const DESCONTO = 0;

function Comanda({ mesas }) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const navigation = useNavigate();
  const listaRef = useRef(null);
  const nome = 'maquina'
  const token = 'abc123'
  const [itens, setItens] = useState([]);
  const [mesa, setMesa] = useState(mesas);
  const [comandaid, setComandaID] = useState([]);
  const [atendente, setAtendente] = useState([]);
  const [comanda, setComanda] = useState([]);
  const [tipoItem, setTipoItem] = useState();
  const [inventario, setInventario] = useState();

  useEffect(() => {
    function carregarComanda() {

      fetch(`https://dagesico.pythonanywhere.com/comandas?nome=${nome}&token=${token}&versi  on=100a`)
      //fetch(`http://192.168.0.50:5000/comandas?nome=${nome}&token=${token}&versi  on=100a`)
        .then(response => response.json())
        .then(data => {
          const comandaMesa = data.filter(comad => comad.mesa === parseInt(id));

          comandaMesa.map(listaComanda => (

            setMesa(listaComanda.mesa),
            setComanda(listaComanda.itens[0].map(item => ({ ...item, })))

          ));
        })
        .catch(error => console.error(error));

      fetch(`https://dagesico.pythonanywhere.com/produtos?nome=${nome}&token=${token}&version=100a`)
        .then(response => response.json())
        .then(data => {
          setItens(data.produtos);
          localStorage.setItem('produtos', JSON.stringify(data.produtos));
        })
        .catch(error => console.error(error));

      fetch(`https://dagesico.pythonanywhere.com/inventario?nome=${nome}&token=${token}&version=100a`)
        .then(response => response.json())
        .then(data => {
          setInventario(data.inventario);
          localStorage.setItem('inventario', JSON.stringify(data.inventario));
        })
        .catch(error => console.error(error));
    }

    carregarComanda();
  }, [id, nome, token]);

  // Pagina Options On/Off 
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Itens Menu Seta ↓
  const handleScrollUp = () => {
    listaRef.current.scrollBy({
      top: -470,
      behavior: 'smooth'
    });
  };

  // Itens Menu Seta ↑
  const handleScrollDown = () => {
    listaRef.current.scrollBy({
      top: 470,
      behavior: 'smooth'
    });
  };

  // Click Botão Menu
  const handleClick = (id) => {
    if (id === 'fechar') {
      navigation(`/`);
    } else if (id === 'conta') {
      alert('Imprimindo Conta...')
      navigation(`/`);
    } else if (id === 'caixa') {
      alert('Imprimindo Conta...')
      navigation(`/`);
    } else {

      navigation(`/`);
    }

  }
  // carregar itens da API


  // demais códigos de renderização e manipulação de estado
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

  const adicionarItem = (item, t) => {

    const itemExistente = itens.find((i) => i.nome === item.nomeproduto);

    if (itemExistente) {

      setComanda(
        comanda.map((i) =>
          i.nome === item.nomeproduto ? { ...item, qtd: i.qtd + 1 } : i
        )
      );
    } else {
      setComanda([...comanda, { ...item, qtd: 1, produto_id: item.id }]);

      if (item.grupoc === 1) {
        setTipoItem(1)
        toggleModal()
      }
      else if (item.grupoc === 2) {
        setTipoItem(2)
        toggleModal()
      }
      else if (item.grupoc === 3) {
        setTipoItem(3)
        toggleModal()
      }
      else if (item.grupoc === 4) {
        setTipoItem(4)
        toggleModal()
      }
      else if (item.grupoc === 5) {
        setTipoItem(5)
        toggleModal()
      }
      else if (item.grupoc === 6) {
        setTipoItem(6)
        toggleModal()
      }
      else if (item.grupoc === 7) {
        setTipoItem(7)
        toggleModal()
      }
      else if (item.grupoc === 8) {
        setTipoItem(8)
        toggleModal()
      }
      else if (item.grupoc === 9) {
        setTipoItem(9)
        toggleModal()
      }


    }
  };
 
  const calcularTotal = () => {
    return comanda.reduce((total, item) => total + item.valor * item.qtd, 0);
  };
  const calcularGorjeta = () => {
    return calcularTotal() * GORJETA
  }
  const calcularTaxa = () => {
    return calcularTotal() * TX
  }
  const calcularDesconto = () => {
    return -DESCONTO
  }
  const calcularConta = () => {
    return calcularTotal() + calcularGorjeta() - calcularDesconto() + calcularTaxa()
  }


  function filtrarPorGrupo(grupo) {
    setGrupoSelecionado(grupo);
  }

  function mostrarTodos() {
    setGrupoSelecionado(null);
  }

  let itensFiltrados = itens;
  if (grupoSelecionado !== null) {
    itensFiltrados = itens.filter((item) => item.grupo === grupoSelecionado);
  }



  return (

    <div className="comanda">

      <div className="itens">
        <table>
          <thead>
            <tr className='titulo-tb'>
              <td>COMANDA: {mesa}</td>
              <td>ID: {comandaid}</td>
              <td>GORJETA: R${calcularGorjeta().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td>ATENDENTE: {atendente}</td>
              <td>CONTA: {calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

            </tr>
          </thead>
        </table>
        <div className='minventario'>

          <div className='inventario'>
            <ul ref={listaRef} style={{ height: '483px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
              {itensFiltrados.map((item, index) => (
                <li key={index}>
                  <button className={`GPX${item.grupo}`} onClick={() => adicionarItem(item)}>{item.nomeproduto}</button>
                </li>
              ))}
            </ul>

            <div>
              <button onClick={handleScrollUp}>↑</button>
              <button onClick={handleScrollDown}>↓</button>

            </div>

          </div>



        </div>
        <InventarioGrupo mostrarTodos={mostrarTodos} filtrarPorGrupo={filtrarPorGrupo} />
        <div className='container-controles-main'>

          <div className="controles">

            <div className='controle'>
              <div className='operadores'>
                <button onClick={() => handleClick('conta')} className='A'>IMPRIMIR</button>
                <button className='B'>COZINHA</button>
                <button onClick={() => handleClick('fechar')} className='B'>FECHAR</button>
                <button onClick={() => handleClick('caixa')} className='I' >CAIXA</button>
                <button onClick={() => handleClick('fechar')} className='F' disabled> </button>
              </div>

              <div className='operadores'>
                <button onClick={() => handleClick('fechar')} className='B'>EXTRA</button>

                <button onClick={() => handleClick('fechar')} className='F' disabled> </button>
                <button onClick={() => handleClick('fechar')} className='F' disabled> </button>
                <button onClick={() => handleClick('fechar')} className='F' disabled> </button>
                <button onClick={() => handleClick('fechar')} className='F' disabled> </button>
              </div>
              <div className='operadores'>
                <button onClick={() => handleClick('fechar')} className='F' disabled> </button>
                <button onClick={() => handleClick('fechar')} className='F' disabled> </button>
                <button onClick={() => handleClick('fechar')} className='D' disabled>OBS</button>
                <button onClick={() => handleClick('fechar')} className='D' disabled>PEDIDO</button>
                <button onClick={() => handleClick('fechar')} className='D' disabled>COMANDA</button>
              </div>
              <div className='operadores'>

                <button onClick={() => handleClick('fechar')} className='C' disabled>DESCONTO</button>
                <button onClick={() => handleClick('fechar')} className='F' disabled> </button>
                <button onClick={() => handleClick('fechar')} className='D' disabled>ATENDENTE</button>
                <button onClick={() => handleClick('fechar')} className='D' disabled>CONTA</button>
                <button onClick={() => handleClick('fechar')} className='D' disabled>GORJETA</button>

              </div>
              <div className='operadores'>
                <button onClick={() => handleClick('O.K.')} className='H' >O.K.</button>
                <button onClick={() => handleClick('fechar')} className='F' disabled> </button>
                <button onClick={() => handleClick('fechar')} className='D' disabled>PRODUTO</button>
                <button onClick={() => handleClick('fechar')} className='D' disabled>MESA</button>
                <button onClick={() => handleClick('fechar')} className='E' disabled>ALTERAR</button>


              </div>


            </div>
            <div className='controle'>
              <div className='digitos'>
                <div className='g1'>
                  <button>1</button>
                  <button>2</button>
                  <button>3</button>
                </div>
                <div className='g1'>
                  <button>4</button>
                  <button>5</button>
                  <button>6</button>
                </div>
                <div className='g1'>
                  <button>7</button>
                  <button>8</button>
                  <button>9</button>
                </div>
                <div className='g1'>
                  <button>A</button>
                  <button>0</button>
                  <button >C</button>
                </div>
                <div className='g1'>
                  <button onClick={() => handleClick('fechar')} className='T' disabled>D</button>
                  <button onClick={() => handleClick('fechar')} className='T' disabled>E</button>
                  <button onClick={() => handleClick('fechar')} className='T' disabled>F</button>
                </div>
              </div>
            </div>
            <div>
              <div className='totais'>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="comandar">


        <div style={{ height: '950px', overflow: 'auto' }}>
          <table>
            <thead>
              <tr className='titulo-tb'>
                <td >QTD</td>

                <td>PRODUTO</td>

                <td>V UND</td>
                <td>V TOTAL</td>
                <td></td>

              </tr>
            </thead>
            <tbody>





              {comanda.map((item, index) => (
                <>
                  <tr key={index} className='linhas-tb'>
                    <td className='itemNormalB' style={item.qtd !== 0 ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>
                      {item.combinac === 0 ? item.qtd : '▲'}
                    </td>



                    {item.combinac === 0 ? (
                      <td className={`ndd ${item.combinac !== 0 ? 'obs' : 'itemNormal'}`}> {nomeProduto(item.produto_id)}
                      </td>) : <td className={`ndd ${item.combinac !== 0 ? 'obs' : 'itemNormal'}`}>
                      {nomeProdutos(item.produto_id)}
                    </td>}

                    <Modal isOpen={showModal} >
                      <h1>{nomeProduto(item.produto_id)}</h1>
                      <InventarioOption opt={item.grupoc} opx={item.combinac} itens={inventario} listaRef={listaRef} adicionarItem={adicionarItem} scrollTop={scrollTop} handleScrollUp={handleScrollUp} handleScrollDown={handleScrollDown} />
                      <button onClick={()=> toggleModal()}>O.K.</button>
                    </Modal>
                    <td className='itemNormalB'>
                      {item.valor !== 0 ? item.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'Error no valor...' : ''}<br />

                    </td>
                    <td className='itemNormalB' style={{ fontSize: '25px', fontWeight: '700', color: 'goldenrod' }}>
                      {item.valor !== 0 ? (item.valor * item.qtd)?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'Valor não definido' : ''}

                    </td>
                    <td className='idd'>0</td>

                  </tr>
                </>
              ))}


            </tbody>

          </table>


        </div>

      </div>


    </div>
  );
}

export default Comanda;