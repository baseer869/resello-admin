import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";

import "./App.css";
import Orders from "./pages/Orders/index.jsx";
import Products from "./pages/Product/product.jsx";
import Login from "./components/login/login.jsx";
import OrderView from "./pages/orderView/orderView";
<<<<<<< Updated upstream
import UserListView from './pages/User/Index'
=======
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <div className="dashboard-container"> 
        <SideBar menu={sidebar_menu} />
        {process.env.SERVER}
        <div className="dashboard-body">
          <Routes>
            <Route exact path="/" element={<div></div>} />
            <Route
              exact
              path="/orders"
              element={
                <Orders
                  completed={true}
                  rejected={true}
                  pending={true}
                  canceled={true}
                />
              }
            />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/orderView/:id" element={<OrderView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
