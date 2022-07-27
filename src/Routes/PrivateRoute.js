import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
const useAuth = () => {
  let aut = JSON.parse(localStorage.getItem("login"));
  const user = { loggedIn: aut.value };
  return user && user.loggedIn;
};
function PrivateRoute() {
  const isAuth = useAuth();
  return isAuth ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="/auth" />
  );
}

export default PrivateRoute;
