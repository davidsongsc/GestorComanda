import React, { useState, useEffect } from "react";

function Inventario({
    item,
    toggleModal,
    mostrarInventario,
    setMostrarInventario,
    mostrarInventario2,
    setMostrarInventario2,
    mostrarInventario3,
    setMostrarInventario3,
    itens,
    listaRef,
    adicionarItem,
    scrollTop
}) {
    const alturaBotao = '15vh';
    const larguraBotao = '15vh';
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [observacao, setObservacao] = useState('true');

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

    const ivAdd = (item, i) => {
        adicionarItem({
            avaliacao: item.avaliacao,
            combinac: 0,
            combinag: 0,
            descricao: 0,
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

        if (i === 1) {
            handleAbrirInventario(true, setMostrarInventario);
        } else if (i === 2) {
            handleAbrirInventario(true, setMostrarInventario2);
        } else if (i === 3) {
            handleAbrirInventario(true, setMostrarInventario3);
        } else if (i === 4) {
            toggleModal();
        }
    };

    const renderOption = (options, index) => (
        <div>
            <div className='inventarioOption'>
                <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                    {options.map((item, index) => (
                        <li key={index}>
                            <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, (index + 1))} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    const inventarioOptions = {
        1: {
            primaryFilter: (item) => item.grupoc === 1,
            secondaryFilter: (item) => item.grupoc === 2,
        },
        2: {
            primaryFilter: (item) => item.grupoc === 2,
            secondaryFilter: (item) => item.grupoc === 4,
        },
        3: {
            primaryFilter: (item) => item.grupoc === 3,
            secondaryFilter: (item) => item.grupoc === 4,
        },
        5: {
            primaryFilter: (item) => item.grupoc === 5,
            secondaryFilter: (item) => item.grupoc === 6,
        },
        6: {
            primaryFilter: (item) => item.grupoc === 6,
            secondaryFilter: (item) => item.grupoc === 7,
        },
        10: {
            primaryFilter: (item) => item.grupoc === 11,
            secondaryFilter: (item) => item.grupoc === 12,
        },
    };

    const { primaryFilter, secondaryFilter } = inventarioOptions[item.grupoc] || {};

    if (primaryFilter && secondaryFilter) {
        const optionManualPrimario = itens.filter(primaryFilter);
        const optionManualSecundario = itens.filter(secondaryFilter);

        if (!mostrarInventario) {
            return renderOption(optionManualPrimario, 1);
        }

        if (!mostrarInventario2) {
            return renderOption(optionManualSecundario, 2);
        }

        if (!mostrarInventario3) {
            return renderOption(optionManualPrimario, 3);
        }
    } else {
        let itensFiltrados;

        console.log(itemSelecionado);
        console.log('aquii');

        if (itemSelecionado === 11) {
            itensFiltrados = itens.filter((item) => item.grupoc === 11);
        } else if (itemSelecionado === 26) {
            itensFiltrados = itens.filter((item) => item.grupoc === 19);
        } else if (itemSelecionado === 4) {
            itensFiltrados = itens.filter((item) => item.grupoc === 4);
        } else if (itemSelecionado === 6) {
            
            itensFiltrados = itens.filter((item) => item.grupoc === 5);
            
        } else {
            itensFiltrados = itens.filter((item) => item.grupoc === 8);
        }

        return (
            <div className='inventarioOp'>
                <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                    {itensFiltrados.map((item, index) => (
                        <li key={index}>
                            <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 4)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Inventario;
