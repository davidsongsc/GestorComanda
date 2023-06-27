import React, { useState, useEffect } from 'react';

const TecladoNumerico = ({ handleValorPagamentoChange, handleTecladoSelecionar }) => {
    const [teclado, setTeclado] = useState('');

    const handleTeclado = (tecla) => {
        let novoTeclado = '';

        if (tecla === 'C' || tecla === 'c') {
            novoTeclado = teclado.slice(0, -1); // Remove o último dígito
        } else if (tecla === 'B' || tecla === 'b') {
            novoTeclado = '';
        } else {
            novoTeclado = teclado + tecla.toString();
        }

        setTeclado(novoTeclado);

        const valor = novoTeclado !== '' ? novoTeclado : '0.00';

        const event = {
            target: {
                value: valor,
            },
        };

        handleValorPagamentoChange(event);
    };
    useEffect(() => {
        if (handleTecladoSelecionar() || teclado === ''){
            handleTeclado('B');
        }
    }, []);

    return (
        <div className='pagament-class-pg-div'>
            <div className='digitosComanda'>
                
                
                <div className='g2'>
                    <button type='button' onClick={() => handleTeclado(7)}>7</button>
                    <button type='button' onClick={() => handleTeclado(8)}>8</button>
                    <button type='button' onClick={() => handleTeclado(9)}>9</button>
                </div>
                <div className='g2'>
                    <button type='button' onClick={() => handleTeclado(4)}>4</button>
                    <button type='button' onClick={() => handleTeclado(5)}>5</button>
                    <button type='button' onClick={() => handleTeclado(6)}>6</button>
                </div>
                <div className='g2'>
                    <button type='button' onClick={() => handleTeclado(1)}>1</button>
                    <button type='button' onClick={() => handleTeclado(2)}>2</button>
                    <button type='button' onClick={() => handleTeclado(3)}>3</button>
                </div>
                <div className='g2'>
                    <button type='button' onClick={() => handleTeclado('C')}>C</button>
                    <button type='button' onClick={() => handleTeclado(0)}>0</button>
                    <button type='button' onClick={() => handleTeclado('B')}>B</button>
                </div>
            </div>
        </div>
    );
};

export default TecladoNumerico;
