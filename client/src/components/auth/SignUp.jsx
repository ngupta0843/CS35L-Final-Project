import React, { useState, memo } from "react";
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

const SignUp = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useState hooks
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
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
      const response = await axios.post("http://localhost:8088/users/signup", {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      });
      console.log(response);
      switch (response.status) {
        case 201:
          try {
            dispatch(
              login({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
              })
            );
            navigate("/fitness-planner");
          } catch (dispatchError) {
            console.error("Dispatch error:", dispatchError);
          }

          break;
        default:
          alert("Signup Failed");
          break;
      }
    } catch (error) {
      switch (error.response.status) {
        case 400:
          alert("User already exists");
          break;
        default:
          alert("Signup Failed");
          break;
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
            “This app has helped me reduce over 540 pounds, saving me from
            morbid obesity.” - Sachit Murthy, current student at UCLA.
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
          Create an account
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaaaaa", mb: 3 }}>
          Enter your email below to create your account
        </Typography>

        {error && (
          <Typography variant="body2" sx={{ color: "red", mb: 3 }}>
            Error: Please enter a valid email address.
          </Typography>
        )}

        {/* first name textfield */}
        <TextField
          required
          fullWidth
          label="First Name"
          variant="filled"
          type="firstname"
          placeholder="Aditya"
          value={user.firstname}
          onChange={(e) => {
            e.preventDefault();
            setUser({
              ...user,
              firstname: e.target.value,
            });
          }}
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
        {/* last name textfield */}
        <TextField
          required
          fullWidth
          label="Last Name"
          variant="filled"
          type="lastname"
          placeholder="Murthy"
          value={user.lastname}
          onChange={(e) => {
            e.preventDefault();
            setUser({
              ...user,
              lastname: e.target.value,
            });
          }}
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
          Sign Up with Email
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

export default SignUp;
