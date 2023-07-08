import "./header.style.scss";
import Logo from "../../assest/images/logo.png";
import { Container, Row, Col } from "react-bootstrap";

const Header = () => {
  return (
    <header className="verve-header">
      <Container>
        <Row className="align-items-center">
          <Col sm={12} md={3} className="verve-header__logo">
            <img src={Logo} alt="Verve Logo" />
          </Col>
          <Col sm={12} md={6} className="verve-header__search">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
              <button type="button" className="btn btn-primary">
                Search
              </button>
            </div>
          </Col>
          <Col sm={12} md={3} className="verve-header__nav">
            <div className="verve-header__nav-option">
              <span className="option-line-one">Hello, Sign in</span>
              <span className="option-line-two">Account &amp; Lists</span>
            </div>
            <div className="verve-header__nav-option">
              <span className="option-line-one">Returns</span>
              <span className="option-line-two">&amp; Orders</span>
            </div>
            <div className="verve-header__nav-option">
              <span className="option-line-one">Your</span>
              <span className="option-line-two">Prime</span>
            </div>
            <div className="verve-header__nav-cart">
              <span className="cart-count">0</span>
              <span className="cart-icon">&#x1F6D2;</span>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
