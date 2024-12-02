
import React, { useState } from "react";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { CircularProgress } from "@mui/material";

// Styled components
const CalendarContainer = styled.div`
  flex: 1;
  max-width: 800px;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Left = styled.div`
  flex: 0.3;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  margin-right: 20px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
`;

// Local data: Example workouts for a week
const localWorkouts = [
  { date: "2024-12-01", workout: "Yoga Session" },
  { date: "2024-12-03", workout: "Strength Training" },
  { date: "2024-12-05", workout: "Cardio: Running" },
  { date: "2024-12-07", workout: "HIIT Training" },
  { date: "2024-12-09", workout: "Rest Day" },
];

const FitnessCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [workoutsForSelectedDate, setWorkoutsForSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const workout = localWorkouts.find(workout => workout.date === date.format("YYYY-MM-DD"));
    setWorkoutsForSelectedDate(workout ? workout.workout : "No workout planned");
  };

  return (
    <CalendarContainer>
      <Left>
        <Title>Workout Calendar</Title>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar onChange={handleDateChange} />
        </LocalizationProvider>
        <div>
          {selectedDate ? (
            <div>
              <h3>Workout for {selectedDate.format("MMMM D, YYYY")}</h3>
              <p>{workoutsForSelectedDate}</p>
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>
      </Left>
    </CalendarContainer>
  );
};

export default FitnessCalendar;
