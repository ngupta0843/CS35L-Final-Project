import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// function imports
import ForumPage from "./pages/forum-page/ForumPage";
import LandingPage from "./pages/home/landing";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import UserProfile from "./pages/profile/profile.jsx";
import AuthButtons from "./components/navigation/AuthButtons";
import VisitedUser from "./pages/profile/VisitedUser";
import QA from "./pages/ai-trainer/QA";
import WorkoutLog from './components/dashboard/Logger/WorkoutLog.jsx'

function App() {
  return (
    <Router>
      <CssBaseline />
      <AuthButtons />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/fitness-planner" element={<QA/>} />
        <Route path="/forum" element={<ForumPage/>} />
        <Route path="/workout-log" element={<WorkoutLog />} />
        <Route path="/profiles" element={<VisitedUser/>} />
      </Routes>
    </Router>
  );
}

export default App;
