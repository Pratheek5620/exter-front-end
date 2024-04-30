import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const footerStyle: React.CSSProperties = {
    backgroundColor: '#44D62C',
    color: '#FFFFFF', // Optional: You may want to adjust the text color for better contrast
    padding: '1rem', // Optional: Adjust padding as needed
    textAlign: 'center' // Optional: Center align text
  };

  return (
    <footer style={footerStyle}>
      &copy; {new Date().getFullYear()} VIVITRON
    </footer>
  );
};

export default Footer;
