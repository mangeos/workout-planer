import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChart = ({ progressLogs }) => {
  // Gruppera data per övning
  const exerciseData = {};
  
  progressLogs.forEach(log => {
    if (!log.exercise) return;
    
    const exerciseName = log.exercise.name;
    if (!exerciseData[exerciseName]) {
      exerciseData[exerciseName] = {
        dates: [],
        weights: [],
        volumes: []
      };
    }
    
    exerciseData[exerciseName].dates.push(new Date(log.date).toLocaleDateString('sv-SE'));
    exerciseData[exerciseName].weights.push(log.weight);
    exerciseData[exerciseName].volumes.push(log.sets * log.reps * log.weight);
  });

  // Skapa chart data för vikt
  const chartData = {
    labels: exerciseData[Object.keys(exerciseData)[0]]?.dates || [],
    datasets: Object.keys(exerciseData).map((exerciseName, index) => ({
      label: exerciseName,
      data: exerciseData[exerciseName].weights,
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ][index % 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ][index % 5],
      tension: 0.4,
      fill: false,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Viktutveckling över tid',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Vikt (kg)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Datum'
        }
      }
    },
  };

  if (progressLogs.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa'
      }}>
        <p>Ingen progress data tillgänglig för diagram</p>
      </div>
    );
  }

  return <Line data={chartData} options={options} />;
};

export default ProgressChart;