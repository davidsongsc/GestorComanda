import './comanda.css';
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const GORJETA = 0.10;
const TX = 0.05;
const DESCONTO = 0;

function Comanda() {
  const { id } = useParams();
  const [scrollTop, setScrollTop] = useState(0);
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const navigation = useNavigate();
  const listaRef = useRef(null);
  const nome = 'maquina'
  const token = 'abc123'
  const [itens, setItens] = useState([]);
  const [comanda, setComanda] = useState([]);
  const [itensComanda, setitensComanda] = useState([]);

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
    if (id === false) {
      navigation(`/`);
    } else {
      alert('Pedido Enviado.')
      navigation(`/`);
    }

  }
  // carregar itens da API
  useEffect(() => {
    fetch(`http://192.168.0.50:5000/produtos?nome=${nome}&token=${token}&version=100a`)
      .then((response) => response.json())
      .then((data) => setItens(data.produtos))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    async function carregarComanda() {
      const response = await fetch(`http://192.168.0.50:5000/comandas?nome=${nome}&token=${token}&version=100a`);
      const comandaMesa = await response.json();
      console.log(comandaMesa)
      const fecomanda = comandaMesa.filter(comad => comad.mesa === parseInt(id))
      console.log(fecomanda)

    }

    carregarComanda();
  }, []);



  // demais códigos de renderização e manipulação de estado

  const adicionarItem = (item) => {


    const itemExistente = itens.find((i) => i.nome === item.nomeproduto);
    if (itemExistente) {
      setComanda(
        comanda.map((i) =>
          i.nome === item.nomeproduto ? { ...i, quantidade: i.quantidade + 1 } : i
        )
      );
    } else {
      setComanda([...comanda, { ...item, quantidade: 1 }]);
    }
  };

  const removerItem = (index) => {

    setComanda(comanda.filter((_, i) => i !== index));
  };

  const calcularTotal = () => {
    return comanda.reduce((total, item) => total + item.valor * item.quantidade, 0);
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

        <div className='minventario'>
          <div className='inventario'>
            <ul ref={listaRef} style={{ height: '483px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
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
                <button onClick={() => handleClick(true)} >ENVIAR</button>
                <button onClick={() => handleClick(false)} className='V'>FECHAR</button>
                <button>OBS</button>
              </div>
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
                  <button>OK</button>
                  <button>0</button>
                  <button >C</button>
                </div>
              </div>
              <div className='operadores'>
                <button className='C'>CONTA</button>
                <button className='D'>GORJETA</button>
                <button className='D'>TAXA</button>
              </div>
              <div className='operadores'>
                <button className='V'>Desconto</button>
                <button className='V'>Ajuste</button>
                <button className='V'>Cortesia</button>
              </div>

            </div>
            <div>
              <div className='totais'>
                <p>CONTA: R${calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p>GORJETA: R${calcularGorjeta().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p>DESCONTO: R${calcularDesconto().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p>TX: R${calcularTaxa().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p>TOTAL: R${calcularConta().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="comandar">
        <table>
          <thead>
            <tr className='titulo-tb'>
              <td>MESA:</td>
              <td>ATENDENTE:</td>
              <td>CONTA: {calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>

            </tr>
          </thead>
        </table>
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
              <tr className='linhas-tb'>
                <td className='idd'>1{item.id}0</td>

                <td onClick={() => removerItem(index)} className='ndd'>
                  {item.nomefantasia}
                </td>
                <td>
                  {item.qtd}
                </td>
                <td>
                  {item.valor}
                </td>
                <td>
                  {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>


                <div onClick={() => removerItem(index)} key={index}> x </div>


              </tr>
            ))}


          </tbody>

        </table>



      </div>


    </div>
  );
}

export default Comanda;