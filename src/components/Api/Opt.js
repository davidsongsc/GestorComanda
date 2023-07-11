import React, { useState, useEffect } from "react";

function Opt({ id, mesas }) {
    const [selectedValue, setSelectedValue] = useState("");
    const [acompanhamentoAC2, setAC2] = useState("");
    const nome = 'maquina'
    const token = 'abc123'
    const [itens, setItens] = useState([]);
    const [mesa, setMesa] = useState(mesas);
    const [showModal, setShowModal] = useState(false);
    const [comanda, setComanda] = useState([]);
    const [tipoItem, setTipoItem] = useState();
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        function carregarComanda() {

            fetch(`https://dagesico.pythonanywhere.com/comandas?nome=${nome}&token=${token}&version=100a`)
                .then(response => response.json())
                .then(data => {
                    const comandaMesa = data.filter(comad => comad.mesa === parseInt(id));

                    comandaMesa.map(listaComanda => (

                        setMesa(listaComanda.mesa),
                        setComanda(listaComanda.itens[0].map(item => ({ ...item, })))

                    ));
                })
                .catch(error => console.error(error));

            fetch(`https://dagesico.pythonanywhere.com/produtos?nome=${nome}&token=${token}&version=100a`)
                .then(response => response.json())
                .then(data => {
                    setItens(data.produtos);
                    localStorage.setItem('produtos', JSON.stringify(data.produtos));
                })
                .catch(error => console.error(error));
        }

        carregarComanda();
    }, [id, nome, token]);
    // demais códigos de renderização e manipulação de estado
    const nomeProduto = (produto_id) => {
        const val = itens.filter(o => o.id === produto_id)
        if (val.length > 0 && val[0].nomeproduto) {
            return val[0].nomeproduto
        } else {
            return produto_id
        }
    }

    const adicionarItem = (item) => {

        const itemExistente = itens.find((i) => i.nome === item.nomeproduto);

        if (itemExistente) {

            setComanda(
                comanda.map((i) =>
                    i.nome === item.nomeproduto ? { ...i, qtd: i.qtd + 1 } : i
                )
            );
        } else {
            setComanda([...comanda, { ...item, qtd: 1, produto_id: item.id }]);
            console.log(item)
            if (item.grupoc === 1) {
                setTipoItem(1)
                toggleModal()
            }
            else if (item.grupoc === 2) {
                setTipoItem(2)
                toggleModal()
            }

        }
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    
    const handleChangeAC2 = (event) => {
        setAC2(event.target.value);
    };
    if (id === 1) {

        return (

            <div className="painel-cozinha">


                
                <div className="opt-pedido">
                    <h2>Acompanhamento 2: {acompanhamentoAC2}</h2>
                    <label>
                        <input
                            type="radio"
                            value="FRITAS"
                            checked={acompanhamentoAC2 === "FRITAS"}
                            onChange={handleChangeAC2}
                        />
                        FRITAS
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="NOISETES"
                            checked={acompanhamentoAC2 === "NOISETES"}
                            onChange={handleChangeAC2}
                        />
                        NOISETES
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="MAGIC POTATO"
                            checked={acompanhamentoAC2 === "MAGIC POTATO"}
                            onChange={handleChangeAC2}
                        />
                        MAGIC POTATO
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ONION RINGS"
                            checked={acompanhamentoAC2 === "ONION RINGS"}
                            onChange={handleChangeAC2}
                        />
                        ONION RINGS
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ARROZ SIMPLES"
                            checked={acompanhamentoAC2 === "ARROZ SIMPLES"}
                            onChange={handleChangeAC2}
                        />
                        ARROZ SIMPLES
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ARROZ BROCOLIS"
                            checked={acompanhamentoAC2 === "ARROZ BROCOLIS"}
                            onChange={handleChangeAC2}
                        />
                        ARROZ BROCOLIS
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ARROZ PIAMONTESE"
                            checked={acompanhamentoAC2 === "ARROZ PIAMONTESE"}
                            onChange={handleChangeAC2}
                        />
                        ARROZ PIAMONTESE
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="LEGUMES"
                            checked={acompanhamentoAC2 === "LEGUMES"}
                            onChange={handleChangeAC2}
                        />
                        LEGUMES NO VAPOR
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="CAESER"
                            checked={acompanhamentoAC2 === "CAESER"}
                            onChange={handleChangeAC2}
                        />
                        SALADA CAESER
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="MIX"
                            checked={acompanhamentoAC2 === "MIX"}
                            onChange={handleChangeAC2}
                        />
                        SALADA MIX
                    </label>
                </div>

            </div>


        )
    }
    if (id === 2) {


        return (

            <div className="painel-cozinha">


                <div className="opt-pedido">
                    <h2>Ponto do Steak: {selectedValue}</h2>
                    <label>
                        <input
                            type="radio"
                            value="MAL PASSADO"
                            checked={selectedValue === "MAL PASSADO"}
                            onChange={handleChange}
                        />
                        Mal Passado
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="AO PONTO"
                            checked={selectedValue === "AO PONTO"}
                            onChange={handleChange}
                        />
                        Ao ponto
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="BEM PASSADO"
                            checked={selectedValue === "BEM PASSADO"}
                            onChange={handleChange}
                        />
                        Bem passado
                    </label>
                </div>


            </div>


        )
    }

}
export default Opt;