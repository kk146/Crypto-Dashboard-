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

function CryptoChart({
  chartData,
  chartType,
  coins = [],
}) {
  console.log("CryptoChart Data:", chartData);

  /* =========================
     LOADING
  ========================= */

  if (
    !chartData ||
    !Array.isArray(chartData) ||
    chartData.length === 0
  ) {
    return (
      <div
        style={{
          width: "100%",
          height: "420px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          color: "#666",
        }}
      >
        Loading Chart...
      </div>
    );
  }

  /* =========================
     COLORS
  ========================= */

  const colors = [
    "#2563eb",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
  ];

  /* =========================
     FIND COIN NAME
  ========================= */

  const getCoinName = (coinId) => {
    const coin = coins.find(
      (item) => item.id === coinId
    );

    if (coin) {
      return coin.name;
    }

    return coinId
      .charAt(0)
      .toUpperCase() + coinId.slice(1);
  };

  /* =========================
     CREATE LABELS
  ========================= */

  const firstCoin = chartData[0];

  if (
    !firstCoin ||
    !firstCoin.data ||
    !firstCoin.data.prices
  ) {
    return (
      <div
        style={{
          width: "100%",
          height: "420px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          color: "#666",
        }}
      >
        No chart data available
      </div>
    );
  }

  const labels = firstCoin.data.prices.map(
    (item) =>
      new Date(item[0]).toLocaleDateString()
  );

  /* =========================
     CREATE MULTIPLE DATASETS
  ========================= */

  const datasets = chartData.map(
    (coinData, index) => {
      const coinPrices =
        coinData.data?.prices || [];

      const values = coinPrices.map(
        (item) => item[1]
      );

      const color =
        colors[index % colors.length];

      return {
        label: getCoinName(coinData.id),

        data: values,

        borderColor: color,

        backgroundColor: `${color}22`,

        borderWidth: 3,

        fill: chartType === "line",

        tension: 0.4,

        pointRadius: 0,

        pointHoverRadius: 6,

        pointHoverBackgroundColor: color,

        pointHoverBorderColor: "#ffffff",

        pointHoverBorderWidth: 2,
      };
    }
  );

  /* =========================
     CHART DATA
  ========================= */

  const data = {
    labels,

    datasets,
  };

  /* =========================
     CHART OPTIONS
  ========================= */

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      intersect: false,

      mode: "index",
    },

    plugins: {
      legend: {
        display: true,

        position: "top",

        align: "start",

        labels: {
          usePointStyle: true,

          pointStyle: "circle",

          padding: 18,

          font: {
            size: 12,

            weight: "600",
          },

          color: "#374151",
        },
      },

      tooltip: {
        backgroundColor: "#1f2937",

        titleColor: "#ffffff",

        bodyColor: "#ffffff",

        padding: 12,

        displayColors: true,

        callbacks: {
          label: function (context) {
            const value = Number(
              context.raw || 0
            );

            return (
              " " +
              context.dataset.label +
              ": $" +
              value.toLocaleString(
                undefined,
                {
                  maximumFractionDigits: 2,
                }
              )
            );
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          maxTicksLimit: 8,

          color: "#9ca3af",

          font: {
            size: 11,
          },
        },
      },

      y: {
        grid: {
          color: "#edf2f7",
        },

        ticks: {
          color: "#9ca3af",

          font: {
            size: 11,
          },

          callback: function (value) {
            return (
              "$" +
              Number(value).toLocaleString()
            );
          },
        },
      },
    },
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <div
      style={{
        width: "100%",
        height: "420px",
        position: "relative",
      }}
    >
      {chartType === "bar" ? (
        <Bar
          data={data}
          options={options}
        />
      ) : (
        <Line
          data={data}
          options={options}
        />
      )}
    </div>
  );
}

export default CryptoChart;
