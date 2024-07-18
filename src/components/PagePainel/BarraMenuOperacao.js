import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLocalMesa } from '../../features/localmesa/localmesaSlice';


const BarraMenuOperacional = () => {
    const user = useSelector(state => state.user);
    const mesaSelect = useSelector(state => state.localmesa.localmesa);
    const dispatch = useDispatch();

    const handleLocalView = (local) => {
        dispatch(setLocalMesa(local));
    }

    const handleFullscreen = () => {
        const element = document.documentElement;
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

    const handleLojaArea = (text) => {
        console.log(text);
        dispatch(setLocalMesa(text));
        console.log(mesaSelect);
    };


    if (!user) {
        return null; // Ou algum indicador de carregamento enquanto o usuário não é carregado
    }

    return (
        <>
            {user.nivel >= 1 && (
                <div className='digitos'>
                    <div className='g1s'>
                        <button onClick={() => handleLojaArea('loja')} style={{ display: user.restricoes.area_rLoja ? 'row' : 'none' }}>Principal</button>
                        <button onClick={() => handleLojaArea('delivery')} style={{ display: user.restricoes.area_rDelivery ? 'row' : 'none' }}>Delivery</button>
                        <button onClick={() => handleLojaArea('bar')} style={{ display: user.restricoes.area_rBar ? 'row' : 'none' }}>Bar</button>
                        <button onClick={() => handleLojaArea('giral')} style={{ display: user.restricoes.area_rGiral ? 'row' : 'none' }}>Giral</button>
                        <button onClick={() => handleLojaArea('externa')} style={{ display: user.restricoes.area_rExterna ? 'row' : 'none' }}>Externa</button>

                        
                        <button onClick={handleFullscreen} style={{ display: user.restricoes.g_comanda_maitre ? 'row' : 'none' }}>TELA</button>
                    </div>
                </div>
            )}

            {/* Renderize o componente Gestor condicionalmente */}

            
        </>
    );
};

export default BarraMenuOperacional;
