import React, { useState } from "react";

function Opt({ id }) {
    const [selectedValue, setSelectedValue] = useState("");
    const [acompanhamentoAC, setAC] = useState("");
    const [acompanhamentoAC2, setAC2] = useState("");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const handleChangeAC = (event) => {
        setAC(event.target.value);
    };
    const handleChangeAC2 = (event) => {
        setAC2(event.target.value);
    };
    if (id === 1) {

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
                <div className="opt-pedido">
                    <h2>Acompanhamento: {acompanhamentoAC}</h2>
                    <label>
                        <input
                            type="radio"
                            value="FRITAS"
                            checked={acompanhamentoAC === "FRITAS"}
                            onChange={handleChangeAC}
                        />
                        FRITAS
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="NOISETES"
                            checked={acompanhamentoAC === "NOISETES"}
                            onChange={handleChangeAC}
                        />
                        NOISETES
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="MAGIC POTATO"
                            checked={acompanhamentoAC === "MAGIC POTATO"}
                            onChange={handleChangeAC}
                        />
                        MAGIC POTATO
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ONION RINGS"
                            checked={acompanhamentoAC === "ONION RINGS"}
                            onChange={handleChangeAC}
                        />
                        ONION RINGS
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ARROZ SIMPLES"
                            checked={acompanhamentoAC === "ARROZ SIMPLES"}
                            onChange={handleChangeAC}
                        />
                        ARROZ SIMPLES
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ARROZ BROCOLIS"
                            checked={acompanhamentoAC === "ARROZ BROCOLIS"}
                            onChange={handleChangeAC}
                        />
                        ARROZ BROCOLIS
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ARROZ PIAMONTESE"
                            checked={acompanhamentoAC === "ARROZ PIAMONTESE"}
                            onChange={handleChangeAC}
                        />
                        ARROZ PIAMONTESE
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="LEGUMES"
                            checked={acompanhamentoAC === "LEGUMES"}
                            onChange={handleChangeAC}
                        />
                        LEGUMES NO VAPOR
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="CAESER"
                            checked={acompanhamentoAC === "CAESER"}
                            onChange={handleChangeAC}
                        />
                        SALADA CAESER
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="MIX"
                            checked={acompanhamentoAC === "MIX"}
                            onChange={handleChangeAC}
                        />
                        SALADA MIX
                    </label>
                </div>
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
                <div className="opt-pedido">
                    <h2>Acompanhamento: {acompanhamentoAC}</h2>
                    <label>
                        <input
                            type="radio"
                            value="FRITAS"
                            checked={acompanhamentoAC === "FRITAS"}
                            onChange={handleChangeAC}
                        />
                        FRITAS
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="NOISETES"
                            checked={acompanhamentoAC === "NOISETES"}
                            onChange={handleChangeAC}
                        />
                        NOISETES
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="MAGIC POTATO"
                            checked={acompanhamentoAC === "MAGIC POTATO"}
                            onChange={handleChangeAC}
                        />
                        MAGIC POTATO
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ONION RINGS"
                            checked={acompanhamentoAC === "ONION RINGS"}
                            onChange={handleChangeAC}
                        />
                        ONION RINGS
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ARROZ SIMPLES"
                            checked={acompanhamentoAC === "ARROZ SIMPLES"}
                            onChange={handleChangeAC}
                        />
                        ARROZ SIMPLES
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ARROZ BROCOLIS"
                            checked={acompanhamentoAC === "ARROZ BROCOLIS"}
                            onChange={handleChangeAC}
                        />
                        ARROZ BROCOLIS
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ARROZ PIAMONTESE"
                            checked={acompanhamentoAC === "ARROZ PIAMONTESE"}
                            onChange={handleChangeAC}
                        />
                        ARROZ PIAMONTESE
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="LEGUMES"
                            checked={acompanhamentoAC === "LEGUMES"}
                            onChange={handleChangeAC}
                        />
                        LEGUMES NO VAPOR
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="CAESER"
                            checked={acompanhamentoAC === "CAESER"}
                            onChange={handleChangeAC}
                        />
                        SALADA CAESER
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="MIX"
                            checked={acompanhamentoAC === "MIX"}
                            onChange={handleChangeAC}
                        />
                        SALADA MIX
                    </label>
                </div>
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

}
export default Opt;