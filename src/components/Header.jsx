import logo from "../Almabetterlogo.png";
import "../Styles/Header.css";

function Header({ currency, setCurrency, search, setSearch }) {
return (
<header className="header">

      {/* Left Side */}
      <div className="header-left">

        <div className="logo">
          <img
            src={logo}
            alt="AlmaBetter"
            className="logo-image"
          />
        </div>

        <h2 className="logo-title">
          AlmaBetter
        </h2>

      </div>

      {/* Center Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Right Currency */}
      {/* Currency Dropdown */}
<div className="currency-box">
<select
value={currency}
@@ -45,6 +17,16 @@ function Header({ currency, setCurrency, search, setSearch }) {
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
