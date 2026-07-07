import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CryptoChart({ chartData, chartType }) {
  console.log("CryptoChart Data:", chartData);

  if (!chartData || !chartData.prices || chartData.prices.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "420px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Loading Chart...
      </div>
    );
  }

  const labels = chartData.prices.map((item) =>
    new Date(item[0]).toLocaleDateString()
  );

  const values = chartData.prices.map((item) => item[1]);

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: values,

        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",

        borderWidth: 3,

        fill: true,

        tension: 0.4,

        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#2563eb",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 12,
        displayColors: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 8,
        },
      },

      y: {
        grid: {
          color: "#edf2f7",
        },
        ticks: {
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "420px",
      }}
    >
      {chartType === "bar" ? (
        <Bar data={data} options={options} />
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
}

export default CryptoChart;
