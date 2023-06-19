import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MesasPage from './components/MesasPage';
import Notification from './components/Notification';
import { useState } from 'react';


const App = () => {
  const [notification, setNotification] = useState('');
  
  const handleNotification = (text) => {
    setNotification(text);
  };
  return (
    <BrowserRouter>
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<MesasPage setNotification={handleNotification} />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
