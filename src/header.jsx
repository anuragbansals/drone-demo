import React from "react";
import drone from "./assets/drone1.png";
import army from "./assets/army.png";

function Header() {
  return (
    <div className="header-container" >
      <img style={{ width: 100, height: 80 }} src={drone} />
      <img style={{ width: 100, height: 80 }} src={army} />
    </div>
  );
}

export default Header;
