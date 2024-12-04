import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Button, Typography, Grid } from "@mui/material";
import WorkoutModal from "./WorkoutModal";
import WorkoutCont from "./WorkoutCont"; // Updated to match your filename

const WorkoutLog = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [workoutDetails, setWorkoutDetails] = useState({
        category: "",
        name: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
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
        <Box sx={{ display: "flex", flexDirection: "row", gap: "20px", padding: "20px" }}>
            {/* Calendar Section */}
            <Box sx={{ flex: "1", maxWidth: "300px" }}>
                <Typography variant="h5" gutterBottom>
                    Select Date
                </Typography>
                <Calendar onClickDay={handleDateClick} value={selectedDate} />
            </Box>

            {/* Workouts Section */}
            <Box sx={{ flex: "3" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
                    <Typography variant="h5">
                        Today's Workouts
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>
                        Add Workout
                    </Button>
                </Box>

                {/* Display Workouts */}
                <Grid container spacing={2}>
                    {selectedDayWorkouts.length === 0 ? (
                        <Typography>No workouts logged for this day.</Typography>
                    ) : (
                        selectedDayWorkouts.map((workout, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <WorkoutCont
                                    workout={workout}
                                    onDelete={() => handleDeleteWorkout(index)}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
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
