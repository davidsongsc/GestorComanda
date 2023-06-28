import React, { useState, useEffect } from "react";

function Inventario({
    item,
    toggleModal,
    setMostrarInventario,
    setMostrarInventario2,
    setMostrarInventario3,
    itens,
    listaRef,
    adicionarItem
}) {
    const alturaBotao = '15vh';
    const larguraBotao = '15vh';
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [observacao, setObservacao] = useState('true');
    const [elementoExibidor, setElemento] = useState('block');
    const [displayOption, setDisplayOption] = useState(['block', 'none']);


    useEffect(() => {
        setItemSelecionado(item.grupoc);
    }, [item]);

    const handleAbrirInventario = (mostrar, setMostrar) => {
        setMostrarInventario(mostrar);
        setMostrarInventario2(false);
        setMostrarInventario3(false);
    };

    const ocultarObservacao = (v) => {
        setObservacao('false');
        if (v) {
            toggleModal();
        }
    };

    const ivAdd = (item, i, ii) => {
        console.log(ii);
        adicionarItem({
            avaliacao: item.avaliacao,
            combinac: item.combinac,
            combinag: item.combinag,
            descricao: item.descricao,
            disponibilidade: item.disponibilidade,
            grupo: item.grupo,
            grupoc: item.grupoc,
            id: item.id,
            listaid: item.listaid,
            nomefantasia: null,
            nomeproduto: null,
            produto_id: item.produto_id,
            push: item.push,
            qtd: item.qtd,
            status: item.status,
            valor: item.valor,
        });
        if (i === 0) {
            handleAbrirInventario(true, setMostrarInventario);
        } else if (i === 1) {
            handleAbrirInventario(true, setMostrarInventario2);
        } else if (i === 2) {
            handleAbrirInventario(true, setMostrarInventario3);
        } else if (i === 3) {
            handleAbrirInventario(true, setMostrarInventario3);
        } else if (i === 4) {
            toggleModal();
        }
    };

    const handleOptionClick = (index) => {
        const updatedDisplayOption = [...displayOption];
        updatedDisplayOption[index] = 'none';
        updatedDisplayOption[1 - index] = 'block';
        setDisplayOption(updatedDisplayOption);
      };
      
      const renderOption = (options, index) => {
        const shouldHide = options.length === 2;
        const displayStyle = shouldHide ? displayOption[index] : 'block';
      
        return (
          <div key={index} style={{ display: displayStyle }} onClick={() => handleOptionClick(index)}>
            <div className='inventarioOption'>
              <ul ref={listaRef}>
                {options.map((item, i) => (
                  <li key={i}>
                    <button
                      className={`GPX${item.grupo}`}
                      onClick={() => ivAdd(item, i, index)}
                      style={{ height: alturaBotao, width: larguraBotao }}
                    >
                      {item.nomeproduto}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      };
    const inventarioOptions = {
        1: {
            options: [
                { filter: (item) => item.grupoc === 1 },
                { filter: (item) => item.grupoc === 2 },
            ],
        },
        2: {
            options: [
                { filter: (item) => item.grupoc === 2 },
                { filter: (item) => item.grupoc === 4 },
                { filter: (item) => item.grupoc === 2 },
            ],
        },
        3: {
            options: [
                { filter: (item) => item.grupoc === 3 },
                { filter: (item) => item.grupoc === 4 },
                { filter: (item) => item.grupoc === 2 },
            ],
        },
        5: {
            options: [
                { filter: (item) => item.grupoc === 5 },
                { filter: (item) => item.grupoc === 11 },
                { filter: (item) => item.grupoc === 12 },
            ],
        },
        6: {
            options: [
                { filter: (item) => item.grupoc === 6 },
                { filter: (item) => item.grupoc === 7 },
                { filter: (item) => item.grupoc === 2 },
            ],
        },
        10: {
            options: [
                { filter: (item) => item.grupoc === 11 },
                { filter: (item) => item.grupoc === 12 },
                { filter: (item) => item.grupoc === 2 },
            ],
        },
    };

    const options = inventarioOptions[item.grupoc]?.options;

    if (options) {
        return options.map((option, index) => {
            const filteredItems = itens.filter(option.filter);
            return renderOption(filteredItems, index);
        });
    } else {
        let itensFiltrados;

        if (itemSelecionado === 11) {
            itensFiltrados = itens.filter((item) => item.grupoc === 11);
        } else if (itemSelecionado === 26) {
            itensFiltrados = itens.filter((item) => item.grupoc === 19);
        } else if (itemSelecionado === 5) {
            itensFiltrados = itens.filter((item) => item.grupoc === 4);
        } else if (itemSelecionado === 6) {
            itensFiltrados = itens.filter((item) => item.grupoc === 5);
        } else {
            itensFiltrados = itens.filter((item) => item.grupoc === 8);
        }

        return (
            <div className='inventarioOp'>
                <ul ref={listaRef} >
                    {itensFiltrados.map((item, index) => (
                        <li key={index}>
                            <button
                                className={`GPX${item.grupo}`}
                                onClick={() => ivAdd(item, 4)}
                                style={{ height: alturaBotao, width: larguraBotao }}
                            >
                                {item.nomeproduto}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Inventario;
