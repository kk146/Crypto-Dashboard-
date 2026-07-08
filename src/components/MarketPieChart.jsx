import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "../Styles/marketpie.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function MarketPieChart({ coins }) {
  if (!coins || coins.length === 0) {
    return (
      <div className="portfolio-card">
        <h3>Loading Portfolio...</h3>
      </div>
    );
  }

  // Top 3 coins
  const topCoins = coins.slice(0, 3);

  const totalValue = topCoins.reduce(
    (sum, coin) => sum + coin.current_price,
    0
  );

  const data = {
    labels: topCoins.map((coin) => coin.name),

    datasets: [
      {
        data: topCoins.map((coin) => coin.current_price),

        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#FB7185",
        ],

        borderWidth: 0,

        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "70%",

    plugins: {
      legend: {
        position: "right",

        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 18,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="portfolio-card">

      <div className="portfolio-header">
        <h2>Portfolio</h2>

        <div className="portfolio-value">
          <span>Total Value</span>

          <h3>
            $
            {totalValue.toFixed(0)}
          </h3>
        </div>
      </div>

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
