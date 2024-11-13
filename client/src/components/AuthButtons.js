import React from "react";
import { Button, Box } from "@mui/material";
import "./AuthButtons.css";
import { useNavigate } from "react-router-dom";

const AuthButtons = () => {
  const navigate = useNavigate();
  return (
    <Box
      className="auth-buttons"
      sx={{ position: "absolute", top: 20, right: 20 }}
    >
      <Button
        onClick={() => navigate("/")}
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
        onClick={() => navigate("/login")}
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
        variant="outlined"
        className="auth-button"
        onClick={() => navigate("/signup")}
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
