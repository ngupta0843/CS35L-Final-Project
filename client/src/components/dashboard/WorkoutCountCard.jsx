import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import axios from "axios";

const WorkoutCountCard = ({ title, goal, userEmail, baseURL }) => {
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toISOString().split("T")[0];

      try {
        const [todayResponse, yesterdayResponse] = await Promise.all([
          axios.get(`${baseURL}/workouts/${userEmail}/${today}`),
          axios.get(`${baseURL}/workouts/${userEmail}/${yesterdayDate}`),
        ]);

        const todayWorkouts = todayResponse.data.workouts || [];
        const yesterdayWorkouts = yesterdayResponse.data.workouts || [];

        setWorkoutsCompleted(todayWorkouts.length);

        const yesterdayCount = yesterdayWorkouts.length;
        const change = yesterdayCount
          ? ((todayWorkouts.length - yesterdayCount) / yesterdayCount) * 100
          : 0;
        setPercentageChange(change);
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setWorkoutsCompleted(0);
        setPercentageChange(0);
      }
    };

    fetchWorkouts();
  }, [userEmail, baseURL]);

  const isGoalComplete = workoutsCompleted >= goal;

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 16, right: 16, color: "primary.main" }}>
        <FitnessCenterIcon fontSize="large" />
      </Box>
      <CardContent sx={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            {title}
          </Typography>
          <Chip
            label={isGoalComplete ? "Goal Complete" : "Goal Not Complete"}
            color={isGoalComplete ? "success" : "warning"}
            sx={{
              fontSize: "15px",
              alignSelf: "flex-end",
              marginRight: "40px"
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: "20px" }}> 
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            {workoutsCompleted} / {goal}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              color: percentageChange >= 0 ? "#90ee90" : "red",
            }}
          >
            {percentageChange >= 0 ? "+" : ""}
            {percentageChange.toFixed(2)}%{" "}
            {percentageChange >= 0 ? "increase" : "decrease"} from yesterday
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "8px" }}
        >
          Total no of workouts today
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WorkoutCountCard;
