import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
  Icon,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const SignUp = () => {
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

        <TextField
          fullWidth
          label="Email"
          variant="filled"
          placeholder="name@example.com"
          sx={{ mb: 2, backgroundColor: "#333333", borderRadius: 1 }}
          InputProps={{
            style: { color: "#ffffff" },
          }}
          InputLabelProps={{
            style: { color: "#aaaaaa" },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mb: 3,
            backgroundColor: "#ffffff",
            color: "#000000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
        >
          Sign In with Email
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
};

export default SignUp;
