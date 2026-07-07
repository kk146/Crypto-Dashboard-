import { useState, useEffect } from "react";

import Header from "../components/Header";
import AnalyticsChart from "../components/AnalyticsChart";
import MarketPieChart from "../components/MarketPieChart";
import ExchangeConverter from "../components/ExchangeConverter";
import MarketCapList from "../components/MarketCapList";

import { getCryptos } from "../Services/api";

import "../Styles/dashboard.css";

function Dashboard() {
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");

  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);

  // Fetch crypto data
  const fetchCoins = async () => {
    try {
      const data = await getCryptos(currency);

      setCoins(data);

      if (search.trim() === "") {
        setFilteredCoins(data);
      } else {
        const filtered = data.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredCoins(filtered);
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  // Load data when currency changes
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // Filter search
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCoins(coins);
    } else {
      const filtered = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredCoins(filtered);
    }
  }, [search, coins]);

  // Auto Refresh Every 30 Seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCoins();
    }, 30000);

    return () => clearInterval(interval);
  }, [currency, search]);

  return (
    <div className="dashboard">
      {/* Header */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        search={search}
        setSearch={setSearch}
      />

      {/* Analytics */}
      <section className="analytics-section">
        <AnalyticsChart coins={filteredCoins} currency={currency} />
      </section>

      {/* Bottom Cards */}
      <section className="bottom-section">
        <div className="portfolio-card">
          <MarketPieChart coins={filteredCoins} />
        </div>

        <div className="exchange-card">
          <ExchangeConverter currency={currency} />
        </div>

        <div className="marketcap-card">
          <MarketCapList coins={filteredCoins} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
