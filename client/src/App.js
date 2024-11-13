import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// function imports
import LandingPage from "./pages/landing";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import Header from "./components/Header";
import Dashboard from "./components/dashboard/Dashboard";
import AuthButtons from "./components/AuthButtons";

function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <Header />
        <AuthButtons />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
