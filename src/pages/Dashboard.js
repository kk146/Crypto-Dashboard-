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

  useEffect(() => {
    fetchCoins();
  }, [currency]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCoins();
    }, 30000);

    return () => clearInterval(interval);
  }, [currency, search]);

  return (
    <div className="dashboard">

      {/* HEADER */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        search={search}
        setSearch={setSearch}
      />

      {/* CHART + MARKET CAP */}
      <section className="main-market-section">

        {/* LEFT: CHART */}
        <div className="analytics-section">
          <AnalyticsChart
            coins={filteredCoins}
            currency={currency}
          />
        </div>

        {/* RIGHT: MARKET CAP */}
        <div className="marketcap-card">
          <MarketCapList coins={filteredCoins} />
        </div>

      </section>

      {/* BOTTOM CARDS */}
      <section className="bottom-section">

        {/* PORTFOLIO */}
        <div className="portfolio-card">
          <MarketPieChart coins={filteredCoins} />
        </div>

        {/* EXCHANGE */}
        <div className="exchange-card">
          <ExchangeConverter currency={currency} />
        </div>

      </section>

    </div>
  );
}

export default Dashboard;
