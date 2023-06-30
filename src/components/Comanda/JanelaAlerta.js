import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const JanelaAlerta = ({
    finalizarComanda,
    valorRestante,
    valorPagamento
}) => {
    const handleVerificarConta = () => {
        finalizarComanda(valorPagamento, valorRestante, 1)
    }
    return (
        <div className='janela-alerta-comanda-pn'>
            <ul>
                <li>
                    <Button size='lg' >CPF / CNPJ</Button>
                </li>
                <li>
                    <Button size='lg'>Emissão Comprovante</Button>
                </li>
                <li>
                    <Button size='lg'>Cartão Socio</Button>
                </li>
                <li>
                    <Button size='lg' style={{background:'brown'}} onClick={() => handleVerificarConta()}>Emissão Nota Fiscal</Button>
                </li>
            </ul>






        </div>
    );
};

export default JanelaAlerta;
