import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

const TransactionGraph = ({ customerId }) => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    if (customerId) {
      fetchData(customerId);
    }
  }, [customerId]);

  const fetchData = async (customerId) => {
    try {
      const transactionsResponse = await axios.get('http://localhost:5000/transactions');
      const customerTransactions = transactionsResponse.data.filter(transaction => transaction.customer_id === customerId);

      const groupedData = groupTransactionsByDate(customerTransactions);
      const labels = Object.keys(groupedData);
      const data = Object.values(groupedData);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Transaction Amounts',
            data: data,
            fill: true,
            borderColor: '#f0f',
            tension: 2
          }
        ]
      });

      setChartOptions({
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#000',
              font: {
                weight: 800
            }
            },
            grid: {
              color: '#000'
            }
          },
          y: {
            stacked: true,
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          }
        }
      });
    } catch (error) {
      console.error('Error fetching transactions', error);
    }
  };

  const groupTransactionsByDate = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {});
  };

  return (
    <div className="card">
      <h3>Transaction Graph</h3>
      {chartData && (
        <Chart  type="bar" data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default TransactionGraph;
