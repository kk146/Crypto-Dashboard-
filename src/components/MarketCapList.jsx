import "../Styles/marketcap.css";

function MarketCapList({ coins }) {
  if (!coins || coins.length === 0) {
    return (
      <div className="marketcap-card">
        <h2>Cryptocurrency by Market Cap</h2>

        <div className="market-loading">
          Loading cryptocurrencies...
        </div>
      </div>
    );
  }

  return (
    <div className="marketcap-card">

      <div className="marketcap-header">
        <h2>
          Cryptocurrency by
          <br />
          market cap
        </h2>
      </div>

      <div className="market-list">

        {coins.slice(0, 8).map((coin) => {

          const change = Number(
            coin.price_change_percentage_24h || 0
          );

          return (
            <div
              className="market-item"
              key={coin.id}
            >

              {/* Left */}
              <div className="market-left">

                <img
                  src={coin.image}
                  alt={coin.name}
                  className="market-coin-image"
                />

                <div className="market-info">

                  <div className="market-name">
                    {coin.name}
                  </div>

                  <div className="market-symbol">
                    Mkt.Cap{" "}
                    {Number(
                      coin.market_cap || 0
                    ).toLocaleString()}
                  </div>

                </div>

              </div>

              {/* Right */}
              <div
                className={`market-change ${
                  change >= 0
                    ? "positive"
                    : "negative"
                }`}
              >

                <span className="change-arrow">
                  {change >= 0 ? "▲" : "▼"}
                </span>

                {Math.abs(change).toFixed(2)}%

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default MarketCapList;
