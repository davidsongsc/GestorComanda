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
  const [selectedValue, setSelectedValue] = useState("");
  const [verificador, setVerifica] = useState(0);

  useEffect(() => {
    function carregarComanda() {
      fetch(`http://192.168.0.50:5000/comandas?nome=${nome}&token=${token}&version=100a`)
        .then(response => response.json())
        .then(data => {
          const comandaMesa = data.filter(comad => comad.mesa === parseInt(id));
          comandaMesa.map(listaComanda => (
            console.log(listaComanda),
            setMesa(listaComanda.mesa),
            setComanda(listaComanda.itens.map(item => ({ ...item, })))
          ));
        })
        .catch(error => console.error(error));

      fetch(`http://192.168.0.50:5000/produtos?nome=${nome}&token=${token}&version=100a`)
        .then(response => response.json())
        .then(data => setItens(data.produtos))
        .catch(error => console.error(error));
    }

    carregarComanda();
  }, []);
  useEffect(() => {
    console.log(mesas)
  }, []);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

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
              </div>

            </div>
            <div className='controle'>

              <div className='operadores'>
                <button onClick={() => handleClick('conta')} className='F'>CONTA</button>
                <button className='C'>GORJETA</button>
                <button className='V'>TAXA</button>
              </div>
              <div className='operadores'>
                <button className='V'>Desconto</button>
                <button className='C'>Ajuste</button>
                <button className='V'>Cortesia</button>
              </div>
              <div className='operadores'>
                <button onClick={() => handleClick(true)} >O.K.</button>
                <button className='T'>OBS</button>
                <button onClick={() => handleClick('fechar')} className='C'>FECHAR</button>
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

        <Modal isOpen={showModal} onRequestClose={toggleModal}>
          <Opt id={1} />
          <button onClick={toggleModal}>Fechar</button>
        </Modal>

        <table>
          <thead>
            <tr className='titulo-tb'>
              <td>ID</td>
              <td>PRODUTO</td>
              <td>QTD</td>
              <td>V UND</td>
              <td>V TOTAL</td>
              <td>...</td>
            </tr>
          </thead>
          <tbody>


            {comanda.map((item, index) => (
              <tr key={index} className='linhas-tb'>
                <td className='idd'>1{item.id}0</td>

                <td onClick={() => removerItem(index)} className='ndd'>
                  {item.nomefantasia}
                </td>
                <td>
                  {item.qtd}
                </td>
                <td>
                  {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td>
                  {(item.valor*item.qtd).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>


                <td onClick={() => removerItem(index)} key={index}> x </td>


              </tr>
            ))}


          </tbody>

        </table>



      </div>


    </div>
  );
}

export default Comanda;