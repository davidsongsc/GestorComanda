
import React from "react";

function InventarioOptList(grupoc,
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
    scrollTop) {

    const optionManualPrimario = itens.filter((item) => item.grupoc === 5);
    const optionManualSecundario = itens.filter((item) => item.grupoc === 5);

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


};

export default InventarioOptList;