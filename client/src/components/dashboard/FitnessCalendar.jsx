import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import "./FitnessCalendar.css";

const FitnessCalendar = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedWorkout, setSelectedWorkout] = useState([]);

  const hasWorkoutOnDate = async (date) => {
    console.log("Fetching workout data for", date.format('YYYY-MM-DD'));
    try {
      const response = await axios.get(`http://localhost:8088/exercise/getExercise/${user.email}`);
      const workout = response.data.some(workout => dayjs(workout.date).isSame(date, 'day'));
      console.log(workout);
      return workout;
    } catch (error) {
      console.error("Error fetching workout data", error);
      return null;
    }
  };

  const getWorkoutForSelectedDate = async (date) => {
    console.log("Fetching workout data for", date.format('YYYY-MM-DD'));
    try {
      const response = await axios.get(`http://localhost:8088/exercise/getExercise/${user.email}`);
      const workouts = response.data.filter(workout => dayjs(workout.date).isSame(date, 'day'));
      return workouts || [];
    } catch (error) {
      console.error("Error fetching workout data", error);
      return [];
    }
  };

  const handleDateChange = async (newDate) => {
    setSelectedDate(newDate);
    const workouts = await getWorkoutForSelectedDate(newDate);
    setSelectedWorkout(workouts);
  };

  useEffect(() => {
    const fetchInitialWorkout = async () => {
      const workouts = await getWorkoutForSelectedDate(selectedDate);
      setSelectedWorkout(workouts);
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
