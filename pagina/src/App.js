import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';

import MesasPage from './components/MesasPage';
import Comanda from './components/Comanda';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MesasPage />} />
        <Route path="/mesa/:id/comanda" element={<Comanda />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
