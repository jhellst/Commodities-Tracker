import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register Chart.js modules
Chart.register(...registerables);

const StockChart = ({ data }) => {
  const [selectedMetrics, setSelectedMetrics] = useState(['close']); // Initially display "close" prices
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Metrics available for toggling
  const metrics = ['open', 'high', 'low', 'close', 'adj_close', 'amount_change', 'percent_change', 'volume', 'vwap'];

  // Function to handle metric toggling
  const handleToggle = (metric) => {
    setSelectedMetrics((prevMetrics) =>
      prevMetrics.includes(metric)
        ? prevMetrics.filter((m) => m !== metric)
        : [...prevMetrics, metric]
    );
  };

  // Date range filtering
  const filteredData = data.filter(stock => {
    const stockDate = new Date(stock.date);
    const isAfterStartDate = !startDate || new Date(startDate) <= stockDate;
    const isBeforeEndDate = !endDate || new Date(endDate) >= stockDate;
    return isAfterStartDate && isBeforeEndDate;
  });

  // Prepare the chart data for the selected metrics
  const chartData = {
    labels: filteredData.map(stock => new Date(stock.date).toLocaleDateString()),
    datasets: selectedMetrics.map((metric) => ({
      label: metric.charAt(0).toUpperCase() + metric.slice(1),
      data: filteredData.map(stock => stock[metric]),
      fill: false,
      borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color
      tension: 0.1
    }))
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Data'
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  };

  return (
    <div>
      {/* Date Range Filter */}
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {/* Metric Toggle Checkboxes */}
      <div>
        {metrics.map((metric) => (
          <label key={metric} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedMetrics.includes(metric)}
              onChange={() => handleToggle(metric)}
            />
            {metric.charAt(0).toUpperCase() + metric.slice(1)}
          </label>
        ))}
      </div>

      {/* Line Chart */}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

// Sample data (replace this with your API data or props)
const stockData = [
  {
    adj_close: 389,
    amount_change: 3.75,
    close: 389.0,
    date: "Wed, 02 Oct 2024 00:00:00 GMT",
    high: 392.0,
    low: 378.0,
    open: 385.25,
    percent_change: 0.97339,
    ticker_symbol: "ZOUSX",
    volume: 460,
    vwap: 386.06
  },
  {
    adj_close: 388,
    amount_change: -6.0,
    close: 388.0,
    date: "Tue, 01 Oct 2024 00:00:00 GMT",
    high: 395.5,
    low: 385.0,
    open: 394.0,
    percent_change: -1.52,
    ticker_symbol: "ZOUSX",
    volume: 409,
    vwap: 390.63
  },
  {
    adj_close: 393,
    amount_change: 9.5,
    close: 392.5,
    date: "Mon, 30 Sep 2024 00:00:00 GMT",
    high: 393.75,
    low: 382.25,
    open: 383.0,
    percent_change: 2.48,
    ticker_symbol: "ZOUSX",
    volume: 579,
    vwap: 387.88
  }
];

// Main App
const StockChartOuter = () => {
  return (
    <div>
      <h1>Dynamic Stock Chart</h1>
      <StockChart data={stockData} />
    </div>
  );
};

export default StockChartOuter;
