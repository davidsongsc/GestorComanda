import React, { useState } from 'react';

const Pedido = ({ mesa, adicionarItem, fecharPedido, itens }) => {
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [valor, setValor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (item && valor) {
      const itemPedido = { item, quantidade, valor };
      adicionarItem(mesa, itemPedido);
      setItem('');
      setQuantidade(1);
      setValor('');
    }
  };

  const handleChangeItem = (event) => {
    setItem(event.target.value);
  };

  const handleChangeQuantidade = (event) => {
    setQuantidade(event.target.value);
  };

  const handleChangeValor = (event) => {
    setValor(event.target.value);
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={fecharPedido}>&times;</span>
        <h3>Mesa {mesa}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Item:
            <input type='text' value={item} onChange={handleChangeItem} />
          </label>
          <label>
            Quantidade:
            <input type='number' value={quantidade} min='1' max='10' onChange={handleChangeQuantidade} />
          </label>
          <label>
            Valor:
            <input type='text' value={valor} onChange={handleChangeValor} />
          </label>
          <button type='submit'>Adicionar</button>
        </form>
        <div className='itens-container'>
          <h4>Itens</h4>
          {itens && itens.map((itemPedido, index) => (
            <div key={index}>
              <div>{itemPedido.item} - {itemPedido.quantidade}x - R$ {itemPedido.valor}</div>
              <button onClick={() => {}}>Remover</button>
            </div>
          ))}
        </div>
        <button onClick={fecharPedido}>Fechar Pedido</button>
      </div>
    </div>
  );
};

export default Pedido;
