import React from 'react';

const FuncaoComponent = ({ codigo }) => {
  const funcoes = {
    // Carreira de Limpeza!
    lpza1: 'Aprendiz de Limpeza',       // Jovem aprendiz de Limpeza
    lpza2: 'Auxiliar de Limpeza',       // Jovem Aprendiz Efetivado, equivalente a experiencia.
    lpza3: 'Copa Bar',                  // Auxiliar de limpeza.
    lpza4: 'Copa Cozinha',              // Auxiliar de limpeza.
    lpza5: 'Treinador de Limpeza',      // Treina para atendimento enquanto Treina a limpeza.
    lpza6: 'Aprendiz de Manutenção',    // 
    lpza7: 'Auxiliar de Manutenção',
    // Liderança!
    lpza8: 'Supervisor de Limpeza',
    lpza9: 'Supervisor de Manutenção',
    lpza10: 'Supervisor de Equipe',

    // Carreira de Atendimento!
    pats1: 'Apoio',                      // Apoio operacional, equivalente a cargos iniciais lpza.
    pats2: 'Cummim',                     // Apoio do Atendente, equivalente a Treinador de Limpeza.
    pats3: 'Recepcionista',              // Recepcionista da Loja ou Telefonista.
    pats4: 'Atendente',                  // Recepcionista especializado em atendimento.
    pats5: 'Bartender',                  // Atendente especializado em bebidas.
    pats6: 'Sommelier',                  // Bartender especializado em Vinhos.
    pats7: 'Treinador',                  // Treina para Gerencia enquanto Treina a Equipe.
    // Liderança!
    pats8: 'Supervisor de Atendimento',  // Primeiro Nivel Gerencial.
    pats9: 'Supervisor de Bar',          // Segundo Nivel Gerencial.
    pats10: 'Maitre',                    // Terceiro Nivel Gerencial.

    // Carreira de Cozinha Operacional!
    cpo1: 'Aprendiz de Cozinha Operacional',       // Jovem aprendiz de Cozinha Operacional
    cpo2: 'Auxiliar de Cozinha Operacional',       // Jovem Aprendiz Efetivado, equivalente a experiência
    cpo3: 'Auxiliar de Grelha',                     // Auxiliar de Grelha
    cpo4: 'Auxiliar de Forno',                      // Auxiliar de Forno
    cpo5: 'Auxiliar de Fritadeiras',                // Auxiliar de Fritadeiras
    cpo6: 'Auxiliar de Sobremesa',                  // Auxiliar de Sobremesa
    cpo7: 'Auxiliar de Salada',                     // Auxiliar de Salada
    cpo8: 'Auxiliar de Chapa',                      // Auxiliar de Chapa
    // Liderança!
    cpo9: 'Sub Chef',                         // Chef de Setor
    cpo10: 'Chef',                         // Chef de Setor

    cpp1: 'Aprendiz de Cozinha de Preparo',       // Jovem aprendiz de Cozinha de Preparo
    cpp2: 'Auxiliar de Cozinha de Preparo',       // Jovem Aprendiz Efetivado, equivalente a experiência
    cpp3: 'Auxiliar de Pães',                      // Auxiliar de Pães
    cpp4: 'Auxiliar de Bolos',                     // Auxiliar de Bolos
    cpp5: 'Auxiliar de Sobremesas',                // Auxiliar de Sobremesas
    cpp6: 'Auxiliar de Molhos',                    // Auxiliar de Molhos
    cpp7: 'Auxiliar de Preparações',               // Auxiliar de Preparações
    cpp8: 'Cozinheiro de Pães',                    // Cozinheiro de Pães
    cpp9: 'Cozinheiro de Bolos',                   // Cozinheiro de Bolos
    cpp10: 'Cozinheiro de Sobremesas',             // Cozinheiro de Sobremesas
    cpp11: 'Cozinheiro de Molhos',                 // Cozinheiro de Molhos
    cpp12: 'Cozinheiro de Preparações',            // Cozinheiro de Preparações
    // Liderança!
    cpp13: 'Chef de Cozinha de Preparo',           // Chef de Cozinha de Preparo
    cpp14: 'Supervisor de Cozinha de Preparo',     // Supervisor de equipe de cozinha de preparo

    est1: 'Estagiário de Estratégia',              // Estagiário de Estratégia
    est2: 'Analista de Estratégia',                // Analista de Estratégia
    est3: 'Analista Sênior de Estratégia',         // Analista Sênior de Estratégia
    est4: 'Consultor de Estratégia',               // Consultor de Estratégia
    est5: 'Consultor Sênior de Estratégia',        // Consultor Sênior de Estratégia
    est6: 'Gerente de Estratégia',                 // Gerente de Estratégia
    est7: 'Diretor de Estratégia',                 // Diretor de Estratégia
    est8: 'Vice-presidente de Estratégia',         // Vice-presidente de Estratégia
    est9: 'Presidente de Estratégia',              // Presidente de Estratégia

    
    rh2: 'Analista de Recursos Humanos',
    rh3: 'Analista Sênior de Recursos Humanos',
    rh4: 'Consultor de Recursos Humanos',
    rh5: 'Consultor Sênior de Recursos Humanos',
    rh6: 'Gerente de Recursos Humanos',
    rh7: 'Diretor de Recursos Humanos',
    rh8: 'Vice-presidente de Recursos Humanos',
    rh9: 'Presidente de Recursos Humanos',

    g1: 'Estagiário de Administração',
    g2: 'Assistente Administrativo',
    g3: 'Analista Administrativo',
    g4: 'Analista Sênior Administrativo',
    g5: 'Coordenador Administrativo',
    g6: 'Gerente Administrativo',
    g7: 'Diretor Administrativo',
    g8: 'Vice-presidente Administrativo',
    g9: 'Presidente Administrativo',
    g10: 'Gestor',


    ti2: 'Analista de Suporte Técnico',
    ti3: 'Analista de Sistemas',
    ti4: 'Analista Sênior de Sistemas',
    ti5: 'Desenvolvedor de Software',
    ti6: 'Arquiteto de Soluções',
    ti7: 'Gerente de Projetos de T.I.',
    ti8: 'Diretor de T.I.',
    ti9: 'Vice-presidente de T.I.',
    ti10: 'Presidente de T.I.',

    
    pes3: 'Analista Sênior de Pesquisa',
    pes4: 'Pesquisador Científico',
    pes5: 'Coordenador de Pesquisa',
    pes6: 'Gerente de Pesquisa',
    pes7: 'Diretor de Pesquisa',
    pes8: 'Vice-presidente de Pesquisa',
    pes9: 'Presidente de Pesquisa',

    j1: 'Estagiário de Pesquisa',
    j2: 'Analista de Pesquisa',
    j3: 'Estagiário de T.I.',
    j4: 'Estagiário de Recursos Humanos',
    j5: 'Auxiliar de Caixa',
    j6: 'Assistente Financeiro',
    j7: 'Analista Financeiro',
    j8: 'Analista Sênior Financeiro',
    j9: 'Especialista Financeiro',
    j10: 'Coordenador Financeiro',
    j11: 'Gerente Financeiro',
    j12: 'Diretor Financeiro',
    j13: 'Vice-presidente Financeiro',
    j14: 'Presidente Financeiro',
  };


  return <>{funcoes[codigo]}</>;
};

export default FuncaoComponent;
