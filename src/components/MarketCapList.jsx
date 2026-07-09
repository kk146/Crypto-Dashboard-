import "../Styles/marketcap.css";

function MarketCapList({ coins }) {
  if (!coins || coins.length === 0) {
    return (
      <div className="marketcap-card">
        <h2>Cryptocurrency by Market Cap</h2>

        <div className="loading-market">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="marketcap-card">

      <h2 className="market-title">
        Cryptocurrency by Market Cap
      </h2>

      <div className="market-list">

        {coins.slice(0, 10).map((coin) => (

          <div
            className="market-item"
            key={coin.id}
          >

            <div className="market-left">

              <img
                src={coin.image}
                alt={coin.name}
                className="coin-logo"
              />

              <div className="coin-details">

                <h4>{coin.name}</h4>

                <p>
                  Mkt Cap $
                  {coin.market_cap.toLocaleString()}
                </p>

              </div>

            </div>

            <div className="market-right">

              <span
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "positive"
                    : "negative"
                }
              >
                {coin.price_change_percentage_24h >= 0 ? "▲ " : "▼ "}
                {Math.abs(
                  coin.price_change_percentage_24h
                ).toFixed(2)}
                %
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MarketCapList;
