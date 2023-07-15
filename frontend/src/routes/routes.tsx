import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../components/login/Login";
import { useState } from "react";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../components/Dashboard/Dashboard";

import DefaultComponents from "../components/default/Default";

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
      <DefaultComponents>
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
              <ProtectedRoute isVerified={isVerified} redirectPath="/Login">
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </DefaultComponents>
    </div>
  );
}

export default RoutePath;
