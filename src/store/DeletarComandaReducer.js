const handleDeletarComandaReducer = (state, idMesa, valorComanda, atendente, handleClick) => {
    const data = {
        id: idMesa,
        status: 6,
        atendente: atendente.usuario,
        valor: valorComanda
    };

    socket.emit('deletar_status_comanda_nova', socket.id, data);
    handleClick(idMesa);

    return state.map((prevMesa) =>
        prevMesa.mesa === idMesa ? { ...prevMesa, aberta: true, status: 2 } : prevMesa
    );
};

export default handleDeletarComandaReducer;
