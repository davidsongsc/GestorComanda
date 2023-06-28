import React, { useState, useEffect } from 'react';


const Mesa = ({ mesa, comandas, fazerPedido }) => {
  const comanda = comandas.find((comanda) => comanda.mesa === mesa.mesa);

  const handlePedidoClick = () => {
    fazerPedido(mesa);
  };
  const [mostrarConta, setMostrarConta] = useState(false);
  const [status, setStatus] = useState('Livre');
  const [buttonClass, setButtonClass] = useState('button button-livre');
  

  useEffect(() => {
    const mesaIndisponivel = comandas.some(comanda => comanda.mesa === mesa.mesa && comanda.status === 2);
    const mesaOcupada = comandas.some(comanda => comanda.mesa === mesa.mesa && comanda.status === 3);
    const mesaFechando = comandas.some(comanda => comanda.mesa === mesa.mesa && comanda.status === 4);
    const mesaLimpando = comandas.some(comanda => comanda.mesa === mesa.mesa && comanda.status === 6);
    const mesaPreparando = comandas.some(comanda => comanda.mesa === mesa.mesa && comanda.status === 7);
    const mesaDefeito = comandas.some(comanda => comanda.mesa === mesa.mesa && comanda.status === 9);
    const mesaReservada = comandas.some(comanda => comanda.mesa === mesa.mesa && comanda.status === 8);
    const mesaPagamento = comandas.find(comanda => comanda.mesa === mesa.mesa && comanda.status === 5);
    const mesaPago = comandas.some(comanda => comanda.mesa === mesa.mesa && comanda.status === 4);
    const mesaAberta = comandas.some(comanda => comanda.mesa === mesa.mesa && comanda.status === 1);


    if (mesaIndisponivel) {
      setStatus(<h4>Pendências</h4>);
      setButtonClass("button-indisponivel");
    } else if (mesaPagamento) {
      setStatus(<h4>Pagando...<br />R$ {mesaPagamento.valorTotal}</h4>);
      setButtonClass("button-pagamento");
    }
    else if (mesaLimpando) {
      setStatus(<h4>Limpando...</h4>);
      setButtonClass("button-limpando");
    } else if (mesaPreparando) {
      setStatus(<h4>Preparando</h4>);
      setButtonClass("button-reserva");
    } else if (mesaDefeito) {
      setStatus(<h4>Indisponivel<br />MatTec<br /><br /></h4>);
      setButtonClass("button-defeito");
    } else if (mesaReservada) {
      const tempoDecorrido = calcularTempoDecorrido(mesaReservada.dataHoraEntrada);

      setStatus(<h4>[Reservado]</h4>);
      setButtonClass("button-reserva");
    } else if (mesaFechando) {
      setStatus(<h4>Fechando<br />conta<br />Aguarde...<br /></h4>);
      setButtonClass("button-fechando");
    } else if (mesaPago) {
      setStatus('Pago');
      setButtonClass("button-pago");

    } else if (mesaOcupada) {
      const comandaOcupada = comandas.find(comanda => comanda.mesa === mesa.mesa && comanda.status !== 'Pago');
      const tempoDecorrido = calcularTempoDecorrido(comandaOcupada.dataHoraEntrada);
      setButtonClass("button-ocupado");
      
    } else if (mesaAberta) {
      setStatus(<h4>Aberta no Terminal</h4>);
      setButtonClass("button-comanda");

    } else {
      setButtonClass("button-livre");
    }

  }, [comandas, mesa]);


  const calcularTempoDecorrido = (dataHoraEntrada) => {
    const dataAtual = new Date();
    const tempoDecorrido = Math.floor((dataAtual - new Date(dataHoraEntrada)) / (1000 * 60));

    // Converter minutos em horas e minutos
    const horas = Math.floor(tempoDecorrido / 60);
    const minutos = tempoDecorrido % 60;

    // Formatar a string de saída
    const horasFormatadas = horas > 0 ? `${horas}h` : '';
    const minutosFormatados = minutos > 0 ? `${minutos}min` : '';

    return `${horasFormatadas} ${minutosFormatados}`;
  }



  const handleContaClick = () => {
    setMostrarConta(!mostrarConta);
  };

  return (
    <>

      <li className={`mesa-menu button ${buttonClass}`} key={mesa.mesa}>
        <div className='span-mesa-comanda-vlw'></div>
   
        <div className='n-mesa-menu'>{mesa.mesa}
        </div>

      </li>


    </>
  );
};


export default Mesa;
