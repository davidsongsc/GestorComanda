import React from 'react';

const FuncaoComponent = ({ codigo }) => {
  const getFuncao = (codigo) => {
    switch (codigo) {
      case 's1':
        return 'Limpeza [B,M,T,P,C]';
      case 's2':
        return 'Limpeza [M,T,P,C]';
      case 's3':
        return 'Limpeza [M,T,P]';
      case 's4':
        return 'Limpeza [T,P]';
      case 's5':
        return 'Limpeza [LIDER]';
      case 's6':
        return 'Limpeza [SUPERVISOR]';
      case 's7':
        return 'Limpeza [GERÊNCIA]';
      case 'm1':
        return 'Manutenção';
      case 'c1':
        return 'Cozinha [COPA]';
      case 'c2':
        return 'Cozinha [AUX.PREPARO]';
      case 'c3':
        return 'Cozinha [AUX.SOBREMESA]';
      case 'c4':
        return 'Cozinha [AUX.CHAPA]';
      case 'c5':
        return 'Cozinha [AUX.FORNO]';
      case 'c6':
        return 'Cozinha [AUX.GRELHA]';
      case 'c7':
        return 'Cozinha [AUX.LIDER]';
      case 'c8':
        return 'Cozinha [AUX.SUPERVISOR]';
      case 'c9':
        return 'Cozinha [AUX.GERÊNCIA]';
      case 'b1':
        return 'Clean';
      case 'b2':
        return 'Apoio';
      case 'b3':
        return 'Hostess ';
      case 'b4':
        return 'Delivery ';
      case 'b5':
        return 'Cummim';
      case 'b6':
        return 'Garçom';
      case 'b7':
        return 'Bartender';
      case 'b8':
        return 'Sommelier';
      case 'b9':
        return 'Trainee Manager';
      case 'a1':
        return 'aprendiz';
      case 'a2':
        return 'treinamento';
      case 'j3':
        return 'delivery';
      case 'j4':
        return 'Supervisor Delivery';
      case 'j5':
        return 'Operador Caixa';
      case 'g1':
        return 'Supervisor Caixa';
      case 'g2':
        return 'Assistente de Confiança';
      case 'g3':
        return 'Assistente de Supervisão';
      case 'g4':
        return 'Assistente de Gerência';
      case 'g6':
        return 'Supervisor de Compras';
      case 'g7':
        return 'Gerente de Compras';
      case 'g8':
        return 'Supervisor de Pagamentos';
      case 'g9':
        return 'Gerente de Pagamentos';
      case 'g10':
        return 'Supervisor de Recurso Humanos';
      case 'g11':
        return 'Gerente de Recursos Humanos';
      case 'g12':
        return 'Supervisor de T.I.';
      case 'g13':
        return 'Gerente de T.I.';
      case 'g14':
        return 'proprietario';
      case 'g15':
        return 'Dev Program';
      default:
        return '';
    }
  };

  return <>{getFuncao(codigo)}</>;
};

export default FuncaoComponent;
