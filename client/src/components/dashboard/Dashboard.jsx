import React, { useState, useEffect } from "react";
import { Box, Grid, Button, ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { useNavigate } from "react-router-dom";

import StatCard from "./StatCard";
import ChecklistCard from "./ChecklistCard";
import PieChartCard from "./PieChartCard";
import BarChartCard from "./BarChartCard";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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
});

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [categoryData, setCategoryData] = useState({});
  const [dailyWorkoutData, setDailyWorkoutData] = useState([]);
  const navigate = useNavigate();
  const baseURL = "http://localhost:8088/api";

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const today = new Date();
        const dates = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          return {
            dateString: date.toISOString().split("T")[0],
            formattedDate: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          };
        });

        let weeklyCategories = {};
        let dailyWorkouts = Array(7).fill(0);

        for (let i = 0; i < dates.length; i++) {
          const { dateString } = dates[i];
          try {
            const response = await axios.get(`${baseURL}/workouts/${user.email}/${dateString}`);
            response.data.workouts.forEach((workout) => {
              weeklyCategories[workout.category] = (weeklyCategories[workout.category] || 0) + 1;
            });
            dailyWorkouts[i] = response.data.workouts.length;
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.warn(`No workouts found for ${dateString}`);
            } else {
              console.error(`Error fetching workouts for ${dateString}:`, error);
            }
          }
        }

        setCategoryData(weeklyCategories);
        setDailyWorkoutData({ labels: dates.map((d) => d.formattedDate), data: dailyWorkouts });
      } catch (error) {
        console.error("Error fetching weekly workout data:", error);
      }
    };

    if (user.email) fetchWeeklyData();
  }, [user.email]);

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ["#64b5f6", "#81c784", "#ba68c8", "#f06292", "#ffd54f"],
      },
    ],
  };

  const barData = {
    labels: dailyWorkoutData.labels || [],
    datasets: [
      {
        label: "Workouts Per Day",
        data: dailyWorkoutData.data || [],
        backgroundColor: "#64b5f6",
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: "#FFFFFF" }, grid: { color: "#424242" } },
      y: { ticks: { color: "#FFFFFF" }, grid: { color: "#424242" } },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ padding: "5vh 2vw", minHeight: "100vh" }}>
        <Grid container spacing={3}>
          {/* Statistic Cards */}
          <Grid item xs={12} md={4}>
            <StatCard title="Calories Burned" value="12,000 kcal" description="+10% compared to yesterday" color="primary" />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard title="Workouts Completed" value="5 Workouts" description="+15% increase from last week" color="primary" />
          </Grid>
          <Grid item xs={12} md={4}>
            <ChecklistCard goals={["Complete 10,000 steps", "Hit 3 workout categories", "Burn 500 calories"]} />
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <PieChartCard title="Workout Categories" data={pieData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <BarChartCard title="Weekly Workouts" data={barData} options={barOptions} />
          </Grid>
        </Grid>

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
