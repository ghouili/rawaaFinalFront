import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Navbar, Sidebar } from "../components/index";
import {
  Dashboard,
  Login,
  Users,
  Partners,
  Company,
  Statistic,
  Register,
} from "../containers";
import PrivateRoute from "./PrivateRoute";
import Test from "../components/Test";

const MainRoute = () => {
  const location = useLocation();

  return (
    <div>
      {/* if (location){null} else {

        } */}
      {location.pathname === "/login" ||
        location.pathname === "/register" ? null : (
        <Navbar />
      )}

      <div className="main__sidebar w-screen flex flex-row">
        {location.pathname === "/login" ||
          location.pathname === "/register" ? null : (
          <Sidebar />
        )}
        <div className="w-full overflow-auto" style={{ minHeight: "80vh" }} >
          <Routes>
            <Route
              index
              element={
                // <PrivateRoute>
                <Dashboard />
                // </PrivateRoute>
              }
            />
            <Route path="users" element={<Users />} />
            <Route path="partners" element={<Partners />} />
            <Route path="company" element={<Company />} />
            <Route path="login" element={<Login />} />
            <Route path="statistic" element={<Statistic />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="test" element={<Test />} />

            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainRoute;
