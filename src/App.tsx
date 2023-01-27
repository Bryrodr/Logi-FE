import React, { useState } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import Login from "./screens/Login";
import DashBoard from "./screens/DashBoard";
import SignUp from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";

import VerifyCode from "./screens/VerifyCode";
import ResetPassword from "./screens/ResetPassword";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <div className="App">
      <Routes>
        {!authenticated ? (
          <Route
            path="/"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
        ) : (
          <Route path="/" element={<DashBoard />} />
        )}
        <Route path="signup" element={<SignUp />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="otp" element={<VerifyCode />} />
        <Route path="resetpassword" element={<ResetPassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
