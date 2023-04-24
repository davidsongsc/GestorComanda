import './comanda.css';
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import Opt from './Opt';

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


  useEffect(() => {
    function carregarComanda() {

      fetch(`https://dagesico.pythonanywhere.com/comandas?nome=${nome}&token=${token}&versi  on=100a`)
        .then(response => response.json())
        .then(data => {
          const comandaMesa = data.filter(comad => comad.mesa === parseInt(id));

          comandaMesa.map(listaComanda => (

            setMesa(listaComanda.mesa),
            setComanda(listaComanda.itens[0].map(item => ({ ...item, }))),
            console.log(listaComanda)
          ));
        })
        .catch(error => console.error(error));

      fetch(`https://dagesico.pythonanywhere.com/produtos?nome=${nome}&token=${token}&version=100a`)
        .then(response => response.json())
        .then(data => setItens(data.produtos))
        .catch(error => console.error(error));
    }

    carregarComanda();
  }, []);
  useEffect(() => {
    console.log(mesas)
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleScrollUp = () => {
    listaRef.current.scrollBy({
      top: -470,
      behavior: 'smooth'
    });
  };

  const handleScrollDown = () => {
    listaRef.current.scrollBy({
      top: 470,
      behavior: 'smooth'
    });
  };

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
      alert('Pedido Enviado!')
      navigation(`/`);
    }

  }
  // carregar itens da API


  // demais códigos de renderização e manipulação de estado

  const adicionarItem = (item) => {

    const itemExistente = itens.find((i) => i.nome === item.nomeproduto);


    if (itemExistente) {

      setComanda(
        comanda.map((i) =>
          i.nome === item.nomeproduto ? { ...i, qtd: i.qtd + 1 } : i
        )
      );
    } else {
      console.log(item)
      setComanda([...comanda, { ...item, qtd: 1 }]);
      console.log(item.grupoc)
      if (item.grupoc === 1) {
        setTipoItem(1)
        toggleModal()
      }
      else if (item.grupoc === 2) {
        setTipoItem(2)
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
              <td>MESA: {mesa}</td>
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
          <div className='grupo-produto'>
            <button onClick={mostrarTodos}>Todos</button>
            <button className='GPX6615' onClick={() => filtrarPorGrupo(6615)}>Entradas</button>
            <button className='GPX9' onClick={() => filtrarPorGrupo(9)}>Combinados</button>
            <button className='GPX13' onClick={() => filtrarPorGrupo(13)}>Burguer</button>
            <button className='GPX2' onClick={() => filtrarPorGrupo(2)}>Bebidas</button>
            <button className='GPX10' onClick={() => filtrarPorGrupo(10)}>Executivo</button>
            <button className='GPX7106' onClick={() => filtrarPorGrupo(7106)}>Sobremesas</button>
            <button className='GPX12' onClick={() => filtrarPorGrupo(12)}>Ribs</button>
            <button className='GPX6' onClick={() => filtrarPorGrupo(6)}>Peixes</button>
            <button className='GPX7' onClick={() => filtrarPorGrupo(6)}>Frango</button>
            <button className='GPX8' onClick={() => filtrarPorGrupo(6)}>Drinks</button>
            <button className='GPX9' onClick={() => filtrarPorGrupo(6)}>Doses</button>
          </div>
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
                <button onClick={() => handleClick('fechar')} className='F' disabled> </button>

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

        <Modal isOpen={showModal} >
          <Opt id={tipoItem} />
          <button onClick={toggleModal}>Fechar</button>
        </Modal>
        <div style={{ height: '950px', overflow: 'auto' }}>
          <table>
            <thead>
              <tr className='titulo-tb'>
                <td>QTD</td>

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
                    <td className='itemNormalB'>
                      {item.qtd !== 0 ? item.qtd : '▲'}
                    </td>


                    <td className={`ndd ${item.combinac === 1 ? 'obs' : 'itemNormal'}`}>
                      {item.nomefantasia}
                    </td>

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