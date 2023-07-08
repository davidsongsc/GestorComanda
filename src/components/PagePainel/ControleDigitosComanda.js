import React from "react";


const ControleDigitosComanda = ({ handleTeclado }) => {
    return (<div className='controlea'>
        <div className='digitosComanda'>
            <div className='g2'>
                <button onClick={() => handleTeclado(1)}>1</button>
                <button onClick={() => handleTeclado(2)}>2</button>
                <button onClick={() => handleTeclado(3)}>3</button>
            </div>
            <div className='g2'>
                <button onClick={() => handleTeclado(4)}>4</button>
                <button onClick={() => handleTeclado(5)}>5</button>
                <button onClick={() => handleTeclado(6)}>6</button>
            </div>
            <div className='g2'>
                <button onClick={() => handleTeclado(7)}>7</button>
                <button onClick={() => handleTeclado(8)}>8</button>
                <button onClick={() => handleTeclado(9)}>9</button>
            </div>
            <div className='g2'>
                <button onClick={() => handleTeclado('A')}>A</button>
                <button onClick={() => handleTeclado(0)}>0</button>
                <button onClick={() => handleTeclado('B')}>B</button>
            </div>
        </div>
    </div>)
}

export default ControleDigitosComanda;