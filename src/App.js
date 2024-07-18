// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MesasPage from './components/MesasPage';
import Notification from './components/Sistema/Notification';

import { carregarRestricoes } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import RestricoesComponente from './components/Outros/RestricoesComponente';

const App = () => {
  const dispatch = useDispatch();
  const cRestricoes = useSelector(state => state.user);

  useEffect(() => {
    dispatch(carregarRestricoes());
  }, [dispatch]);

  if (cRestricoes.carregandoRestricoes) {
    return <div>Carregando restrições...</div>;
  }
  console.log(cRestricoes);
  return (
    <BrowserRouter>
      <Notification />
      <Routes>
        <Route path="/" element={<MesasPage />} />
        <Route path="/colaborador" element={<RestricoesComponente />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
