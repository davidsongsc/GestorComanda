
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
import AlertaPersonalizado from './AlertaPersonalizado';

Modal.setAppElement("#root");
const TX = 0;
const DESCONTO = 0;
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
function Comanda({ mesaId, comandaLis, handleCloseModalMesa }) {
  const navigation = useNavigate();
  const { id } = useParams();
  const [tipoAlertaId, setTipoAlertaId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [grupoSelecionado, setGrupoSelecionado] = useState(6615);

  const listaRef = useRef(null);
  const [itens, setItens] = useState([]);
  const [mesa, setMesa] = useState();
  const [grupo, setGrupo] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [areaActive, setActive] = useState(false);
  const [comanda, setComanda] = useState([]);
  const [tipoItem, setTipoItem] = useState();
  const [inventario, setInventario] = useState();
  const [teclado, setTeclado] = useState(1);
  const [mostrarInventario, setMostrarInventario] = useState(false);
  const [mostrarInventario2, setMostrarInventario2] = useState(false);
  const [GORJETA, setGorjeta] = useState(0);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  useEffect(() => {
    console.log(mesaId);
    function carregarComanda() {
    
     fetch(`${ipNucleo}/comandas?nome=${nome}&token=${token}`)
        .then(response => response.json())
        .then(data => {
          const comandaMesa = data.filter(comad => comad.mesa === parseInt(mesaId));
          comandaMesa.map(listaComanda => (
            // console.log(listaComanda.operador),
            setUsuario(listaComanda.operador),
            setMesa(listaComanda.mesa),
            setComanda(listaComanda.itens[0].map(item => ({ ...item, }))),
            console.log(listaComanda),
            console.log(comandaLis)
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
  }, [id, nome, token]);

  function handleFecharAlerta() {
    setMostrarAlerta(false);
  }

  // Pagina Options On/Off 
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const removerGorjeta = () => {
    setGorjeta(0);
  };

  const adicionarGorjeta = (valor) => {
    if (valor === 10) {
      setGorjeta(0.10);
    } else if (valor === 11) {
      setGorjeta(0.11)
    } else if (valor === 12) {
      setGorjeta(0.12)
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

  const handleTeclado = (tecla) => {
    console.log(typeof tecla)
    console.log(tecla)
    if (tecla === 0) {
      setTeclado(1)
    }
    else {
      setTeclado(tecla)
    }
    console.log(teclado)
  }

  // Click Botão Menu
  const handleClick = (id) => {
    if (id === 'fechar') {
      //handleCloseModalMesa()
      //navigation('/');
      handleCloseModalMesa();
    } else if (id === 'conta') {
      setMostrarAlerta(true);
      setTimeout(() => {
        //navigation('/');
        handleCloseModalMesa();
      }, 2000);


    } else if (id === 'caixa') {
      alert('Imprimindo Conta...')
      //navigation('/');
      handleCloseModalMesa();

    } else {
      //navigation('/');
      handleCloseModalMesa();

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
      setComanda([...comanda, { ...item, qtd: parseInt(teclado), produto_id: item.id }]);
      setTeclado(1);
      if (item.grupoc === 1) {
        setTipoItem(1);
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
      } else if (item.grupoc === 11) {
        setTipoItem(11)
        toggleModal()
      }
      else if (item.grupoc === 11) {
        setTipoItem(11)
        toggleModal()
      }
      else if (item.grupoc === 15) {
        setTipoItem(15)
        toggleModal()
      }


    }
  };

  const adicionarItemOption = (item, t) => {
    console.log(item)
    setMostrarInventario(false);
    setMostrarInventario2(false);
    const itemExistente = itens.find((i) => i.nome === item.nomeproduto);
    if (itemExistente) {
      setComanda(
        comanda.map((i) =>
          i.nome === item.nomeproduto ? { ...item, qtd: i.qtd + 1 } : i
        )
      );
    } else {
      setComanda([...comanda, { ...item, qtd: parseInt(teclado), produto_id: item.id }]);
      if (item.grupoc === 2323)
        toggleModal()
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
    return DESCONTO
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

  const removerItem = (index) => {

    setComanda(comanda.filter((_, i) => i !== index));
  };

  const tTeste = (t) => {
    console.log(t);
  }

  return (
    <div className='container-comanda fade-in' style={{position: 'relative', top: '10px', left: '35px'}}>
      {mostrarAlerta && (
        <AlertaPersonalizado
          usuarioError={usuarioError}
          tipoAlertaId={tipoAlertaId}
          message={usuarioError[tipoAlertaId].mensagem}
          onClose={handleFecharAlerta}
          hAlerta={handleClickMostrar}
        />
      )}
      <div className="comanda">
        <div className="comandar">


          <div className='cm-comanda-pn'>

            <table className='menu-itens-catal'>
              <thead>
                <tr className='titulo-tb'>
                  <td >QTD</td>

                  <td>PRODUTO</td>

                  <td>V UND</td>
                  <td>V TOTAL</td>


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


                      <td className='itemNormalB' style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '2px' }}>
                        {item.valor !== 0 ? item.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'Error no valor...' : ''}<br />

                      </td>
                      <td className='itemNormalB' style={{ fontSize: '25px', fontWeight: '800', color: 'goldenrod', letterSpacing: '4px' }}>
                        {item.valor !== 0 ? (item.valor * item.qtd)?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'Valor não definido' : ''}

                      </td>


                    </tr>

                  </>
                ))}


              </tbody>

            </table>
            {comanda.map((item, index) => (
              <Modal key={index} isOpen={showModal} style={{ backgroundColor: "black" }}>
                <h1>{nomeProduto(item.produto_id)}{item.push}</h1>
                <InventarioOption style={{ backgroundColor: 'black' }} id={id} grupo={grupo} toggleModal={toggleModal} mostrarInventario={mostrarInventario} setMostrarInventario={setMostrarInventario} mostrarInventario2={mostrarInventario2} setMostrarInventario2={setMostrarInventario2} qop={parseInt(teclado)} opt={item.grupoc} opx={item.combinac} itens={inventario} listaRef={listaRef} adicionarItem={adicionarItemOption} scrollTop={scrollTop} handleScrollUp={handleScrollUp} handleScrollDown={handleScrollDown} item={item} />

              </Modal>
            ))}


            <InventarioGrupo mostrarTodos={mostrarTodos} filtrarPorGrupo={filtrarPorGrupo} />
            <div className='inventario'>
              <ul ref={listaRef} className='i-inventario'>
                {itensFiltrados.map((item, index) => (
                  <li key={index}>
                    <button className={`GPX${item.grupo}`} onClick={() => adicionarItem(item)}>{item.nomeproduto}</button>
                  </li>
                ))}
              </ul>
              {/*
            <div>
              <button onClick={handleScrollUp}>↑</button>
              <button onClick={handleScrollDown}>↓</button>

            </div>
            */}

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
                <div className='g2'>
                  <button onClick={() => handleTeclado('C')}>C</button>
                  <button onClick={() => handleTeclado('D')}>D</button>
                  <button onClick={() => handleTeclado('E')}>E</button>
                </div>
              </div>

            </div>


          </div>
          <div className='controleb'>
            <div className='operadores'>
              <button onClick={() => handleClick('O.K.')} className='H' >O.K.</button>

              <button className='B'>COZINHA</button>
              <button onClick={() => handleClick('fechar')} className='F'>FECHAR</button>
              <button onClick={() => handleClick()} className='C' >DESCONTO</button>
              <button onClick={() => removerGorjeta()} className={GORJETA === 0 ? 'C' : 'B'} >REMOVER GORJETA</button>
              <button onClick={() => adicionarGorjeta(10)} className={GORJETA === 0.10 ? 'A' : 'B'} >GORJETA 10%</button>
              <button onClick={() => adicionarGorjeta(11)} className={GORJETA === 0.11 ? 'A' : 'B'} >GORJETA 11%</button>

            </div>

            <div className='operadores'>
              <button onClick={() => handleClick('conta')} className='A'>IMPRIMIR</button>
              <button onClick={() => handleClick('caixa')} className='C' disabled>CANCELAR</button>
              <button className='D' disabled>Delivery</button>
              <button onClick={() => handleClick('fechar')} className='F' disabled>Dividir Conta</button>
              <button onClick={() => handleClick('fechar')} className='F' disabled>Juntar Conta</button>

              <button onClick={() => handleClick('fechar')} className='F' disabled>Nomear Comanda</button>
              <button onClick={() => adicionarGorjeta(12)} className={GORJETA === 0.12 ? 'A' : 'B'} >GORJETA 12%</button>
            </div>

          </div>

          <table className='tabela-fixa'>
            <thead>
              <tr className='titulo-tb'>
                <td className='titulo-table'>COMANDA </td>
                <td className='titulo-table'>ATENDIMENTO</td>

                <td className='titulo-table'>GORJETA</td>
                <td className='titulo-table'>DESCONTOS</td>
                <td className='titulo-table'>CONTA</td>
                <td className='titulo-table'>TOTAL</td>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='linha-table' style={{ backgroundColor: 'white', color: 'black', borderRadius: '50px', width: '1px', fontSize: '65px', fontWeight: '800' }}>{mesa}</td>
                <td className='linha-table'><em>{usuario}</em></td>

                <td className='linha-table'>{calcularGorjeta().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className='linha-table' style={{ backgroundColor: '#8f2020' }}>{calcularDesconto().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className='linha-table' style={{ backgroundColor: 'rgb(114 97 86)' }}>{calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className='linha-table' style={{ backgroundColor: 'rgb(193 107 50)' }}>R$ {calcularConta().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>  </div>
    </div>
  );
}

export default Comanda;