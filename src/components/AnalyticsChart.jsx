import { useState, useEffect } from "react";
import CryptoChart from "./CryptoChart";
import { getChartData } from "../Services/api";
import "../Styles/analytics.css";

function AnalyticsChart({ coins = [], currency }) {
  const [timeRange, setTimeRange] = useState("1W");

  // Multiple coins
  const [selectedCoins, setSelectedCoins] = useState([
    "bitcoin",
    "ethereum",
  ]);

  const [chartType, setChartType] = useState("line");
  const [chartData, setChartData] = useState([]);

  // Set default coins when API loads
  useEffect(() => {
    if (coins.length > 0) {
      const availableIds = coins.map((coin) => coin.id);

      const defaultCoins = availableIds.filter((id) =>
        ["bitcoin", "ethereum", "tether"].includes(id)
      );

      if (defaultCoins.length > 0) {
        setSelectedCoins(defaultCoins.slice(0, 3));
      } else {
        setSelectedCoins(availableIds.slice(0, 3));
      }
    }
  }, [coins]);

  // Get number of days
  const getDays = () => {
    switch (timeRange) {
      case "1D":
        return 1;

      case "1W":
        return 7;

      case "1M":
        return 30;

      case "6M":
        return 180;

      case "1Y":
        return 365;

      default:
        return 7;
    }
  };

  // Load multiple coin charts
  useEffect(() => {
    if (!selectedCoins.length) return;

    const loadCharts = async () => {
      try {
        const days = getDays();

        const results = await Promise.all(
          selectedCoins.map(async (coinId) => {
            const data = await getChartData(
              coinId,
              currency,
              days
            );

            return {
              id: coinId,
              data,
            };
          })
        );

        console.log("Multiple Chart API:", results);

        setChartData(results);
      } catch (error) {
        console.error("Chart API Error:", error);
      }
    };

    loadCharts();
  }, [selectedCoins, currency, timeRange]);

  // Add/remove coin
  const handleCoinChange = (coinId) => {
    setSelectedCoins((previous) => {
      // Remove coin
      if (previous.includes(coinId)) {
        return previous.filter((id) => id !== coinId);
      }

      // Maximum 5 coins
      if (previous.length >= 5) {
        return previous;
      }

      // Add coin
      return [...previous, coinId];
    });
  };

  return (
    <div className="analytics-card">

      {/* =========================
          HEADER
      ========================= */}

      <div className="analytics-header">

        <div className="analytics-title">
          <h2>Crypto Market Analytics</h2>

          <p>
            Compare cryptocurrency prices
          </p>
        </div>

      </div>


      {/* =========================
          TOOLBAR
      ========================= */}

      <div className="analytics-toolbar">

        {/* Time range */}

        <div className="time-buttons">

          {["1D", "1W", "1M", "6M", "1Y"].map(
            (item) => (
              <button
                key={item}
                type="button"
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


        {/* Controls */}

        <div className="toolbar-right">

          {/* Multi Coin Selector */}

          <div className="coin-selector">

            <button
              type="button"
              className="coin-selector-button"
            >
              {selectedCoins.length === 0
                ? "Select coins"
                : `${selectedCoins.length} coins selected`}
            </button>

            <div className="coin-dropdown">

              {coins.map((coin) => (

                <label
                  key={coin.id}
                  className="coin-option"
                >

                  <input
                    type="checkbox"
                    checked={selectedCoins.includes(
                      coin.id
                    )}
                    onChange={() =>
                      handleCoinChange(
                        coin.id
                      )
                    }
                  />

                  <img
                    src={coin.image}
                    alt={coin.name}
                  />

                  <span>
                    {coin.name}
                  </span>

                </label>

              ))}

            </div>

          </div>


          {/* Chart type */}

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


      {/* =========================
          SELECTED COINS
      ========================= */}

      <div className="selected-coins">

        {selectedCoins.map((coinId) => {

          const coin = coins.find(
            (item) => item.id === coinId
          );

          if (!coin) return null;

          return (
            <div
              className="selected-coin"
              key={coin.id}
            >

              <img
                src={coin.image}
                alt={coin.name}
              />

              <span>
                {coin.name}
              </span>

              <button
                type="button"
                onClick={() =>
                  handleCoinChange(
                    coin.id
                  )
                }
              >
                ×
              </button>

            </div>
          );
        })}

      </div>


      {/* =========================
          CHART
      ========================= */}

      <CryptoChart
        chartData={chartData}
        chartType={chartType}
        coins={coins}
      />

    </div>
  );
}

export default AnalyticsChart;
