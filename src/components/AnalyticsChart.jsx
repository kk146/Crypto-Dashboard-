import { useState, useEffect } from "react";

import CryptoChart from "./CryptoChart";

import { getChartData } from "../Services/api";

import "../Styles/analytics.css";

function AnalyticsChart({ coins = [], currency }) {

  const [timeRange, setTimeRange] = useState("1W");

  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  const [chartType, setChartType] = useState("line");

  const [chartData, setChartData] = useState(null);


  /* =========================
     SET FIRST COIN
  ========================= */

  useEffect(() => {

    if (coins.length > 0) {

      setSelectedCoin(coins[0].id);

    }

  }, [coins]);


  /* =========================
     LOAD CHART DATA
  ========================= */

  useEffect(() => {

    if (!selectedCoin) return;


    const loadChart = async () => {

      try {

        let days = 7;


        switch (timeRange) {

          case "1D":
            days = 1;
            break;

          case "1W":
            days = 7;
            break;

          case "1M":
            days = 30;
            break;

          case "6M":
            days = 180;
            break;

          case "1Y":
            days = 365;
            break;

          default:
            days = 7;

        }


        const data = await getChartData(
          selectedCoin,
          currency,
          days
        );


        setChartData(data);

      } catch (error) {

        console.error(
          "Chart loading error:",
          error
        );

      }

    };


    loadChart();

  }, [selectedCoin, currency, timeRange]);


  return (

    <div className="analytics-card">

      {/* =========================
          TOOLBAR
      ========================= */}

      <div className="analytics-toolbar">


        {/* TIME RANGE */}

        <div className="time-buttons">

          {["1D", "1W", "1M", "6M", "1Y"].map(
            (item) => (

              <button
                key={item}
                className={
                  timeRange === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setTimeRange(item)
                }
              >
                {item}
              </button>

            )
          )}

        </div>


        {/* RIGHT CONTROLS */}

        <div className="toolbar-right">

          {/* COIN */}

          <select
            value={selectedCoin}
            onChange={(e) =>
              setSelectedCoin(e.target.value)
            }
          >

            {coins.map((coin) => (

              <option
                key={coin.id}
                value={coin.id}
              >
                {coin.name}
              </option>

            ))}

          </select>


          {/* CHART TYPE */}

          <select
            value={chartType}
            onChange={(e) =>
              setChartType(e.target.value)
            }
          >

            <option value="line">
              Line Chart
            </option>

            <option value="bar">
              Bar Chart
            </option>

          </select>

        </div>

      </div>


      

      <div className="crypto-chart-container">

        <CryptoChart
          chartData={chartData}
          chartType={chartType}
          currency={currency}
        />

      </div>

    </div>

  );

}

export default AnalyticsChart;
