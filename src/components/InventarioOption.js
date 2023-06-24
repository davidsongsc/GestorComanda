import React, { useState, useEffect } from "react";


function Inventario({ item, toggleModal, mostrarInventario, setMostrarInventario, mostrarInventario2, setMostrarInventario2, mostrarInventario3, setMostrarInventario3, opt, itens, listaRef, adicionarItem, scrollTop }) {
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

    function ocultarObservacao() {
        setObservacao('false');
    }
    function ivAdd(item, i) {
        adicionarItem(item)
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


    if (item.grupoc === 1) {
        const optionManualPrimario = itens.filter((item) => item.grupoc === 1);
        const optionManualSecundario = itens.filter((item) => item.grupoc === 4);
        const optionManualTerceiro = itens.filter((item) => item.grupoc === 4);





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
    else {
        var itensFiltrados;
        console.log(itemSelecionado);
        console.log('aquii');

        if (itemSelecionado === 4) {
            itensFiltrados = itens.filter((item) => item.grupoc === 4);
        }
        else if (itemSelecionado === 5) {
            itensFiltrados = itens.filter((item) => item.grupoc === 5);
        }
        else if (itemSelecionado === 6) {
            itensFiltrados = itens.filter((item) => item.grupoc === 4);
        }


        else {
            itensFiltrados = itens.filter((item) => item.grupoc === 19);
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
                    <li key={'d01'} onClick={() => ocultarObservacao()}>
                        <button onClick={() => adicionarItem({
                            avaliacao: 0,
                            combinac: 0,
                            combinag: 0,
                            descricao: 0,
                            disponibilidade: 0,
                            grupo: 0,
                            grupoc: 5,
                            id: 52069,
                            listaid: 6,
                            nomefantasia: null,
                            nomeproduto: null,
                            produto_id: 52069,
                            push: 0,
                            qtd: 1,
                            status: 1,
                            valor: 0,
                        }, 'M')} className={observacao} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Principal</button>
                    </li>
                    <li key={'d02'}>
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
                    <li key={'d03'}>
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
        )
    }
}
export default Inventario;