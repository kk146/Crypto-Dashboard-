import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "../Styles/piechart.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function MarketPieChart({ coins }) {
  if (!coins || coins.length === 0) {
    return (
      <div className="portfolio-card">
        <h2>Portfolio</h2>

        <div className="portfolio-loading">
          Loading portfolio...
        </div>
      </div>
    );
  }

  // Use the first 3 cryptocurrencies
  const topCoins = coins.slice(0, 3);

  const values = topCoins.map((coin) =>
    Number(coin.current_price || 0)
  );

  const totalValue = values.reduce(
    (sum, value) => sum + value,
    0
  );

  const data = {
    labels: topCoins.map((coin) => coin.name),

    datasets: [
      {
        data: values,

        backgroundColor: [
          "#4F8EF7",
          "#FF7C86",
          "#61D6C5",
        ],

        borderWidth: 0,

        hoverOffset: 5,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "58%",

    plugins: {
      legend: {
        position: "right",

        labels: {
          usePointStyle: true,

          pointStyle: "circle",

          padding: 12,

          boxWidth: 8,

          font: {
            size: 12,
          },

          color: "#374151",
        },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            const value = Number(
              context.raw || 0
            );

            return ` $${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="portfolio-card">

      {/* Header */}
      <div className="portfolio-header">

        <h2>Portfolio</h2>

        <div className="portfolio-total">

          <span>Total value</span>

          <strong>
            ${totalValue.toFixed(0)}
          </strong>

        </div>

      </div>

      {/* Chart */}
      <div className="portfolio-chart">

        <Doughnut
          data={data}
          options={options}
        />

      </div>

    </div>
  );
}

export default MarketPieChart;
