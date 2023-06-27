import React, { useState } from 'react';

import TecladoNumerico from './Teclado';
import JanelaAlerta from './JanelaAlerta';
const PagamentoForm = ({
    handleMostrarFormularioConfirm,
    setNotification,
    setPagamento,
    finalizarComanda,
    calcularValorRestante,
    adicionarItem,
}) => {
    const [restaurarStatus, setRestaurarStatus] = useState(false);
    const [valorTotalPago, setValorTotalPago] = useState('');
    const [valorPagamento, setValorPagamento] = useState('');
    const [bandeiraCartao, setBandeiraCartao] = useState('');

    const [metodosPagamento, setMetodosPagamento] = useState([
        { nome: 'Visa Crédito', numero: 901 },
        { nome: 'Visa Débito', numero: 902 },
        { nome: 'Mastercard', numero: 903 },
        { nome: 'Maestro', numero: 904 },
        { nome: 'Amex', numero: 905 },
        { nome: 'Elo Crédito', numero: 906 },
        { nome: 'Elo Débito', numero: 907 },
        { nome: 'Dinheiro', numero: 908 },
        { nome: 'Pix', numero: 909 },
        { nome: 'Visa Vale', numero: 910 },
        { nome: 'Green Card', numero: 911 },
        { nome: 'Ticket Restaurante', numero: 912 },
        { nome: 'Sodexo', numero: 913 },
        // Adicione outros métodos de pagamento aqui
    ]);
    const handleNotification = (notificacao) => {
        setNotification(notificacao);
    }
    const handleValorPagamentoChange = (e) => {
        let valor = e.target.value;

        // Verifica se o valor é uma string antes de realizar as operações
        if (typeof valor === 'string') {
            // Remove espaços em branco no início e no final do valor
            valor = valor.trim();

            // Remove todos os caracteres que não sejam números ou pontos decimais
            valor = valor.replace(/[^\d.]/g, '');

            // Remove zeros à esquerda do valor, exceto se for zero completo
            valor = valor.replace(/^0+(?!$)/, '');

            // Verifica se o valor é um número válido e não é negativo
            if (!isNaN(valor) && valor !== '' && parseFloat(valor) >= 0) {
                // Verifica se o valor possui um ponto decimal
                if (valor.includes('.')) {
                    // Remove todos os pontos decimais extras
                    valor = valor.replace(/\./g, '');

                    // Divide o valor por 100 para converter para float
                    valor = parseFloat(valor) / 100;

                    // Mantém duas casas decimais, adicionando zeros à direita, se necessário
                    valor = valor.toFixed(2);

                } else {
                    // Adiciona zeros à esquerda para manter a formatação correta
                    valor = (valor + '00').slice(0, -2);

                    // Divide o valor por 100 para converter para float
                    valor = parseFloat(valor) / 100;
                }
            } else {
                valor = 0.00;
            }
        } else {
            valor = 0.00;
        }

        setValorPagamento(valor);
    };


    const handleSelectCartao = (bandeira) => {
        var valorRestante = calcularValorRestante();
        console.log(valorPagamento);
        console.log(parseFloat(valorRestante.replace(',', '.')));
        if (valorPagamento <= parseFloat(valorRestante.replace(',', '.')) && valorPagamento > 0) {

            setPagamento(valorPagamento);
            
            setBandeiraCartao(bandeira.nome);
            handleNotification(`Adicionado R$ ${valorPagamento}.`)
            setRestaurarStatus(true);
            adicionarItem(
                {
                    avaliacao: 0,
                    combinac: 2,
                    combinag: 900,
                    descricao: 0,
                    disponibilidade: 0,
                    grupo: 0,
                    grupoc: 0,
                    id: bandeira.numero,
                    listaid: 4,
                    nomefantasia: null,
                    nomeproduto: null,
                    produto_id: 999,
                    push: 0,
                    qtd: 0,
                    status: 1,
                    valor: valorPagamento,
                },
                'M'
            );

            finalizarComanda(valorPagamento.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }), valorRestante.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }));
            setBandeiraCartao('');
            setValorTotalPago('');
            setValorPagamento('');
            

            return bandeira.nome;
        }
        else {
            handleNotification(`R$ ${valorPagamento} é maior que o valor atual da conta.`)
        }
    };



    function handleTecladoSelecionar() {
        if (restaurarStatus === true){
            setRestaurarStatus(false);
        }
        return restaurarStatus;
    }

    return (
        <>
            {handleMostrarFormularioConfirm() ? <JanelaAlerta /> :
                <form >

                    <div className='pagament-class-pg-div'>
                        <input
                            
                            type='text'
                            id='valorPagamento'
                            value={valorPagamento !== '' ? parseFloat(valorPagamento).toFixed(2) : ''}
                            style={{
                                width: '180px',
                                height: '50px',
                                fontSize: '40px',
                                fontWeight: '900',
                                fontFamily: 'monospace'
                            }}
                            onChange={handleValorPagamentoChange}
                        />

                    </div>

                    <TecladoNumerico
                        handleValorPagamentoChange={handleValorPagamentoChange}
                        handleTecladoSelecionar={handleTecladoSelecionar}
                    />

                    <div className='pagament-class-pg-div'>
                        {metodosPagamento.map(metodo => (

                            <button
                                key={metodo.numero}
                                type='button'
                                style={{ width: '115px', height: '75px', margin: '8px 8px' }}
                                className={bandeiraCartao === metodo.nome ? 'selected' : 'selectedn'}
                                onClick={() => handleSelectCartao(metodo)}
                            >
                                {metodo.nome}
                            </button>

                        ))}
                    </div>
                </form>
            }



        </ >
    );
};

export default PagamentoForm;
