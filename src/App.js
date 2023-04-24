import { Routes, Route, BrowserRouter } from 'react-router-dom';

import MesasPage from './components/MesasPage';
import Comanda from './components/Comanda';
import Conta from './components/Conta';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MesasPage />} />
        <Route path="/mesa/:id/comanda" element={<Comanda />} />
        <Route path="/mesa/:id/conta" element={<Conta />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
