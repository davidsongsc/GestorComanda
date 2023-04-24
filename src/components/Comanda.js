import './comanda.css';
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import InventarioOption from './InventarioOption';
import Inventario from './Inventario';
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

      //fetch(`https://dagesico.pythonanywhere.com/comandas?nome=${nome}&token=${token}&versi  on=100a`)
      fetch(`http://192.168.0.50:5000/comandas?nome=${nome}&token=${token}&versi  on=100a`)
        .then(response => response.json())
        .then(data => {
          const comandaMesa = data.filter(comad => comad.mesa === parseInt(id));

          comandaMesa.map(listaComanda => (

            setMesa(listaComanda.mesa),
            setComanda(listaComanda.itens[0].map(item => ({ ...item, })))

          ));
        })
        .catch(error => console.error(error));

      fetch(`http://192.168.0.50:5000/produtos?nome=${nome}&token=${token}&version=100a`)
        .then(response => response.json())
        .then(data => {
          setItens(data.produtos);
          localStorage.setItem('produtos', JSON.stringify(data.produtos));
        })
        .catch(error => console.error(error));

      fetch(`http://192.168.0.50:5000/inventario?nome=${nome}&token=${token}&version=100a`)
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


    const xal = inventario.filter(d => d.produto_id === produto_id)
    if (xal.length > 0 && xal[0].nomeproduto) {
      return (<>
        {`${xal[0].nomeproduto}`}<br />-----------------</>)

    }

    else {
      return produto_id
    }
  }

  const nomeProduto = (produto_id) => {

    const val = itens.filter(o => o.id === produto_id)
    if (produto_id === 30 || produto_id === 31) {
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

  const adicionarItem = (item) => {

    const itemExistente = itens.find((i) => i.nome === item.nomeproduto);

    if (itemExistente) {

      setComanda(
        comanda.map((i) =>
          i.nome === item.nomeproduto ? { ...item, qtd: i.qtd + 1 } : i
        )
      );
    } else {
      setComanda([...comanda, { ...item, qtd: 1, produto_id: item.id }]);
      console.log(item)
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

    }
  };
  const removerItem = (index) => {

    setComanda(comanda.filter((_, i) => i !== index));
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
              <td>MESA: {mesa}</td>
              <td>ID: {comandaid}</td>
              <td>GORJETA: R${calcularGorjeta().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td>ATENDENTE: {atendente}</td>
              <td>CONTA: {calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

            </tr>
          </thead>
        </table>
        <div className='minventario'>
          <Inventario itensFiltrados={itensFiltrados} listaRef={listaRef} adicionarItem={adicionarItem} scrollTop={scrollTop} handleScrollUp={handleScrollUp} handleScrollDown={handleScrollDown} />

          <InventarioGrupo mostrarTodos={mostrarTodos} filtrarPorGrupo={filtrarPorGrupo} />

        </div>
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
                      <td className={`ndd ${item.combinac === 1 ? 'obs' : 'itemNormal'}`}> {nomeProduto(item.produto_id)}
                      </td>) : <td className={`ndd ${item.combinac === 1 ? 'obs' : 'itemNormal'}`}>
                      {nomeProdutos(item.produto_id)}
                    </td>}

                    <Modal isOpen={showModal} >
                      <h1>{nomeProduto(item.produto_id)}</h1>

                      <InventarioOption opt={item.grupoc} itens={inventario} listaRef={listaRef} adicionarItem={adicionarItem} scrollTop={scrollTop} handleScrollUp={handleScrollUp} handleScrollDown={handleScrollDown} />
                    </Modal>
                    <td className='itemNormalB'>
                      {item.valor !== 0 ? item.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'Error no valor...' : ''}<br />

                    </td>
                    <td className='itemNormalB'>
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