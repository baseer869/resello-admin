import React from "react";
import { NavLink } from "react-router-dom";
import "./login.css";
function login() {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="login">
            <button type="submit" className="login-btn">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <NavLink to="/orders">password?</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default login;
