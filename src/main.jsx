import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/auth/Login";
import MainContent from "./pages/main/Index";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import TipsTrik from "./pages/tips/TipsTrik";
import VerifyOTP from "./pages/auth/VerifyOTP";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/tips/:id" element={<TipsTrik />} />
        <Route path="*" element={<MainContent />} />
      </Routes>
    </Router>
    {/* <App /> */}
  </React.StrictMode>
);
