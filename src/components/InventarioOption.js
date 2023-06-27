import React, { useState, useEffect } from "react";




function Inventario({ item,
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
    scrollTop }) {
    const alturaBotao = '15vh';
    const larguraBotao = '15vh';
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [observacao, setObservacao] = useState('true');
    const [executado, setExecutado] = useState(false);
    useEffect(() => {
        // Código a ser executado apenas uma vez
        if (!executado) {
            // Faça algo aqui
            setItemSelecionado(item.grupoc);
            // Defina a variável de controle como true para indicar que o efeito já foi executado
            setExecutado(true);
        }
    }, []);
    const handleAbrirInventario = () => {

        setMostrarInventario(true);
        setMostrarInventario2(false);
        setMostrarInventario3(false);
    };
    const handleAbrirInventario2 = () => {
        setMostrarInventario(false);
        setMostrarInventario2(true);
        setMostrarInventario3(false);

    };

    const handleAbrirInventario3 = () => {
        setMostrarInventario(false);
        setMostrarInventario2(false);
        setMostrarInventario3(true);

    };

    function ocultarObservacao(v) {
        setObservacao('false');
        if (v) {
            toggleModal();
        }

    }
    function ivAdd(item, i) {
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
        })
        if (i === 1) {

            handleAbrirInventario();

        } else if (i === 2) {
            handleAbrirInventario2();

        } else if (i === 3) {
            handleAbrirInventario3();

        } else if (i === 4) {
            toggleModal();
        }

    }

    function Combo(optPrimario) {

    }
    if (item.grupoc === 1) {
        const optionManualPrimario = itens.filter((item) => item.grupoc === 1);
        const optionManualSecundario = itens.filter((item) => item.grupoc === 4);





        if (!mostrarInventario) {
            return (<div>
                <div className='inventarioOption'>

                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualPrimario.map((item, index) => (
                            <li key={index}>
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 1)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}
                        {/* Extras Opção Ponto */}
                        <li key={'d01'} onClick={() => ocultarObservacao()}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2003,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2003,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >So no Sal</button>
                        </li>
                        <li key={'d02'}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2004,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2004,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Pouco Tempero</button>
                        </li>
                        <li key={'d03'}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2005,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2005,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Mais Tempero</button>
                        </li>
                        <li key={'d04'}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2006,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2006,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Sem Sal</button>
                        </li>
                    </ul>



                </div>
            </div>);
        }
        if (!mostrarInventario2) {
            return (<div>
                <div className='inventarioOption'>
                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualSecundario.map((item, index) => (
                            <li key={index} >
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 2)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}

                    </ul>

                </div>
            </div>);
        }
        if (!mostrarInventario3) {
            return (<div className='inventarioOption'>

                <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>

                    {/* Extras Opção Ponto */}
                    <li key={'d01'} onClick={() => ocultarObservacao()}>
                        <button onClick={() => adicionarItem({
                            avaliacao: 0,
                            combinac: 0,
                            combinag: 0,
                            descricao: 0,
                            disponibilidade: 0,
                            grupo: 0,
                            grupoc: 1,
                            id: 2003,
                            listaid: 4,
                            nomefantasia: null,
                            nomeproduto: null,
                            produto_id: 2003,
                            push: 0,
                            qtd: 1,
                            status: 1,
                            valor: 0,
                        }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >So no Sal</button>
                    </li>
                    <li key={'d02'}>
                        <button onClick={() => adicionarItem({
                            avaliacao: 0,
                            combinac: 0,
                            combinag: 0,
                            descricao: 0,
                            disponibilidade: 0,
                            grupo: 0,
                            grupoc: 1,
                            id: 2004,
                            listaid: 4,
                            nomefantasia: null,
                            nomeproduto: null,
                            produto_id: 2004,
                            push: 0,
                            qtd: 1,
                            status: 1,
                            valor: 0,
                        }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Pouco Tempero</button>
                    </li>
                    <li key={'d03'}>
                        <button onClick={() => adicionarItem({
                            avaliacao: 0,
                            combinac: 0,
                            combinag: 0,
                            descricao: 0,
                            disponibilidade: 0,
                            grupo: 0,
                            grupoc: 1,
                            id: 2005,
                            listaid: 4,
                            nomefantasia: null,
                            nomeproduto: null,
                            produto_id: 2005,
                            push: 0,
                            qtd: 1,
                            status: 1,
                            valor: 0,
                        }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Mais Tempero</button>
                    </li>
                    <li key={'d04'}>
                        <button onClick={() => adicionarItem({
                            avaliacao: 0,
                            combinac: 0,
                            combinag: 0,
                            descricao: 0,
                            disponibilidade: 0,
                            grupo: 0,
                            grupoc: 1,
                            id: 2006,
                            listaid: 4,
                            nomefantasia: null,
                            nomeproduto: null,
                            produto_id: 2006,
                            push: 0,
                            qtd: 1,
                            status: 1,
                            valor: 0,
                        }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Sem Sal</button>
                    </li>
                </ul>



            </div>
            );
        }

    }
    else if (item.grupoc === 2) {
        const optionManualPrimario = itens.filter((item) => item.grupoc === 4);
        const optionManualSecundario = itens.filter((item) => item.grupoc === 4);

        if (!mostrarInventario) {
            return (<div>
                <div className='inventarioOption'>

                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualPrimario.map((item, index) => (
                            <li key={index}>
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 1)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}
                        {/* Extras Opção Ponto */}
                        <li key={'d01'} onClick={() => ocultarObservacao()}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2003,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2003,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >So no Sal</button>
                        </li>
                        <li key={'d02'}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2004,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2004,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Pouco Tempero</button>
                        </li>
                        <li key={'d03'}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2005,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2005,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Mais Tempero</button>
                        </li>
                        <li key={'d04'}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2006,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2006,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Sem Sal</button>
                        </li>
                    </ul>



                </div>
            </div>);
        }
        if (!mostrarInventario2) {
            return (<div>
                <div className='inventarioOption'>
                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualSecundario.map((item, index) => (
                            <li key={index} >
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 2)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}

                    </ul>

                </div>
            </div>);
        }
        if (!mostrarInventario3) {
            return (<div className='inventarioOption'>

                <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>

                    {/* Extras Opção Ponto */}
                    <li key={'d01'} onClick={() => ocultarObservacao()}>
                        <button onClick={() => adicionarItem({
                            avaliacao: 0,
                            combinac: 0,
                            combinag: 0,
                            descricao: 0,
                            disponibilidade: 0,
                            grupo: 0,
                            grupoc: 1,
                            id: 2003,
                            listaid: 4,
                            nomefantasia: null,
                            nomeproduto: null,
                            produto_id: 2003,
                            push: 0,
                            qtd: 1,
                            status: 1,
                            valor: 0,
                        }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >So no Sal</button>
                    </li>
                    <li key={'d02'}>
                        <button onClick={() => adicionarItem({
                            avaliacao: 0,
                            combinac: 0,
                            combinag: 0,
                            descricao: 0,
                            disponibilidade: 0,
                            grupo: 0,
                            grupoc: 1,
                            id: 2004,
                            listaid: 4,
                            nomefantasia: null,
                            nomeproduto: null,
                            produto_id: 2004,
                            push: 0,
                            qtd: 1,
                            status: 1,
                            valor: 0,
                        }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Pouco Tempero</button>
                    </li>
                    <li key={'d03'}>
                        <button onClick={() => adicionarItem({
                            avaliacao: 0,
                            combinac: 0,
                            combinag: 0,
                            descricao: 0,
                            disponibilidade: 0,
                            grupo: 0,
                            grupoc: 1,
                            id: 2005,
                            listaid: 4,
                            nomefantasia: null,
                            nomeproduto: null,
                            produto_id: 2005,
                            push: 0,
                            qtd: 1,
                            status: 1,
                            valor: 0,
                        }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Mais Tempero</button>
                    </li>
                    <li key={'d04'}>
                        <button onClick={() => adicionarItem({
                            avaliacao: 0,
                            combinac: 0,
                            combinag: 0,
                            descricao: 0,
                            disponibilidade: 0,
                            grupo: 0,
                            grupoc: 1,
                            id: 2006,
                            listaid: 4,
                            nomefantasia: null,
                            nomeproduto: null,
                            produto_id: 2006,
                            push: 0,
                            qtd: 1,
                            status: 1,
                            valor: 0,
                        }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Sem Sal</button>
                    </li>
                </ul>



            </div>
            );
        }

    }
    else if (item.grupoc === 3) {
        const optionManualPrimario = itens.filter((item) => item.grupoc === 26);
        
        if (!mostrarInventario) {
            return (<div>
                <div className='inventarioOption'>

                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualPrimario.map((item, index) => (
                            <li key={index} >
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 1)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>

                            </li>

                        ))}

                    </ul>


                </div>
            </div>);
        }
        

    }
    else if (item.grupoc === 7) {
        const optionManualPrimario = itens.filter((item) => item.grupoc === 7);

        const optionManualSecundario = itens.filter((item) => item.grupoc === 4);





        if (!mostrarInventario) {
            return (<div>
                <div className='inventarioOption'>

                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualPrimario.map((item, index) => (
                            <li key={index}>
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 1)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}
                        {/* Extras Opção Ponto */}

                    </ul>
                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        <li key={'d01'} onClick={() => ocultarObservacao()}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 3,
                                id: 52069,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 52069,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Principal</button>
                        </li> <li key={'d02'} onClick={() => ocultarObservacao('xx')}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 6,
                                id: 52070,
                                listaid: 6,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 52070,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Junto</button>
                        </li>
                        <li key={'d03'} onClick={() => ocultarObservacao('xx')}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 5,
                                id: 52071,
                                listaid: 6,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 52071,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Antes</button>
                        </li>
                    </ul>


                </div>
            </div>);
        }
        if (!mostrarInventario2) {
            return (<div>
                <div className='inventarioOption'>
                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualSecundario.map((item, index) => (
                            <li key={index} >
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 2)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}

                    </ul>

                </div>
            </div>);
        }

    }
    else if (item.grupoc === 8) {

        const optionManualPrimario = itens.filter((item) => item.grupoc === 23);
        if (!mostrarInventario) {
            return (<div>
                <div className='inventarioOption'>

                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualPrimario.map((item, index) => (
                            <li key={index} >
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 1)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>

                            </li>

                        ))}

                    </ul>


                </div>
            </div>);
        }

    } else if (item.grupoc === 9) {
        const optionManualPrimario = itens.filter((item) => item.grupoc === 24);





        if (!mostrarInventario) {
            return (<div>
                <div className='inventarioOption'>

                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualPrimario.map((item, index) => (
                            <li key={index}>
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 1)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}
                        {/* Extras Opção Ponto */}
                        <li key={'d01'} onClick={() => ocultarObservacao()}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2003,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2003,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >So no Sal</button>
                        </li>
                        <li key={'d02'}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2004,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2004,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Pouco Tempero</button>
                        </li>
                        <li key={'d03'}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2005,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2005,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Mais Tempero</button>
                        </li>
                        <li key={'d04'}>
                            <button onClick={() => adicionarItem({
                                avaliacao: 0,
                                combinac: 0,
                                combinag: 0,
                                descricao: 0,
                                disponibilidade: 0,
                                grupo: 0,
                                grupoc: 1,
                                id: 2006,
                                listaid: 4,
                                nomefantasia: null,
                                nomeproduto: null,
                                produto_id: 2006,
                                push: 0,
                                qtd: 1,
                                status: 1,
                                valor: 0,
                            }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Sem Sal</button>
                        </li>
                    </ul>



                </div>
            </div>);
        }





    }
    else if (item.grupoc === 11) {
        const optionManualPrimario = itens.filter((item) => item.grupoc === 11);
        const optionManualSecundario = itens.filter((item) => item.grupoc === 14);
        if (!mostrarInventario) {
            return (<div>
                <div className='inventarioOption'>

                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualPrimario.map((item, index) => (
                            <li key={index} >
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 1)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>

                            </li>

                        ))}

                    </ul>


                </div>
            </div>);
        }
        if (!mostrarInventario2) {
            return (<div>
                <div className='inventarioOption'>
                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualSecundario.map((item, index) => (
                            <li key={index}>
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 2)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}
                        {/* Extras Opção Ponto */}

                    </ul>

                </div>
            </div>);
        }

    }
    else if (item.grupoc === 12) {
        const optionManualPrimario = itens.filter((item) => item.grupoc === 5);
        if (!mostrarInventario) {
            return (<div>
                <div className='inventarioOption'>

                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {optionManualPrimario.map((item, index) => (
                            <li key={index} >
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 4)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>

                            </li>

                        ))}

                    </ul>


                </div>
            </div>);
        }
        

    }

   


    else {
        var itensFiltrados;
        console.log(itemSelecionado);
        console.log('aquii');

        if (itemSelecionado === 23) {
            itensFiltrados = itens.filter((item) => item.grupoc === 25);
        }
        else if (itemSelecionado === 24) {
            itensFiltrados = itens.filter((item) => item.grupoc === 25);

        }
        else if (itemSelecionado === 26) {
            itensFiltrados = itens.filter((item) => item.grupoc === 19);

        }
        else if (itemSelecionado === 4) {
            itensFiltrados = itens.filter((item) => item.grupoc === 4);
        }
        else if (itemSelecionado === 5) {
            itensFiltrados = itens.filter((item) => item.grupoc === 5);
        }
        else if (itemSelecionado === 6) {
            itensFiltrados = itens.filter((item) => item.grupoc === 19);
        }


        else {
            itensFiltrados = itens.filter((item) => item.grupoc === 8);
        }

        return (
            <div className='inventarioOp'>
                <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>

                    {itensFiltrados.map((item, index) => (
                        <li key={index} >
                            <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 4)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                        </li>
                    ))}

                    {/* Extras Opção Ponto */}
                    
                   

                </ul>
            </div>
        )
    }
}
export default Inventario;