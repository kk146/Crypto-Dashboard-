import logo from "../Almabetterlogo.png";
import "../Styles/logo.css";

function Logo() {
  return (
    <div className="logo">

      <img
        src={logo}
        alt="AlmaBetter"
        className="logo-image"
      />

      <div className="logo-text">
        <h2>ALMA</h2>
        <p>Better Together</p>
      </div>

    </div>
  );
}

export default Logo;
