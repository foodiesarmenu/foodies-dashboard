// src/PieChart.js
import React, { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { ArcElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

// Register the controllers, elements, and plugins
Chart.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

const PieChart = () => {
    const chartRef = useRef(null);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                data: [30, 45, 28, 50, 60, 40, 55],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9933',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9933',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Number of Orders',
                
            },
        },
    };

    return <Pie ref={chartRef} data={data} options={options} />;
};

export default PieChart;

