import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// Component imports
import LandingPage from "./pages/landing";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import UserProfile from "./pages/profile";
import AuthButtons from "./components/AuthButtons";
import QA from "./pages/QA";

function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <AuthButtons />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/fitness-planner" element={<QA />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
