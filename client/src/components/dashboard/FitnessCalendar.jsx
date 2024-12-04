import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
    Card,
    CardContent,
    IconButton,
} from "@mui/material";
import { Delete, FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";

const WorkoutLog = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [workoutDetails, setWorkoutDetails] = useState({
        name: "",
        sets: "",
        reps: "",
        weight: "",
    });
    const [workouts, setWorkouts] = useState({});

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleAddWorkout = () => {
        const formattedDate = selectedDate.toDateString();
        const newWorkout = { ...workoutDetails };

        setWorkouts((prev) => ({
            ...prev,
            [formattedDate]: [...(prev[formattedDate] || []), newWorkout],
        }));

        setShowModal(false);
        setWorkoutDetails({ name: "", sets: "", reps: "", weight: "" });
    };

    const handleDeleteWorkout = (index) => {
        const formattedDate = selectedDate.toDateString();
        setWorkouts((prev) => ({
            ...prev,
            [formattedDate]: prev[formattedDate].filter((_, i) => i !== index),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkoutDetails((prev) => ({ ...prev, [name]: value }));
    };

    const selectedDayWorkouts = workouts[selectedDate.toDateString()] || [];

    return (
        <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <Typography variant="h4" gutterBottom>
                Workout Log
            </Typography>

            {/* Calendar Component */}
            <Box sx={{ marginBottom: "20px" }}>
                <Calendar onClickDay={handleDateClick} value={selectedDate} />
            </Box>

            {/* Selected Date and Add Workout Button */}
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
                <Typography variant="h5">
                    Workouts for {selectedDate.toDateString()}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>
                    Add Workout
                </Button>
            </Box>

            {/* Display Logged Workouts */}
            <Box>
                {selectedDayWorkouts.length === 0 ? (
                    <Typography>No workouts logged for this day.</Typography>
                ) : (
                    <Grid container spacing={2}>
                        {selectedDayWorkouts.map((workout, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6">{workout.name}</Typography>
                                        <Typography variant="body2">
                                            {workout.sets} sets x {workout.reps} reps
                                        </Typography>
                                        {workout.weight && (
                                            <Typography variant="body2" display="flex" alignItems="center">
                                                <FitnessCenterRounded fontSize="small" /> {workout.weight} kg
                                            </Typography>
                                        )}
                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleDeleteWorkout(index)}
                                            sx={{ marginTop: "10px" }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* Modal for Adding Workouts */}
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>Log Workout for {selectedDate.toDateString()}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Exercise Name"
                        name="name"
                        fullWidth
                        margin="normal"
                        value={workoutDetails.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Sets"
                        name="sets"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={workoutDetails.sets}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Reps"
                        name="reps"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={workoutDetails.reps}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Weight (kg, optional)"
                        name="weight"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={workoutDetails.weight}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowModal(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddWorkout} variant="contained" color="primary">
                        Add Workout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default WorkoutLog;
