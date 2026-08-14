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
  currency = "usd",
}) {

  if (
    !chartData ||
    !chartData.prices ||
    chartData.prices.length === 0
  ) {

    return (
      <div className="chart-loading">
        Loading Chart...
      </div>
    );

  }


  const labels = chartData.prices.map(
    (item) =>
      new Date(item[0]).toLocaleDateString()
  );


  const values = chartData.prices.map(
    (item) => item[1]
  );


  const currencySymbol = {
    usd: "$",
    inr: "₹",
    eur: "€",
    gbp: "£",
  };


  const symbol =
    currencySymbol[currency] || "$";


  const data = {

    labels,

    datasets: [
      {
        label: "Price",

        data: values,

        borderColor: "#2563eb",

        backgroundColor:
          "rgba(37, 99, 235, 0.08)",

        borderWidth: 2.5,

        fill: true,

        tension: 0.35,

        pointRadius: 0,

        pointHoverRadius: 5,

        pointHoverBackgroundColor:
          "#2563eb",

        pointHoverBorderColor:
          "#ffffff",

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

        padding: 10,

        displayColors: false,

        callbacks: {

          label: function (context) {

            return (
              " Price: " +
              symbol +
              Number(
                context.parsed.y
              ).toLocaleString()
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

          maxTicksLimit: 7,

          color: "#777",

          font: {
            size: 10,
          },

        },

      },


      y: {

        grid: {

          color: "#edf0f4",

        },


        ticks: {

          color: "#777",

          font: {
            size: 10,
          },


          callback: function (value) {

            return (
              symbol +
              Number(value).toLocaleString()
            );

          },

        },

      },

    },

  };


  return (

    <div
      style={{
        width: "100%",
        height: "100%",
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
