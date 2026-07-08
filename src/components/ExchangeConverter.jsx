import { useEffect, useState } from "react";
import { getExchangeRates } from "../Services/api";
import "../Styles/converter.css";

function ExchangeConverter({ currency = "usd" }) {
  const [rates, setRates] = useState({});
  const [sell, setSell] = useState(currency);
  const [buy, setBuy] = useState("btc");
  const [amount, setAmount] = useState(1000);
  const [result, setResult] = useState("");

  useEffect(() => {
    const loadRates = async () => {
      try {
        const data = await getExchangeRates();
        setRates(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadRates();
  }, []);

  useEffect(() => {
    setSell(currency);
  }, [currency]);

  const handleExchange = () => {
    if (!rates[sell] || !rates[buy]) {
      setResult("Exchange unavailable");
      return;
    }

    const fromRate = rates[sell].value;
    const toRate = rates[buy].value;

    const btcValue = Number(amount) / fromRate;
    const converted = btcValue * toRate;

    setResult(`${converted.toFixed(6)} ${buy.toUpperCase()}`);
  };

  return (
    <div className="converter-card">

      <div className="converter-header">
        <h2>Exchange Coins</h2>
      </div>

      <div className="exchange-box">

        <label>Sell</label>

        <div className="exchange-row">
          <select
            value={sell}
            onChange={(e) => setSell(e.target.value)}
          >
            {Object.keys(rates).map((coin) => (
              <option key={coin} value={coin}>
                {coin.toUpperCase()}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

      </div>

      <div className="swap-icon">
        ⇅
      </div>

      <div className="exchange-box">

        <label>Buy</label>

        <div className="exchange-row">
          <select
            value={buy}
            onChange={(e) => setBuy(e.target.value)}
          >
            {Object.keys(rates).map((coin) => (
              <option key={coin} value={coin}>
                {coin.toUpperCase()}
              </option>
            ))}
          </select>

          <div className="buy-result">
            {result || "0.000000"}
          </div>
        </div>

      </div>

      <button
        className="exchange-btn"
        onClick={handleExchange}
      >
        Exchange
      </button>

    </div>
  );
}

export default ExchangeConverter;
