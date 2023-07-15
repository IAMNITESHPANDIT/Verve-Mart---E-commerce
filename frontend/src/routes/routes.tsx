import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Login from "../components/login/Login";
import { useEffect, useState } from "react";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import { GET_CATEGORY, GET_SLIDERS } from "../services/endPoints";
import Slider from "../components/slider/Slider";
import { get } from "../services/networkCalls";
import CategoryList from "../components/category/Categoryt";

function RoutePath() {
  const navigate = useNavigate();

  const [isVerified, setVerified] = useState(
    sessionStorage.getItem("AUTH_TOKEN") ? true : false
  );

  const [dataSlider, setDataSlider] = useState<any>([]);

  const [categoryData, setCategoryData] = useState<any>([]);

  const setSigninStatus = (status: boolean) => {
    console.log("setVerified", status);

    setVerified(status);
    if (status) {
      navigate("/Dashboard");
    }
  };

  const fetchSliderItems = async () => {
    try {
      const data: any = await get(GET_SLIDERS);
      setDataSlider(data.data);
      const getCategory: any = await get(GET_CATEGORY);
      setCategoryData(getCategory.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSliderItems();
  }, []);

  return (
    <div>
      <Header />
      <Slider data={dataSlider} />
      <CategoryList data={categoryData} />

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
      <Footer />
    </div>
  );
}

export default RoutePath;
