import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Login from "../components/login/Login";
import { useState } from "react";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

function RoutePath() {
  const navigate = useNavigate();

  const [isVerified, setVerified] = useState(
    sessionStorage.getItem("AUTH_TOKEN") ? true : false
  );
  const setSigninStatus = (status: boolean) => {
    console.log("setVerified", status);

    setVerified(status);
    if (status) {
      navigate("/Dashboard");
    }
  };

  return (
    <div>
      <Header />

      <Routes>
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
            <ProtectedRoute isVerified={isVerified} redirectPath="/Dashboard">
              <h2>Dashboard</h2>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default RoutePath;
