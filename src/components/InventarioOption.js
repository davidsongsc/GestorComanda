import React, { useState, useEffect } from "react";

function Inventario({ opt, itens, listaRef, adicionarItem, scrollTop, handleScrollDown, handleScrollUp }) {


    console.log(itens)
    const itensFiltrados = itens.filter((item) => item.grupoc === opt);
    console.log(itensFiltrados);
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
export default Inventario;