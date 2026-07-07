import logo from "../assets/alma-logo.png";
import "../Styles/logo.css";

function Logo() {
  return (
    <div className="logo-container">
      <img
        src={logo}
        alt="AlmaBetter Logo"
        className="logo-image"
      />
    </div>
  );
}

export default Logo;
