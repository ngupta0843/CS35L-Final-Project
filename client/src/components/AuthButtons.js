import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./AuthButtons.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../components/redux/reducers/userReducer";

const AuthButtons = () => {
  const user = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box className="auth-buttons" sx={{ position: "absolute", top: 20, right: 20 }}>
      <Button
        component={Link} // Make this button a link
        to="/" // Navigate to home page
        variant="outlined"
        className="auth-button"
        sx={{
          color: "white",
          borderColor: "white",
          marginLeft: 2,
          "&:hover": {
            backgroundColor: "#fff",
            color: "#121212",
            boxShadow: "0 0 15px rgba(255, 255, 255, 1)",
          },
        }}
      >
        Home
      </Button>
      <Button
        variant="outlined"
        className="auth-button"
        sx={{
          display: user.isLoggedIn && "none",
          color: "white",
          borderColor: "white",
          marginLeft: 2,
          "&:hover": {
            backgroundColor: "#fff",
            color: "#121212",
            boxShadow: "0 0 15px rgba(255, 255, 255, 1)",
          },
        }}
      >
        Login
      </Button>
      <Button
        component={Link} // Make this button a link
        to="/signup" // Navigate to signup page
        variant="outlined"
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
        className="auth-button"
        sx={{
          display: !user.isLoggedIn && "none",
          color: "white",
          borderColor: "white",
          marginLeft: 2,
          "&:hover": {
            backgroundColor: "#fff",
            color: "#121212",
            boxShadow: "0 0 15px rgba(255, 255, 255, 1)",
          },
        }}
      >
        Logout
      </Button>
      <Button
        variant="outlined"
        className="auth-button"
        sx={{
          color: "white",
          borderColor: "white",
          marginLeft: 2,
          "&:hover": {
            backgroundColor: "#fff",
            color: "#121212",
            boxShadow: "0 0 15px rgba(255, 255, 255, 1)",
          },
        }}
      >
        Signup
      </Button>
    </Box>
  );
};

export default AuthButtons;
