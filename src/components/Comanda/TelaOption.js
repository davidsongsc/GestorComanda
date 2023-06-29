import React, { useState, useEffect } from 'react';
import InventarioOption from './InventarioOption';

function TelaOption({
    cmdComanda,
    showModal,
    toggleModal,
    setMostrarInventario,
    setMostrarInventario2,
    setMostrarInventario3,
    itens,
    listaRef,
    adicionarItem,
    grupoCompain
}) {
    const [contagem, setContagem] = useState(0);
    const [modalItem, setModalItem] = useState(null);

    useEffect(() => {
        // Encontre o item da cmdComanda que deseja exibir no modal
        const itemModal = cmdComanda.find((item) => {
            // Defina o critério de filtragem do item aqui
            // Por exemplo, vamos supor que você queira encontrar o item com o ID igual a 1
            return item.grupoc === grupoCompain;
        });

        // Atribua o item encontrado à variável modalItem
        setModalItem(itemModal);
    }, [cmdComanda]);

    function handleContador(reset) {
       console.log(contagem);
        setContagem(contagem + 1);
        if (contagem > 5){
            setContagem(0);
            toggleModal();
            console.log('resetado!');
        }
        return contagem;
    };

    return (
        <>
          {modalItem && (
            <div >
              <div
                style={{
                  display: showModal ? 'block' : 'none',
                  position: 'absolute',
                  margin: '-10px -10px',
                  left: '0px',
                  inset: '0px',
                  border: 'none',
                  background: 'radial-gradient(circle at right, black,black,black,black, transparent,transparent,transparent)', // Gradiente radial personalizado
                  overflow: 'auto',
                  borderRadius: '8px',
                  outline: 'none',
                  padding: '20px',
                  zIndex: '999'
                }}
              >
                {/**<h1>{nomeProduto(modalItem.produto_id)}</h1> **/}
                <InventarioOption
                  toggleModal={toggleModal}
                  setMostrarInventario={setMostrarInventario}
                  setMostrarInventario2={setMostrarInventario2}
                  setMostrarInventario3={setMostrarInventario3}
                  itens={itens}
                  listaRef={listaRef}
                  adicionarItem={adicionarItem}
                  item={modalItem}
                  handleContador={handleContador}
                  contagem={contagem}
                  grupoCompain={grupoCompain}
                />
              </div>
            </div>
          )}
        </>
      );
      
}

export default TelaOption;
