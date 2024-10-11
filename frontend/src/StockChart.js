import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register Chart.js modules
Chart.register(...registerables);

const StockChart = ({ getCommodityHistoricalData }) => {
  const [commodityTickerSymbol, setCommodityTickerSymbol] = useState(useParams().ticker_symbol);
  const [selectedMetrics, setSelectedMetrics] = useState(['close']); // Initially display "close" prices
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [historicalData, setHistoricalData] = useState([]);

  // Helper function to format date to yyyy-MM-dd
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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

  useEffect(() => {
    async function fetchHistoricalData() {
      const data = await getCommodityHistoricalData(commodityTickerSymbol);
      setHistoricalData(data);
      setStartDate(formatDate(data[data.length - 1].date)); // Format the date properly
      setEndDate(formatDate(data[0].date)); // Format the date properly
    }
    fetchHistoricalData();
  }, [commodityTickerSymbol, getCommodityHistoricalData]);

  // Date range filtering
  const filteredData = historicalData.filter(day => {
    const stockDate = new Date(day.date);
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
      <h1>Dynamic Stock Chart</h1>

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

export default StockChart;
