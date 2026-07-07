import "../Styles/marketcap.css";

function MarketCapList({ coins }) {
  if (!coins || coins.length === 0) {
    return <div className="market-card">Loading...</div>;
  }

  return (
    <div className="market-card">
      <h2 className="section-title">Cryptocurrency by Market Cap</h2>

      <div className="market-list">
        {coins.slice(0, 10).map((coin) => (
          <div className="coin-row" key={coin.id}>
            <div className="coin-info">
              <img src={coin.image} alt={coin.name} />

              <div>
                <h4>{coin.name}</h4>

                <span>{coin.symbol.toUpperCase()}</span>
              </div>
            </div>

            <div className="coin-price">
              <strong>${coin.current_price.toLocaleString()}</strong>

              <span
                className={
                  coin.price_change_percentage_24h >= 0 ? "green" : "red"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketCapList;
