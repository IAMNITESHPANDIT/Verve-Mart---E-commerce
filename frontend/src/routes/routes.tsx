import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../components/login/Login";
import { useState } from "react";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CategoryItems from "../pages/category-items/CategoryItems";
import Payment from "../pages/payment/Payment";
import AddressForm from "../pages/address/Address";
import CartList from "../components/cart/Cart";
import Registration from "../components/signup/Registration";

function RoutePath() {
  const navigate = useNavigate();

  const [isVerified, setVerified] = useState(
    sessionStorage.getItem("AUTH_TOKEN") ? true : false
  );

  const setSigninStatus = (status: boolean) => {
    setVerified(status);
    if (status) {
      navigate("/Dashboard");
    }
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/Dashboard" />} />
        <Route
          path="/login"
          element={
            <PublicRoute isVerified={isVerified} redirectPath="/Dashboard">
              <Login setSigninStatus={setSigninStatus} />
            </PublicRoute>
          }
        ></Route>

        <Route
          path="/Dashboard"
          element={
            <PublicRoute isVerified={false} redirectPath="/Dashboard">
              <Dashboard />
            </PublicRoute>
          }
        ></Route>

        <Route
          path="/:categoryName/:categoryId"
          element={
            <PublicRoute isVerified={false} redirectPath="/Dashboard">
              <CategoryItems />
            </PublicRoute>
          }
        ></Route>

        <Route
          path="/checkout-page/:productId"
          element={
            <ProtectedRoute isVerified={isVerified} redirectPath="/Login">
              <AddressForm />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/payment/:productId/:addressId"
          element={
            <ProtectedRoute isVerified={isVerified} redirectPath="/Login">
              <Payment />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/cart"
          element={
            <ProtectedRoute isVerified={isVerified} redirectPath="/Login">
              <CartList />
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/register"
          element={
            <PublicRoute isVerified={false} redirectPath="/Dashboard">
              <Registration />
            </PublicRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default RoutePath;
