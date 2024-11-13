import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import LandingPage from "./pages/landing";
import Login from "./components/auth/SignUp";
import Header from "./components/Header";
import Dashboard from  "./components/dashboard/Dashboard";
import AuthButtons from "./components/AuthButtons";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <CssBaseline />
        <Header />
        <AuthButtons />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
