import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import "../Styles/portfolio.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Portfolio() {

  const data = {
    labels: ["Tether", "Luna", "Ethereum"],

    datasets: [
      {
        data: [375, 375, 250],

        backgroundColor: [
          "#4F8EF7",
          "#FF7C86",
          "#61D6C5",
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "0%",

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

      <div className="portfolio-top">

        <div>
          <h3>Portfolio</h3>
        </div>

        <div className="portfolio-total">
          <span>Total value</span>
          <h2>$1000</h2>
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

export default Portfolio;
