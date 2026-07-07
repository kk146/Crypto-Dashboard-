import { useState, useEffect } from "react";
import CryptoChart from "./CryptoChart";
import { getChartData } from "../Services/api";
import "../Styles/analytics.css";

function AnalyticsChart({ coins = [], currency }) {
  const [timeRange, setTimeRange] = useState("1W");
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [chartType, setChartType] = useState("line");
  const [chartData, setChartData] = useState(null);

  // Set first coin after API loads
  useEffect(() => {
    if (coins.length > 0) {
      setSelectedCoin(coins[0].id);
    }
  }, [coins]);

  // Load chart
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

        const data = await getChartData(selectedCoin, currency, days);

        console.log("Chart API:", data);

        setChartData(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadChart();
  }, [selectedCoin, currency, timeRange]);

  return (
    <div className="analytics-card">
      <div className="analytics-toolbar">
        <div className="time-buttons">
          {["1D", "1W", "1M", "6M", "1Y"].map((item) => (
            <button
              key={item}
              className={timeRange === item ? "active" : ""}
              onClick={() => setTimeRange(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="toolbar-right">
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
          >
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name}
              </option>
            ))}
          </select>

          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="line">Line Chart</option>

            <option value="bar">Bar Chart</option>
          </select>
        </div>
      </div>

      <CryptoChart chartData={chartData} chartType={chartType} />
    </div>
  );
}

export default AnalyticsChart;
