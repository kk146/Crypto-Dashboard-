import { useEffect, useState } from "react";
import { getExchangeRates } from "../Services/api";
import "../Styles/converter.css";

function ExchangeConverter({ currency = "usd" }) {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState(currency);
  const [to, setTo] = useState("btc");
  const [result, setResult] = useState("");

  useEffect(() => {
    const loadRates = async () => {
      try {
        const data = await getExchangeRates();

        if (data) {
          setRates(data);
        }
      } catch (error) {
        console.error("Exchange API Error:", error);
      }
    };

    loadRates();
  }, []);

  useEffect(() => {
    setFrom(currency);
  }, [currency]);

  const convert = () => {
    if (!amount || isNaN(amount)) {
      setResult("Please enter a valid amount");
      return;
    }

    if (!rates[from] || !rates[to]) {
      setResult("Conversion unavailable");
      return;
    }

    const fromRate = rates[from].value;
    const toRate = rates[to].value;

    const btcValue = Number(amount) / fromRate;
    const converted = btcValue * toRate;

    const text =
      amount +
      " " +
      from.toUpperCase() +
      " = " +
      converted.toFixed(6) +
      " " +
      to.toUpperCase();

    setResult(text);
  };

  return (
    <div className="converter">
      <h2 className="section-title">Exchange Coins</h2>

      <input
        type="number"
        value={amount}
        placeholder="Enter Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="converter-row">
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {Object.keys(rates).map((key) => (
            <option key={key} value={key}>
              {key.toUpperCase()}
            </option>
          ))}
        </select>

        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {Object.keys(rates).map((key) => (
            <option key={key} value={key}>
              {key.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <button className="convert-btn" onClick={convert}>
        Convert
      </button>

      {result && <div className="result-box">{result}</div>}
    </div>
  );
}

export default ExchangeConverter;
