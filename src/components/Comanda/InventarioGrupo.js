import React, { useEffect, useState } from "react";
import { ipNucleo } from "../principal/ExtensoesApi";

const nome = 'maquina';
const token = 'abc123';


function InventarioGrupo({ filtrarPorGrupo, id }) {
    const [grupo, setGrupo] = useState([]);

    //console.log(filtrarPorGrupo)
    useEffect(() => {

        fetch(`${ipNucleo}/grupos?nome=${nome}&token=${token}&version=100a`)
            .then(response => response.json())
            .then(data => {
                const grupoArray = data.grupos.filter(comad => comad.grupoc === 1);

                setGrupo(grupoArray.map(listaGrupo => (
                    {
                        nome: listaGrupo.nome,
                        id: listaGrupo.estilo
                    }
                )
                ));
            })
            .catch(error => console.error(error));


    }, [id, nome, token]);
    return (
        <div className='grupo-produto'>
        {grupo.map((item, index) => (
          <button key={index} className={`GPX${item.id}`} onClick={() => filtrarPorGrupo(item.id)}>{item.nome}</button>
        ))}
      </div>
    )
}
export default InventarioGrupo;