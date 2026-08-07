import { useState } from "react";
import "../Styles/converter.css";

function ExchangeConverter({ currency }) {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState(currency || "usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [result, setResult] = useState(null);

  const rates = {
    usd: {
      inr: 87,
      eur: 0.86,
      gbp: 0.75,
      usd: 1,
    },
    inr: {
      usd: 0.0115,
      eur: 0.0099,
      gbp: 0.0086,
      inr: 1,
    },
    eur: {
      usd: 1.16,
      inr: 101,
      gbp: 0.87,
      eur: 1,
    },
    gbp: {
      usd: 1.34,
      inr: 116,
      eur: 1.15,
      gbp: 1,
    },
  };

  const handleExchange = () => {
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setResult(null);
      return;
    }

    const rate = rates[fromCurrency]?.[toCurrency] || 1;

    setResult(numericAmount * rate);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  return (
    <div className="converter-card">

      <div className="converter-header">
        <div>
          <h2>Exchange Coins</h2>
          <p>Convert your currency</p>
        </div>
      </div>

      {/* Amount */}
      <div className="amount-group">
        <label>Amount</label>

        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1000"
        />
      </div>

      {/* Currency selectors */}
      <div className="converter-row">

        <div className="currency-field">
          <label>Sell</label>

          <select
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(e.target.value);
              setResult(null);
            }}
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </div>

        <button
          type="button"
          className="swap-button"
          onClick={swapCurrencies}
          aria-label="Swap currencies"
        >
          ⇄
        </button>

        <div className="currency-field">
          <label>Buy</label>

          <select
            value={toCurrency}
            onChange={(e) => {
              setToCurrency(e.target.value);
              setResult(null);
            }}
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </div>

      </div>

      {/* Exchange button */}
      <button
        type="button"
        className="convert-btn"
        onClick={handleExchange}
      >
        Exchange
      </button>

      {/* Result */}
      {result !== null && (
        <div className="result-box">
          <span>
            {Number(amount).toLocaleString()}{" "}
            {fromCurrency.toUpperCase()}
          </span>

          <strong>
            =
          </strong>

          <span>
            {result.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            {toCurrency.toUpperCase()}
          </span>
        </div>
      )}

    </div>
  );
}

export default ExchangeConverter;
