// FitnessCalendar.jsx

import React, { useState } from "react";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { Card, Typography, Box } from "@mui/material";
import dayjs from "dayjs";

// Styled components
const CalendarContainer = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
  gap: 20px;
`;

const CalendarWrapper = styled(Box)`
  flex: 1;
`;

const WorkoutWrapper = styled(Box)`
  flex: 0.35;
  max-width: 400px;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #333;  /* Dark background */
  color: white;  /* White text color */
`;

const WorkoutTitle = styled(Typography)`
  font-weight: bold;
  font-size: 18px;
`;

const WorkoutDescription = styled(Typography)`
  font-size: 14px;
  margin-top: 10px;
`;

const mockWorkouts = [
  {
    date: "2024-12-01",
    title: "Morning Yoga",
    description: "A full body stretch and relaxation session.",
  },
  {
    date: "2024-12-02",
    title: "Cardio Workout",
    description: "High-intensity interval training (HIIT) session.",
  },
];

const FitnessCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Initialize with current date
  const [workoutDescription, setWorkoutDescription] = useState("No workouts done today!");

  // Handle the date change
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);

    const workoutForSelectedDate = mockWorkouts.find(workout =>
      dayjs(workout.date).isSame(newDate, "day")
    );

    if (workoutForSelectedDate) {
      setWorkoutDescription(`${workoutForSelectedDate.title}: ${workoutForSelectedDate.description}`);
    } else {
      setWorkoutDescription("No workouts done today!");
    }
  };

  return (
    <CalendarContainer>
      {/* Calendar Section */}
      <CalendarWrapper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </CalendarWrapper>

      {/* Workout Details Section */}
      <WorkoutWrapper>
        <WorkoutTitle>Workout for {selectedDate.format("MMMM D, YYYY")}</WorkoutTitle>
        <WorkoutDescription>{workoutDescription}</WorkoutDescription>
      </WorkoutWrapper>
    </CalendarContainer>
  );
};

export default FitnessCalendar;
