import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import InventarioOption from './InventarioOption';

Modal.setAppElement("#root");

function TelaOption({
    cmdComanda,
    showModal,
    toggleModal,
    setMostrarInventario,
    setMostrarInventario2,
    setMostrarInventario3,
    itens,
    listaRef,
    adicionarItem
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        //toggleModal(!showModal);
    };

    return (
        <>
            {cmdComanda.map((item, index) => (
                <div onClick={closeModal} style={{textAlign: 'center'}}>
                    <Modal key={index}
                        isOpen={showModal}

                        style={{
                            overlay: {
                                background: 'radial-gradient(circle at right, black,black,black,black, transparent,transparent,transparent)', // Cor de fundo do overlay
                            },
                            content: {
                                position: 'absolute',
                                inset: '40px',
                                border: 'none',
                                background: 'radial-gradient(circle at right, black,black,black,black, transparent,transparent,transparent)', // Gradiente radial personalizado
                                overflow: 'auto',
                                borderRadius: '8px',
                                outline: 'none',
                                padding: '20px',
                            },
                        }}>
                        {/**<h1>{nomeProduto(item.produto_id)}</h1> **/}
                        <InventarioOption
                            toggleModal={toggleModal}
                            setMostrarInventario={setMostrarInventario}
                            setMostrarInventario2={setMostrarInventario2}
                            setMostrarInventario3={setMostrarInventario3}
                            itens={itens}
                            listaRef={listaRef}
                            adicionarItem={adicionarItem}
                            item={item}
                        />
                    </Modal>
                </div>
            ))}

        </>
    );
}

export default TelaOption;
