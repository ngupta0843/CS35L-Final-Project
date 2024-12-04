import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import "./FitnessCalendar.css"; // Make sure this CSS file is correctly imported
import { ContactSupportOutlined, Padding } from "@mui/icons-material";

// Mock Workout Data (more dates)
const mockWorkouts = [
  { date: "2024-12-01", title: "Morning Yoga", description: "A full body stretch and relaxation session." },
  { date: "2024-12-05", title: "HIIT Workout", description: "High-intensity interval training for endurance." },
  { date: "2024-12-10", title: "Strength Training", description: "Focus on building muscle with weights." },
  { date: "2024-12-15", title: "Cardio Run", description: "5k run for cardio endurance." },
];

// Main component
const FitnessCalendar = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedWorkout, setSelectedWorkout] = useState([]); // Change to an empty array initially

  // Function to check if a date has a workout
  const hasWorkoutOnDate = async (date) => {
    console.log("Fetching workout data for", date.format('YYYY-MM-DD'));
    try {
      const response = await axios.get(`http://localhost:8088/api/getExercise/${user.email}`);
      const workout = response.data.some(workout => dayjs(workout.date).isSame(date, 'day'));
      console.log(workout);
      return workout;
    } catch (error) {
      console.error("Error fetching workout data", error);
      return null;
    }
  };

  // Get workout details for the selected date
  const getWorkoutForSelectedDate = async (date) => {
    console.log("Fetching workout data for", date.format('YYYY-MM-DD'));
    try {
      const response = await axios.get(`http://localhost:8088/api/getExercise/${user.email}`);
      const workouts = response.data.filter(workout => dayjs(workout.date).isSame(date, 'day'));
      return workouts || []; // Return an empty array if no workouts are found
    } catch (error) {
      console.error("Error fetching workout data", error);
      return []; // Return an empty array if there's an error
    }
  };

  // Handle day selection
  const handleDateChange = async (newDate) => {
    setSelectedDate(newDate);
    const workouts = await getWorkoutForSelectedDate(newDate);
    console.log("Workouts:", workouts);
    setSelectedWorkout(workouts); // Set the selected workout(s)
    console.log("Selected workout:", workouts);
  };

  useEffect(() => {
    // Initial load for the default selected date
    const fetchInitialWorkout = async () => {
      const workouts = await getWorkoutForSelectedDate(selectedDate);
      setSelectedWorkout(workouts); // Set workouts for the default date
    };

    fetchInitialWorkout();
  }, [selectedDate, user]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="calendar-container">
        {/* Calendar Wrapper */}
        <div className="calendar-wrapper">
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            renderDay={(day, _value, DayComponent) => {
              const workoutOnThisDay = hasWorkoutOnDate(day);
              return (
                <div style={{ position: "relative" }}>
                  {/* Custom rendering for days with workouts */}
                  <DayComponent />
                  {workoutOnThisDay && (
                    <div
                      style={{position: "absolute", bottom: 2, right: 2, width: 6, height: 6, borderRadius: "50%",backgroundColor: "pink",}}
                    />
                  )}
                </div>
              );
            }}
          />
        </div>

        {/* Workout Details */}
        <div className="workout-wrapper">
          <Typography variant="h6">
            Workout on {selectedDate.format("MMMM DD, YYYY")}
          </Typography>
          {selectedWorkout === null || selectedWorkout.length === 0 ? (
            // No workouts found for this day
            <Typography>No workouts done today!</Typography>
          ) : selectedWorkout.length > 0 ? (
            // Map through the workouts if any
            selectedWorkout.map((workout, index) => (
              <div key={index} style={{ marginTop: "15px" }}>
                <div className="workout-title">{workout.tag}</div>
                <div className="workout-description">{workout.exercise + " for " + workout.sets + " sets of " + workout.reps + " reps" }</div>
              </div>
            ))
          ) : (
            // Fallback to loading state
            <Typography>Loading...</Typography>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default FitnessCalendar;
