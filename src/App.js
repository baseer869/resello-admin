import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";

import "./App.css";
import Orders from "./pages/Orders/index.jsx";
import Products from "./pages/Product/product.jsx";
import Login from "./components/login/login.jsx";
import OrderView from "./pages/orderView./orderView";

function App() {
  return (
    <Router>
      <div className="dashboard-container">
        <SideBar menu={sidebar_menu} />
        {process.env.SERVER}
        <div className="dashboard-body">
          <Routes>
            <Route exact path="/" element={<div></div>} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/orderView" element={<OrderView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
