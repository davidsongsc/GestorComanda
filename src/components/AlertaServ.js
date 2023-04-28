import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AlertaServ({ usuarioError, tipoAlertaId, onClose, redirect, hAlerta }) {
  const navigation = useNavigate();

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState("");
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    if (!mostrarAlerta) {
      setMostrarAlerta(true);
      setShowAlertMessage(usuarioError[tipoAlertaId].mensagem);
      setShowRedirect(!!redirect);
    }
  }, [mostrarAlerta, usuarioError[tipoAlertaId].mensagem, redirect]);

  function handleAlertClose() {
    setMostrarAlerta(false);
    onClose && onClose();
  }

  function nave() {
    navigation(`${redirect}`);
  }

  function showAlertAgain() {
    setMostrarAlerta(true);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleAlertClose();
    }
  }
  function handleLogar() {
    handleAlertClose()
    hAlerta()
  }
  function controlador(variavel) {
    if (variavel === 'cmdlogar') {
      handleLogar()
    }
    else{
      handleAlertClose()
    }
  }
  return mostrarAlerta ? (
    <div className="custom-alert  fade-in">
      <div className="message">
        <h1>{usuarioError[tipoAlertaId].titulo}</h1>
        <p>{showAlertMessage}</p>
      </div>
      {showRedirect ? (
        <button className="close-button" onClick={nave} onKeyPress={handleKeyPress}>
          {usuarioError[tipoAlertaId].btn2}
        </button>
      ) : (
        <div className="painel-alerta-botoes">
          <button className="close-button" onClick={() => controlador(usuarioError[tipoAlertaId].fnb1)}>{usuarioError[tipoAlertaId].btn1}</button>
          <button className="close-button" onClick={handleAlertClose} onKeyPress={handleKeyPress}>
            {usuarioError[tipoAlertaId].btn2}
          </button>

        </div>
      )}
     
    </div>
  ) : null;
}

export default AlertaServ;
