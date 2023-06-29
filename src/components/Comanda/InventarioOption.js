import React, { useState, useEffect } from "react";

function Inventario({
    item,
    toggleModal,
    setMostrarInventario,
    setMostrarInventario2,
    setMostrarInventario3,
    itens,
    listaRef,
    adicionarItem,
    handleContador,
    contagem,
    grupoCompain
}) {
    const alturaBotao = '15vh';
    const larguraBotao = '15vh';
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [displayOption, setDisplayOption] = useState(['block', 'none']);
    const [verificado, setVerificado] = useState(false);
    const [indice, setIndice] = useState();
    const [limite, setLimite] = useState(5);
    const contar = () => {
        return handleContador(+1)
    }

    useEffect(() => {
        setItemSelecionado(grupoCompain);
    }, [item]);




    const handleOptionClick = (index) => {
        console.log(index);
        const updatedDisplayOption = [...displayOption];
        updatedDisplayOption[index] = displayOption[index] === 'none' ? 'block' : 'none';
        console.log(updatedDisplayOption[index]);
        updatedDisplayOption[1 + index] = displayOption[1 - index] === 'none' ? 'block' : 'none';
        console.log(updatedDisplayOption[1 + index]);
        setDisplayOption(updatedDisplayOption);
    };


    useEffect(() => {


        console.log('Effect: OK');
        if (verificado === true) {
            console.log(contagem);
            if (contagem >= limite) {
                toggleModal();
            }
            setVerificado(!verificado);
        }
    }, [contagem]);

    const ivAdd = (item, i, ii) => {
        setVerificado(!verificado);
        console.log(contar());
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
            contar();
            setIndice(i);
        }
    };

    const renderOption = (options, index, parametro1, parametro2) => {

        let displayStyle
        if (contagem >= 0 && contagem <= 4) {
            displayStyle = 'block';

        }
        else {
            displayStyle = 'none';

        }
        return (
            <div key={index} style={{ position: 'absolute', display: displayStyle }}>
                <div className='inventarioOption'>
                    <ul ref={listaRef}>
                        {options.map((item, i) => (
                            <li key={i}>
                                <button
                                    className={`GPX${item.grupo}`}
                                    onClick={(event) => {
                                        event.stopPropagation(); // Impede a propagação do evento de clique para o elemento pai
                                        handleOptionClick(index);
                                        ivAdd(item, index, parametro1, parametro2);
                                    }}
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
                { filter: (item) => item.grupoc === 4 },
                { filter: (item) => item.grupoc === 5 },
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
        if (contagem < 4) {
            return options.map((option, index) => {
                const filteredItems = itens.filter(option.filter);
                return renderOption(filteredItems, index);
            });

        } else {
            let itensFiltrados;

            if (itemSelecionado === 1) {
                itensFiltrados = itens.filter((item) => item.grupoc === 5);
            } else if (itemSelecionado === 26) {
                itensFiltrados = itens.filter((item) => item.grupoc === 19);
            } else if (itemSelecionado === 5) {
                itensFiltrados = itens.filter((item) => item.grupoc === 4);
            } else if (itemSelecionado === 6) {
                itensFiltrados = itens.filter((item) => item.grupoc === 5);
            } else {
                itensFiltrados = itens.filter((item) => item.grupoc === 8);
            }
            let displayStyle
            if (contagem >= 4 && contagem < 6) {
                displayStyle = 'block';

            }
            else {
                displayStyle = 'none';

            }
            return (
                <div key={indice} style={{ position: 'absolute', display: displayStyle }}>
                    <div className='inventarioOp'>
                        <ul ref={listaRef}>
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
                </div>

            );
        }
    }
}

export default Inventario;
