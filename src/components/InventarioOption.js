import React, { useState, useEffect } from "react";

function Inventario({ opt,  itens, listaRef, adicionarItem, scrollTop, handleScrollDown, handleScrollUp }) {


    console.log(itens)
    

    if (opt === 1) {
        const pontoCarne = itens.filter((item) => item.grupoc === 1);
        const acompanhamentoUm = itens.filter((item) => item.grupoc === 4);
        const acompanhamentoDois = itens.filter((item) => item.grupoc === 4);
        return (
            <>
                <div className='inventarioOption'>
                    <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '705px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                        {pontoCarne.map((item, index) => (
                            <li key={index}>
                                <button className={`GPX${item.grupo}`} onClick={() => adicionarItem(item)} style={{ height: '13vh', width: '14vh' }}>{item.nomeproduto}</button>
                            </li>
                        ))}
                    </ul>

                    <div>
                        <button onClick={handleScrollUp}>↑</button>
                        <button onClick={handleScrollDown}>↓</button>

                    </div>

                </div>
                
            </>
        )
    }
    else {
        const itensFiltrados = itens.filter((item) => item.grupoc === opt);
        return (
            <div className='inventario'>
                <ul ref={listaRef} style={{ display: 'flex', flexWrap: 'wrap', height: '705px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                    {itensFiltrados.map((item, index) => (
                        <li key={index}>
                            <button className={`GPX${item.grupo}`} onClick={() => adicionarItem(item)} style={{ height: '13vh', width: '14vh' }}>{item.nomeproduto}</button>
                        </li>
                    ))}
                </ul>

                <div>
                    <button onClick={handleScrollUp}>↑</button>
                    <button onClick={handleScrollDown}>↓</button>

                </div>

            </div>
        )
    }
}
export default Inventario;