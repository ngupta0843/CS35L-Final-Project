import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Button, Typography, Grid } from "@mui/material";
import WorkoutModal from "./WorkoutModal";
import WorkoutCard from "./WorkoutCont";

const WorkoutLog = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [workoutDetails, setWorkoutDetails] = useState({
        category: "",
        name: "",
        sets: "",
        reps: "",
        weight: "",
    });
    const [workouts, setWorkouts] = useState({}); // Store workouts by date

    const workoutCategories = [
        "Biceps",
        "Triceps",
        "Shoulders",
        "Legs",
        "Chest",
        "Back",
        "Abs",
        "Cardio",
    ];

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleAddWorkout = () => {
        const dateKey = selectedDate.toDateString();
        const newWorkout = { ...workoutDetails };

        setWorkouts((prevWorkouts) => ({
            ...prevWorkouts,
            [dateKey]: [...(prevWorkouts[dateKey] || []), newWorkout],
        }));

        setShowModal(false);
        setWorkoutDetails({ category: "", name: "", sets: "", reps: "", weight: "" });
    };

    const handleDeleteWorkout = (index) => {
        const dateKey = selectedDate.toDateString();
        setWorkouts((prevWorkouts) => ({
            ...prevWorkouts,
            [dateKey]: prevWorkouts[dateKey].filter((_, i) => i !== index),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkoutDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const selectedDayWorkouts = workouts[selectedDate.toDateString()] || [];

    return (
        <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <Typography variant="h4" gutterBottom>
                Workout Log
            </Typography>

            {/* Calendar */}
            <Box sx={{ marginBottom: "20px" }}>
                <Calendar onClickDay={handleDateClick} value={selectedDate} />
            </Box>

            {/* Selected Date Workouts */}
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
                <Typography variant="h5">
                    Workouts for {selectedDate.toDateString()}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>
                    Add Workout
                </Button>
            </Box>

            {/* Display Workouts */}
            <Box>
                {selectedDayWorkouts.length === 0 ? (
                    <Typography>No workouts logged for this day.</Typography>
                ) : (
                    <Grid container spacing={2}>
                        {selectedDayWorkouts.map((workout, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <WorkoutCard
                                    workout={workout}
                                    onDelete={() => handleDeleteWorkout(index)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* Add Workout Modal */}
            <WorkoutModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleAddWorkout}
                workoutDetails={workoutDetails}
                handleChange={handleChange}
                workoutCategories={workoutCategories}
            />
        </Box>
    );
};

export default WorkoutLog;
