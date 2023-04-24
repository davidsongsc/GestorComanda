import React, { useState, useEffect } from "react";

function Inventario({ itensFiltrados, listaRef, adicionarItem, scrollTop, handleScrollDown, handleScrollUp }) {
    return (
        <div className='inventario'>
            <ul ref={listaRef} style={{ height: '483px', width: '900px', overflow: 'auto', position: 'relative', top: `${scrollTop}px` }}>
                {itensFiltrados.map((item, index) => (
                    <li key={index}>
                        <button className={`GPX${item.grupo}`} onClick={() => adicionarItem(item)}>{item.nomeproduto}</button>
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