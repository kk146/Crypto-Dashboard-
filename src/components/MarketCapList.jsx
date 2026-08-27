import "../Styles/marketcap.css";

function MarketCapList() {
  return (
    <div className="marketcap-card">
      <div className="marketcap-header">
        <h2>
          Cryptocurrency by
          <br />
          market cap
        </h2>
      </div>

      <div className="market-images">
        {/* Top image */}
        <div className="market-image-box">
          <img src="/images/top-image.jpg" alt="Top visual" />
        </div>

        {/* Bottom image */}
        <div className="market-image-box">
          <img src="/images/bottom-image.jpg" alt="Bottom visual" />
        </div>
      </div>
    </div>
  );
}

export default MarketCapList;
