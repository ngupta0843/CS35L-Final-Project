import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, Checkbox, FormGroup, FormControlLabel, ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend);

// Custom dark theme
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
  },
});

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [categoryData, setCategoryData] = useState({});
  const navigate = useNavigate();
  const baseURL = "http://localhost:8088/api";

  useEffect(() => {
    const fetchWeeklyWorkoutCategories = async () => {
      try {
        const today = new Date();
        const dates = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          return date.toISOString().split("T")[0];
        });
  
        let weeklyCategories = {};
  
        for (const date of dates) {
          try {
            console.log(`Fetching workouts for date: ${date}`);
            const response = await axios.get(`${baseURL}/workouts/${user.email}/${date}`);
            response.data.workouts.forEach((workout) => {
              weeklyCategories[workout.category] = (weeklyCategories[workout.category] || 0) + 1;
            });
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.warn(`No workouts found for ${date}`);
            } else {
              console.error(`Error fetching workouts for ${date}:`, error);
            }
          }
        }
  
        setCategoryData(weeklyCategories);
      } catch (error) {
        console.error("Error fetching weekly workout categories:", error);
        setCategoryData({});
      }
    };
  
    if (user.email) fetchWeeklyWorkoutCategories();
  }, [user.email]);

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ["#64b5f6", "#81c784", "#ba68c8", "#f06292", "#ffd54f"],
        hoverBackgroundColor: ["#42a5f5", "#66bb6a", "#ab47bc", "#ec407a", "#ffca28"],
        borderColor: "#1E1E1E",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right', // Place legend on the right side
        labels: {
          font: {
            color: "#FFFFFF",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => tooltipItem.label, // Show only the category name
        },
      },
      datalabels: {
        display: false, // Disable percentage display
      },
    },
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allow resizing the chart
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ padding: "5vh 2vw", minHeight: "100vh" }}>
        <Grid container spacing={3}>
          {/* Statistic Cards */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 4,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Calories Burned
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  12,000 kcal
                </Typography>
                <Typography variant="body2" color="secondary">
                  +10% compared to yesterday
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 4,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Workouts Completed
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  5 Workouts
                </Typography>
                <Typography variant="body2" color="secondary">
                  +15% increase from last week
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Checklist Placeholder */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: "background.paper",
                borderRadius: 4,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                padding: "20px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Workout Goals
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox sx={{ color: "primary.main" }} />}
                  label="Complete 10,000 steps"
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: "primary.main" }} />}
                  label="Hit 3 workout categories"
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: "primary.main" }} />}
                  label="Burn 500 calories"
                />
              </FormGroup>
            </Card>
          </Grid>

          {/* Workout Categories & Weekly Chart Section */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {/* Workout Categories */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    backgroundColor: "background.paper",
                    borderRadius: 4,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Workout Categories
                    </Typography>
                    <Box sx={{ position: "relative", width: "100%" }}>
                      {Object.keys(categoryData).length > 0 ? (
                        <Pie style= {{ width: '75vh'}}data={pieData} options={options} />
                      ) : (
                        <Typography color="text.secondary" align="center">
                          No workouts logged in the past week.
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Weekly Chart Placeholder */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    backgroundColor: "background.paper",
                    borderRadius: 4,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Weekly Chart Placeholder
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Button */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/workout-log")}
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
