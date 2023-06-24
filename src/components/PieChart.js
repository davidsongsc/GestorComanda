import React, { useEffect } from 'react';

const PieChart = ({ dados }) => {
  useEffect(() => {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Nomes');
      data.addColumn('number', 'Total descontos');
      console.log(dados);
      // Mapeia os dados recebidos para adicionar as linhas no DataTable
      const rows = dados.map(({ nome, totalValores }) => [
        nome,
        totalValores.totalValores,
      ]);
      data.addRows(rows);

      const options = {
        title: 'Ilustração',
        is3D: true,
        chartArea: { left: 10, top: 20, width: '100%', height: '100%' },
        legend: { position: 'right' },
        pieSliceText: 'value-and-percentage', // Exibe valor e porcentagem na fatia
      
      };

      const chart = new google.visualization.PieChart(
        document.getElementById('pieChart')
      );

      chart.draw(data, options);
    }
  }, [dados]);

  return <div id="pieChart" />;
};

export default PieChart;
