import "../Styles/Header.css";

function Header({ currency, setCurrency, search, setSearch }) {
  return (
    <header className="header">

      {/* Currency Dropdown */}
      <div className="currency-box">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
          <option value="gbp">GBP</option>
        </select>
      </div>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

    </header>
  );
}

export default Header;
