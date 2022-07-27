import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticationPage from "../pages/AuthenticationPage";
import IDOPage from "../pages/IDOPage";
import PrivateRoute from "./PrivateRoute";

import { store } from "../Redux/store";

function RouteList() {
  console.log(store.getState());
  return (
    <Routes>
      <Route index path="/auth" element={<AuthenticationPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to="/ido" />} />
        <Route path="/ido" element={<IDOPage />} />
        <Route path="*" element={<Navigate to="/ido" />} />
      </Route>
    </Routes>
  );
}

export default RouteList;
