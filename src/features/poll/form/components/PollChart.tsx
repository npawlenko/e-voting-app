import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type PollChartData = {
  labels: string[];
  values: number[];
};

const PollChart: React.FC<{ data: PollChartData }> = ({ data }) => {
  const { t } = useTranslation();
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: t('poll.chart.voteCount'),
      data: data.values,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };

  return <>
    <Bar data={chartData} />
  </>;
};

export default PollChart;
