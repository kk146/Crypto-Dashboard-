```jsx
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
  console.log("MarketPieChart Coins:", coins);

  if (!coins || coins.length === 0) {
    return (
      <div className="portfolio-card">
        <h2 className="portfolio-title">Portfolio</h2>

        <div className="portfolio-loading">
          Loading Portfolio...
        </div>
      </div>
    );
  }

  // Take Top 5 Coins
  const topCoins = coins.slice(0, 5);

  const data = {
    labels: topCoins.map((coin) => coin.name),

    datasets: [
      {
        data: topCoins.map((coin) => coin.market_cap),

        backgroundColor: [
          "#2563eb",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],

        borderColor: "#ffffff",

        borderWidth: 3,

        hoverOffset: 18,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "70%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 13,
          },
        },
      },

      tooltip: {
        backgroundColor: "#1f2937",

        titleColor: "#ffffff",

        bodyColor: "#ffffff",

        callbacks: {
          label: function (context) {
            return (
              context.label +
              " : $" +
              context.raw.toLocaleString()
            );
          },
        },
      },
    },
  };

  return (
    <div className="portfolio-card">
      <h2 className="portfolio-title">
        Portfolio
      </h2>

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
```
