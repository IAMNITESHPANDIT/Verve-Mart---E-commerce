import "./header.style.scss";
import Logo from "../../assest/images/logo.png";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const getLoggedInUserDetails = () => {
  return sessionStorage.getItem("USER_DETAIL")
    ? sessionStorage.getItem("USER_DETAIL") || ""
    : {};
};
const Header = () => {
  const navigate = useNavigate();
  const data: any = sessionStorage.getItem("USER_DETAIL")
    ? JSON.parse(sessionStorage.getItem("USER_DETAIL") || "")
    : {};

  const cart: any = useSelector((state: any) => state.cart.CART_ITEMS);

  const navigateScreen = (url?: any) => {
    navigate(`${url}`);
    return;
  };

  return (
    <header className="verve-header">
      <Container>
        <Row className="align-items-center">
          <Col sm={12} md={3} className="verve-header__logo">
            <img
              src={Logo}
              alt="Verve Logo"
              onClick={() => navigateScreen(`/Dashboard`)}
            />
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
            <>
              <div className="verve-header__nav-option">
                <span className="option-line-one">
                  Hello,
                  {data?.name ? (
                    data?.name
                  ) : (
                    <span onClick={() => navigateScreen(`/Login`)}>
                      {" "}
                      Sign in
                    </span>
                  )}
                </span>
                <span className="option-line-two">Account &amp; Lists</span>
              </div>
              {data?.name && (
                <>
                  <div className="verve-header__nav-option">
                    <span className="option-line-one">Returns</span>
                    <span
                      className="option-line-two"
                      onClick={() => navigateScreen(`/orders`)}
                    >
                      &amp; Orders
                    </span>
                  </div>
                  <div className="verve-header__nav-option">
                    <span className="option-line-one">Your</span>
                    <span className="option-line-two">Prime</span>
                  </div>
                  <div className="verve-header__nav-cart">
                    <span className="cart-count">{cart.length}</span>
                    <span
                      className="cart-icon"
                      onClick={() => navigateScreen(`/cart`)}
                    >
                      &#x1F6D2;
                    </span>
                  </div>
                </>
              )}
            </>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
