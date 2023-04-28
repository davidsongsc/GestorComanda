import React, { useState, useEffect } from "react";

function verificador(opcao) {
    if (opcao === 13) {
        return 12
    }
    else {
        return opcao
    }


}

function Inventario({ item, toggleModal, mostrarInventario, setMostrarInventario, mostrarInventario2, setMostrarInventario2, qop, opt, itens, listaRef, adicionarItem, scrollTop, handleScrollDown, handleScrollUp }) {
    const alturaBotao = '15vh';
    const larguraBotao = '15vh';
    const [mostrarInventario3, setMostrarInventario3] = useState(false);
    const [comandas, setComandas] = useState([]);
    console.log(item)
    const handleAbrirInventario = () => {
        setMostrarInventario(true);
    };
    const handleAbrirInventario2 = () => {
        setMostrarInventario2(true);
    };

    const handleAbrirInventario3 = () => {
        setMostrarInventario3(true);
    };

    function ivAdd(item, i) {
        adicionarItem(item)
        if (i === 1) {
            handleAbrirInventario();
        } else if (i === 2) {
            handleAbrirInventario2();
        }
        else if (i === 3) {
            toggleModal();
        } else if (i === 4) {
            handleAbrirInventario3();
        }

    }


    if (opt === 1) {
        const pontoCarne = itens.filter((item) => item.grupoc === 1);
        const acompanhamentoUm = itens.filter((item) => item.grupoc === 4);




        if (!mostrarInventario) {
            return (<div>
                <div className='inventarioOption'>

                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {pontoCarne.map((item, index) => (
                            <li key={index}>
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 1)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}
                        {/* Extras Opção Ponto */}
                        <li key={'d01'}>
                            <button onClick={() => adicionarItem({
                                id: 2003,
                                nomeproduto: '',
                                nomefantasia: '',
                                valor: 0,
                                descricao: '-',
                                grupoc: 1,
                            }, 'M')} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >So no Sal</button>
                        </li>
                        <li key={'d02'}>
                            <button onClick={() => adicionarItem({
                                id: 2004,
                                nomeproduto: '',
                                nomefantasia: '',
                                valor: 0,
                                descricao: '-',
                                grupoc: 1,
                            }, 'M')} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Pouco Tempero</button>
                        </li>
                        <li key={'d03'}>
                            <button onClick={() => adicionarItem({
                                id: 2005,
                                nomeproduto: '',
                                nomefantasia: '',
                                valor: 0,
                                descricao: '-',
                                grupoc: 1,
                            }, 'M')} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Mais Tempero</button>
                        </li>
                        <li key={'d04'}>
                            <button onClick={() => adicionarItem({
                                id: 2006,
                                nomeproduto: '',
                                nomefantasia: '',
                                valor: 0,
                                descricao: '-',
                                grupoc: 1,
                            }, 'M')} style={{ height: alturaBotao, width: larguraBotao, backgroundColor: 'brown' }} >Sem Sal</button>
                        </li>
                    </ul>



                </div>
            </div>);
        }
        if (!mostrarInventario2) {
            return (<div>
                <div className='inventarioOption'>
                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {acompanhamentoUm.map((item, index) => (
                            <li key={index} >
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 4)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}

                    </ul>

                </div>
            </div>);
        }

    } else if (opt === 11) {
        const pontoCarne = itens.filter((item) => item.grupoc === 11);
        const acompanhamentoUm = itens.filter((item) => item.grupoc === 13);




        if (!mostrarInventario) {
            return (<div>
                <div className='inventarioOption'>

                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {pontoCarne.map((item, index) => (
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
                        {acompanhamentoUm.map((item, index) => (
                            <li key={index}>
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 2)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}
                        {/* Extras Opção Ponto */}
              
                    </ul>

                </div>
            </div>);
        }
        if (!mostrarInventario3) {
            return (<div>
                <div className='inventarioOption'>
                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {acompanhamentoUm.map((item, index) => (
                            <li key={index} >
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 2)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}

                    </ul>

                </div>
            </div>);
        }

    } else if (opt === 15) {
        const pontoCarne = itens.filter((item) => item.grupoc === 11);
        const acompanhamentoUm = itens.filter((item) => item.grupoc === 13);

        if (!mostrarInventario) {
            return (<div>
                <div className='inventarioOption'>

                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {pontoCarne.map((item, index) => (
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
                        {acompanhamentoUm.map((item, index) => (
                            <li key={index}>
                                <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 2)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                            </li>
                        ))}

                    </ul>

                </div>
            </div>);
        }

    }
    else {
        const itensFiltrados = itens.filter((item) => item.grupoc === verificador(opt));

        const handleAbrirInventario3 = () => {
            setMostrarInventario3(true);
        };
        return (
            <div className='inventarioOp'>
                <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '648px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                    {itensFiltrados.map((item, index) => (
                        <li key={index} >
                            <button className={`GPX${item.grupo}`} onClick={() => ivAdd(item, 3)} style={{ height: alturaBotao, width: larguraBotao }}>{item.nomeproduto}</button>
                        </li>
                    ))}
                </ul>


            </div>
        )
    }
}
export default Inventario;