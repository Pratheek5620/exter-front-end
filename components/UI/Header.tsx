import React from "react";
import Image from "next/image";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header style={{ backgroundColor: "rgb(19, 50, 43)", color: "white", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <Image src={"/vivitron_logo.png"} alt={"logo"}  width={150}
            height={100}
            priority/>
      </div>

    </header>
  );
};

export default Header;