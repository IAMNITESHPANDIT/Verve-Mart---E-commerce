import "./footer.style.scss";

const Footer = () => {
  const generateYear = () => {
    return new Date().getFullYear();
  };
  return (
    <footer className="footer">
      <div className="links">
        <ul>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>FAQs</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="copy">
        © {generateYear()} Verve-Mart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
