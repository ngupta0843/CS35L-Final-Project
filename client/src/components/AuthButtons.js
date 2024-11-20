import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./AuthButtons.css";

const AuthButtons = () => {
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
        component={Link} // Make this button a link
        to="/login" // Navigate to login page
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
        Login
      </Button>
      <Button
        component={Link} // Make this button a link
        to="/signup" // Navigate to signup page
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
