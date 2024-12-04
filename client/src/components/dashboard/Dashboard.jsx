import React from "react";
import { Box, Grid, Card, CardContent, Typography, Button, ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Create a custom dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      color: "#B3B3B3",
    },
    button: {
      textTransform: "none",
    },
  },
});

const Dashboard = () => {
  const navigate = useNavigate();

  // Handle navigation to workout log
  const handleWorkoutLogRedirect = () => {
    navigate("/workout-log");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          padding: "5vh 2vw",
          backgroundColor: "background.default",
          minHeight: "100vh",
          color: "text.primary",
        }}
      >
        {/* Welcome Header */}
        <Typography variant="h5" gutterBottom>
          Welcome to Your Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Top Section: Two Statistic Cards */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "background.paper", borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Calories Burned
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  12,000.00 kcal
                </Typography>
                <Typography variant="body2" color="secondary">
                  +10% Total calories burned today
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "background.paper", borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Workouts
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  5.00
                </Typography>
                <Typography variant="body2" color="secondary">
                  +10% Total number of workouts today
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Middle Section: Weekly Stats and Categories */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "background.paper", borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Weekly Calories Burned
                </Typography>
                {/* Placeholder for Chart */}
                <Box
                  sx={{
                    backgroundColor: "#333333",
                    height: "200px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography color="text.secondary">Bar Chart Placeholder</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "background.paper", borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Workout Categories
                </Typography>
                {/* Placeholder for Pie Chart */}
                <Box
                  sx={{
                    backgroundColor: "#333333",
                    height: "200px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography color="text.secondary">Pie Chart Placeholder</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Button to Redirect to Workout Log */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleWorkoutLogRedirect}
            sx={{
              fontWeight: "bold",
              borderRadius: "24px",
              padding: "10px 20px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            Go to Workout Log
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
