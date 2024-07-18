const buttons = [
    { label: 'O.K.', handleClick: () => handleClick('O.K.'), className: 'H' },
    { label: 'IMPRIMIR', handleClick: () => handleClick('conta'), className: 'D', disabled: IsImprimirValido(atendente) ? false : true, visualizar: IsImprimirValido(atendente) ? 'block' : 'none' },

    {
        label: 'Receber',
        handleClick: handleMostrarFormulario,
        className: IsReceberConta(atendente) ? 'D' : 'C',
        disabled: !IsReceberConta(atendente),
        visualizar: IsReceberConta(atendente) ? 'block' : 'none',
    },
    {
        label: 'Desconto',
        handleClick: () => handleClick('desconto'),
        className: IsReceberConta(atendente) ? 'B' : 'C',
        disabled: !IsReceberConta(atendente),
        visualizar: IsReceberConta(atendente) ? 'block' : 'none',
    },
    {
        label: 'CANCELAR',
        handleClick: () => handleClick('cancelar'),
        className: isCancelarValido(atendente) ? 'L' : 'C',
        disabled: isCancelarValido(atendente) ? false : true,
        visualizar: isCancelarValido(atendente) ? 'block' : 'none',
    },
    {
        label: 'BLOQUEAR',
        handleClick: () => handleClick('bloquear'),
        className: isCancelarValido(atendente) ? 'L' : 'C',
        disabled: isCancelarValido(atendente) ? false : true,
        visualizar: isCancelarValido(atendente) ? 'block' : 'none',
    },
    {
        label: 'CAIXA',
        handleClick: handleMostrarCaixaStatus,
        className: isGestorValido(atendente) ? 'CX' : 'C',
        disabled: isCaixaValido(atendente) ? false : true,
        visualizar: isGerenteValido(atendente) ? 'block' : 'none',
    },
    { label: 'COZINHA', className: 'B', visualizar: isGerenteValido(atendente) ? 'block' : 'none' },
    { label: 'FECHAR', handleClick: () => handleClick('fechar'), className: 'F' },
    {
        label: 'Zerar Gorjeta', handleClick: removerGorjeta,
        className: GORJETA === 0 ? 'A' : 'B',
        visualizar: isGerenteValido(atendente) ? 'block' : 'none',
    },
    {
        label: 'GORJETA 10%', handleClick: () => adicionarGorjeta(10),
        className: GORJETA === 0.10 ? 'A' : 'B'
    },
    {
        label: 'GORJETA 11%', handleClick: () => adicionarGorjeta(11),
        className: GORJETA === 0.11 ? 'A' : 'B'
    },
    {
        label: 'GORJETA 12%', handleClick: () => adicionarGorjeta(12),
        className: GORJETA === 0.12 ? 'A' : 'B'
    },
    {
        label: 'Remover', handleClick: () => handleClick('remover'),
        className: isCaixaValido(atendente) ? 'A' : 'C',
        disabled: isCaixaValido(atendente) ? false : true,
        visualizar: isCaixaValido(atendente) ? 'block' : 'none',
    },
    { label: 'Dividir Conta', handleClick: () => handleClick('fechar'), className: 'F', disabled: isDividirMesaValido(atendente) ? true : false, visualizar: isDividirMesaValido(atendente) ? 'block' : 'none' },
    { label: 'mudar area', handleClick: () => handleMudarArea(), className: mudarAreaComanda ? 'A' : 'C', disabled: isTransferirAreaComandaValido(atendente) ? false : true, visualizar: isTransferirAreaComandaValido(atendente) ? 'block' : 'none' },
    { label: 'mudar atendente', handleClick: () => handleMudarAtendimento(), className: botaoMudarAtendenteComanda ? 'A' : 'C', disabled: isTransferirAtendenteValido(atendente) ? false : true, visualizar: isTransferirAtendenteValido(atendente) ? 'block' : 'none' },
];

export default buttons;