import React, { useState, memo, useReducer } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
  Icon,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/userReducer.js";

const LogIn = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useState hooks
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleEmailChange = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      email: e.target.value,
    });
    console.log(user);
  };

  const handleSend = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      setError(true);
      return;
    }
    setError(false);

    try {
      const response = await axios.post("http://localhost:8088/users/signin", {
        email: user.email,
        password: user.password,
      });

      console.log(response);
<<<<<<< HEAD
      switch (response.status) {
        case 200:
          navigate("/dashboard", { state: { user: user.email } });
          break;
        default:
          alert("Signup Failed");
          break;
=======

      if (response.status === 200) {
        console.log("first part");
        console.log("API response data:", response.data);

        try {
          console.log(response.data.result.name, response.data.result.email);
          dispatch(
            login({
              firstname: response.data.result.name,
              email: response.data.result.email,
            })
          );
          console.log("second part");
          navigate("/dashboard");
        } catch (dispatchError) {
          console.error("Dispatch error:", dispatchError);
        }
      } else {
        alert("Signup Failed");
>>>>>>> test
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            alert("Account doesn't exist");
            break;
          default:
            alert("Signup Failed");
            break;
        }
      } else {
        console.error("Network or server error:", error);
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#121212",
        width: "100%",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          padding: 3,
          backgroundColor: "#1c1c1c",
        }}
      >
        <Box textAlign="center">
          <Icon
            component={FitnessCenterIcon}
            sx={{ fontSize: "5rem", color: "#ffffff" }}
          />
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Fitness is my Passion
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "1.2rem", width: "100%" }}
          >
            "I discovered the bootybuilder using this app and have not turned
            (my) back since." - Akarsh Legala, current student at UCLA
          </Typography>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          color: "#ffffff",
          backgroundColor: "#121212",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          Sign into your account
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaaaaa", mb: 3 }}>
          Enter your email below to sign in.
        </Typography>

        {error && (
          <Typography variant="body2" sx={{ color: "red", mb: 3 }}>
            Error: Please enter a valid email address.
          </Typography>
        )}
        {/* email textfield */}
        <TextField
          required
          fullWidth
          label="Email"
          variant="filled"
          type="email"
          placeholder="name@example.com"
          value={user.email}
          onChange={handleEmailChange}
          sx={{
            mb: 2,
            backgroundColor: "#333333",
            borderRadius: 1,
            "& .MuiFilledInput-root": {
              color: "#ffffff",
              "&:before": { borderBottomColor: "#666666" },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#aaaaaa",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "#aaaaaa" },
          }}
        />
        {/* password textfield */}
        <TextField
          required
          fullWidth
          label="Password"
          variant="filled"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          onChange={(e) => {
            e.preventDefault();
            setUser({
              ...user,
              password: e.target.value,
            });
          }}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          sx={{
            mb: 2,
            backgroundColor: "#333333",
            borderRadius: 1,
            "& .MuiFilledInput-root": {
              color: "#ffffff",
              "&:before": { borderBottomColor: "#666666" },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#aaaaaa",
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    color: "#aaaaaa",
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { color: "#aaaaaa" },
          }}
        />

        <Button
          fullWidth
          onClick={handleSend}
          variant="contained"
          sx={{
            mb: 3,
            backgroundColor: "#ffffff",
            color: "#000000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
        >
          Sign In
        </Button>

        <Divider sx={{ width: "100%", my: 2, color: "#aaaaaa" }}>
          OR CONTINUE WITH
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GitHubIcon />}
          sx={{
            color: "#ffffff",
            borderColor: "#ffffff",
            "&:hover": { backgroundColor: "#333333", borderColor: "#ffffff" },
          }}
        >
          GitHub
        </Button>

        <Typography
          variant="body2"
          sx={{ color: "#aaaaaa", mt: 3, textAlign: "center" }}
        >
          By clicking continue, you agree to our{" "}
          <Link href="#" sx={{ color: "#ffffff", textDecoration: "underline" }}>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" sx={{ color: "#ffffff", textDecoration: "underline" }}>
            Privacy Policy
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
});

export default LogIn;
