import React, { useState, useRef, useEffect } from "react";

function TelaOption({
  cmdComanda,
  showModal,
  toggleModal,
  itens,
  listaRef,
  adicionarItem,
  grupoCompain
}) {
  const [contagem, setContagem] = useState(0);
  const [modalItem, setModalItem] = useState(null);
  const [limite, setLimite] = useState(1);
  const [descricaoProduto, setDescricaoProduto] = useState(""); // Estado para armazenar a descrição do produto selecionado
  const [tabela, setItens] = useState(null);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [displayOption1, setDisplayOption1] = useState("block");
  const [displayOption2, setDisplayOption2] = useState("none");
  const [verificado, setVerificado] = useState(false);
  const [indice, setIndice] = useState(null);
  const [v, setV] = useState(0);


  useEffect(() => {
    if (contagem >= limite) {
      toggleModal();
      setContagem(0);
      setV(0);

      console.log("Limite..");
    }
  }, [contagem]);

  useEffect(() => {
    setItemSelecionado(grupoCompain);
  }, [modalItem]);

  const handleContador = () => {
    setContagem((prevContagem) => prevContagem + 1);
    console.log("Contagem:", contagem);
  };

  const handleOptionClick = (index) => {
    if (index === 0) {
      setDisplayOption1("block");
      setDisplayOption2("none");
    } else if (index === 1) {
      setDisplayOption1("none");
      setDisplayOption2("block");
    }
  };

  const ivAdd = (item, i) => {
    setVerificado(!verificado);
    setIndice(i);
    adicionarItem(item);
    handleContador(+1);
    setDescricaoProduto(item.descricao);
  };

  useEffect(() => {
    const limitePorGrupo = {
      1: 5,
      2: 3,
      3: 4,
      4: 2,
      5: 3,
      6: 3,
      7: 4,
      8: 4,
      9: 2,
      10: 3,
      11: 2,
      12: 4,
      13: 3,
      14: 3,
      15: 3,
      16: 3,
    };

    const itemModal = cmdComanda.find((item) => {
      setItens(item);
      setLimite(limitePorGrupo[grupoCompain] || 2);
      return item.grupoc === grupoCompain;
    });

    setModalItem(itemModal);
  }, [cmdComanda, grupoCompain]);

  const pontoCarnes = 1;              // corresponde ao ponto do prato.
  const modoPreparo = 2;               // corresponde ao modo de preparo do prato.
  const molhoPreparo = 3;              // corresponde ao molho do preparo.
  const tipoTempero = 5;                 // corresponde ao tipo de tempero.
  const tipoMassa = 4;                 // corresponde ao tipo da massa.
  const opcaoMolho = 6;                 // corresponde ao tipo da massa.
  const opcaoPao = 7;                   // Opção Para pratos com molhos
  const acAperitivoS1 = 8;              // Acompanhamento de aperitivo
  const saborRecheioOp1 = 9;            // Recheio opções 1
  const acompanhamentoExecutivo = 201;  // corresponde ao acompanhamento.
  const saladaExecutivo = 202;
  const inventarioExtra = 99;           // corresponde ao menu oculto / EXTRA
  const inventarioOptions = {
    /* Produto sem Opções */

    0: {
      nome: "Vazio",
      options: [

        { filter: (item) => item.grupoc === inventarioExtra },
        { filter: (item) => item.grupoc === inventarioExtra }
      ]
    },


    1: {
      nome: "Opção Steak Premium Executivo ",
      options: [
        { filter: (item) => item.grupoc === pontoCarnes },
        { filter: (item) => item.grupoc === modoPreparo },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === saladaExecutivo },
        { filter: (item) => item.grupoc === inventarioExtra }
      ]
    },
    2: {
      nome: "Opção Padrão",
      options: [
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === saladaExecutivo },
        { filter: (item) => item.grupoc === inventarioExtra }

      ]
    },
    3: {
      nome: "Opção Padrão",
      options: [
        { filter: (item) => item.grupoc === pontoCarnes },  // option/1 corresponde ao ponto do prato.
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },  // option/3 corresponde ao primeiro acompanhamento.
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },  // option/4 corresponde ao segundo acompanhamento.
        { filter: (item) => item.grupoc === saladaExecutivo }, // option/5 corresponde a salada de entrada.
        { filter: (item) => item.grupoc === inventarioExtra }  // corresponde ao menu oculto / EXTRA
      ]
    },
    4: {
      nome: "Opção Padrão",
      options: [
        { filter: (item) => item.grupoc === molhoPreparo },
        { filter: (item) => item.grupoc === saladaExecutivo },
        { filter: (item) => item.grupoc === inventarioExtra }
      ]
    },
    5: {
      nome: "Opção Padrão",
      options: [
        { filter: (item) => item.grupoc === tipoMassa },
        { filter: (item) => item.grupoc === molhoPreparo },
        { filter: (item) => item.grupoc === saladaExecutivo },
        { filter: (item) => item.grupoc === inventarioExtra },
      ]
    },
    6: {
      nome: "Opção Padrão",
      options: [
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === saladaExecutivo },
        { filter: (item) => item.grupoc === inventarioExtra }
      ]
    },
    7: {
      nome: "Opção Padrão",
      options: [
        { filter: (item) => item.grupoc === opcaoMolho },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === saladaExecutivo },
        { filter: (item) => item.grupoc === inventarioExtra }
      ]
    },
    8: {
      nome: "Opção Padrão",
      options: [
        { filter: (item) => item.grupoc === tipoTempero },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === saladaExecutivo },
        { filter: (item) => item.grupoc === inventarioExtra }
      ]
    },
    9: {
      nome: "Opção Padrão",
      options: [
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === inventarioExtra }
      ]
    },
    10: {
      nome: "Opção Padrão",
      options: [
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === inventarioExtra }
      ]
    },
    11: {
      nome: "Opção Padrão",
      options: [
        { filter: (item) => item.grupoc === opcaoPao },
        { filter: (item) => item.grupoc === acAperitivoS1 },
        { filter: (item) => item.grupoc === inventarioExtra }
      ]
    },
    12: {
      nome: "Opção Padrão",
      options: [
        { filter: (item) => item.grupoc === saborRecheioOp1 },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === acompanhamentoExecutivo },
        { filter: (item) => item.grupoc === saladaExecutivo },
        { filter: (item) => item.grupoc === inventarioExtra }
      ]
    },
  };

  const options = inventarioOptions[modalItem?.grupoc]?.options;


  function abSom() {
    console.log(v);
    if (v >= limite) {
      setV(0)

    }
    else {

      setV((prevContagem) => prevContagem + 1);
    }
  }

  const renderOption = (options, secador) => {

    return (
      <>

        {contagem === limite - 1 ? (
          <div style={{ position: "absolute", display: "block" }}>
            <div className="inventarioOp">

              <ul ref={listaRef}>
                <h1>{descricaoProduto}</h1> {/* Exibindo a descrição do produto selecionado */}
                {options.map((item, i) => (
                  <li key={i}>
                    <button
                      className={`GPX${item.grupo}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        abSom();
                        ivAdd(item, secador);
                      }}
                      style={{ height: "15vh", width: "15vh" }}
                    >
                      {item.nomeproduto}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div style={{ position: "absolute", display: "block" }}>
            <div className="inventarioOption">
              <ul ref={listaRef}>
                <h1>{descricaoProduto}</h1> {/* Exibindo a descrição do produto selecionado */}
                {options.map((item, i) => (
                  <li key={i}>
                    <button
                      className={`GPX${item.grupo}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        abSom();
                        ivAdd(item, secador);
                      }}
                      style={{ height: "15vh", width: "15vh" }}
                    >
                      {item.nomeproduto}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={showModal ? 'out' : ''}>
      {modalItem && (
        <div>
          <div
            style={{
              display: showModal ? "block" : "none",
              position: "absolute",
              margin: "0px",
              left: "0px",
              inset: "0px",
              border: "none",
              background:
                "radial-gradient(circle at right, black,black,black,black, transparent,transparent,transparent)",
              overflow: "auto",
              borderRadius: "8px",
              outline: "none",
              padding: "20px",
              zIndex: "999"
            }}
          >
            <div onClick={() => handleOptionClick(0)}>
              {renderOption(
                Array.prototype.filter.call(
                  itens && Array.isArray(itens) ? itens : [],
                  options[v !== undefined ? v : 0]?.filter || (() => true)
                ),
                0
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TelaOption;
