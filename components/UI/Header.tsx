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
      {/* <nav className="flex space-x-4">
        <a href="/" className="hover:text-gray-400 text-white">Home</a>
        <a href="/about" className="hover:text-gray-400 text-white">About</a>
        <a href="/contact" className="hover:text-gray-400 text-white">Contact</a>
      </nav> */}
    </header>
  );
};

export default Header;