import React, { useState, useEffect } from "react";

function InventarioGrupo({ filtrarPorGrupo, mostrarTodos }) {
    return (
        <div className='grupo-produto'>
            <button className='GPX1' onClick={mostrarTodos}>Todos</button>
            <button className='GPX6615' onClick={() => filtrarPorGrupo(6615)}>Entradas</button>
            <button className='GPX9' onClick={() => filtrarPorGrupo(9)}>Combinados</button>
            <button className='GPX13' onClick={() => filtrarPorGrupo(13)}>Burguer</button>
            <button className='GPX2' onClick={() => filtrarPorGrupo(50)}>Bebidas</button>
            <button className='GPX3' onClick={() => filtrarPorGrupo(31)}>Drinks</button>
            <button className='GPX10' onClick={() => filtrarPorGrupo(10)}>Executivo</button>
            <button className='GPX7106' onClick={() => filtrarPorGrupo(7106)}>Sobremesas</button>
            <button className='GPX12' onClick={() => filtrarPorGrupo(12)}>Ribs</button>
            <button className='GPX12' onClick={() => filtrarPorGrupo(600)}>Acompanha...</button>
            <button className='GPX7' onClick={() => filtrarPorGrupo(6)}>Frango</button>
            <button className='GPX9' onClick={() => filtrarPorGrupo(6)}>Doses</button>
            <button className='GPX9' onClick={() => filtrarPorGrupo(6)}>Doses</button>
            <button className='GPX0' onClick={() => filtrarPorGrupo(0)}>EXTRAS</button>
        </div>
    )
}
export default InventarioGrupo;