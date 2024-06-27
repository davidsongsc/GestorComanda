const removerItem = (
    atendente,
    mesaId,
    selectedItemId,
    comanda,
    setSelectedItems,
    setComanda,
    selectedItems,
    selectCombinaG,
    handleNotification,
    handleDelItem,
    handleComandaFilter,
    nomeProdutoSis,
    valorProduto,
    setCombinaG
) => {

    if (atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))) {
        // Filtra as linhas que não estão selecionadas
        const novaComanda = comanda.filter((_, i) => !selectedItems.includes(i));
        // Atualiza o estado da comanda com as linhas restantes

        if (selectCombinaG > 899) {
            //aqui
            setComanda(novaComanda);

            handleDelItem({
                "comanda": mesaId,
                "produto": handleComandaFilter(selectedItemId, comanda),
                "nomesis": nomeProdutoSis(handleComandaFilter(selectedItemId, comanda)),
                "atendente": atendente.usuario,
                "valor": valorProduto(handleComandaFilter(selectedItemId, comanda)),
                "anotacoes": handleComandaFilter(selectedItemId, comanda),
            });
            setCombinaG(null);
        }
        else {
            handleNotification('Este produto não pode ser removido!')
        }

        // Limpa as seleções
        setSelectedItems([]);
    }
};

export default removerItem;