import React, { useState, useEffect } from 'react';

const DataHora = ({ dataHoraEntrada }) => {
  const [dataFormatada, setDataFormatada] = useState('');

  useEffect(() => {
    const data = new Date(dataHoraEntrada);
    const dataFormatada = `${data.toLocaleDateString()} ${data.toLocaleTimeString()}`;
    setDataFormatada(dataFormatada);
  }, [dataHoraEntrada]);

  return <>{dataFormatada}</>;
};

export default DataHora;