import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceInfo from '../Administrativo/DeviceInfo';

const BarraMenuOperacional = ({ atendente }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleFullscreen = () => {
        const element = document.documentElement; // Elemento raiz da página
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };

    return (
        <div className='digitos'>
            {(atendente.auth.startsWith('j') && /^\d+$/.test(atendente.auth.slice(1)) ||
            atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))) ?
                <div className='g1s'>
                    <button onClick={() => handleNavigation('/venda')}>Vendas</button>
                    <button onClick={() => handleNavigation('/')}>Suport</button>

                    
                </div> : <></>}

            {(atendente.auth.startsWith('g') && /^\d+$/.test(atendente.auth.slice(1))) ?
                <div className='g1s'>
                    <button onClick={() => handleNavigation('/gestor')}>Gestor</button>
                    <button onClick={handleFullscreen}>TELA</button>
                </div> : <></>}

        </div>
    );
};

export default BarraMenuOperacional;
