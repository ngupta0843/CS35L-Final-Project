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
} from "@mui/material";
import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";

const WorkoutLog = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [workoutDetails, setWorkoutDetails] = useState({
        category: "",
        workoutName: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
    });
    const [workouts, setWorkouts] = useState([]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setShowModal(true);
    };

    const handleAddWorkout = () => {
        setWorkouts([...workouts, { ...workoutDetails, date: selectedDate }]);
        setShowModal(false);
        setWorkoutDetails({
            category: "",
            workoutName: "",
            sets: "",
            reps: "",
            weight: "",
            duration: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkoutDetails((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <Typography variant="h4" gutterBottom>
                Workout Log
            </Typography>

            {/* Calendar Component */}
            <Box sx={{ marginBottom: "20px" }}>
                <Calendar onClickDay={handleDateClick} value={selectedDate} />
            </Box>

            {/* Modal for Adding Workouts */}
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>Log Workout for {selectedDate.toDateString()}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Category"
                        name="category"
                        fullWidth
                        margin="normal"
                        value={workoutDetails.category}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Workout Name"
                        name="workoutName"
                        fullWidth
                        margin="normal"
                        value={workoutDetails.workoutName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Sets"
                        name="sets"
                        fullWidth
                        margin="normal"
                        value={workoutDetails.sets}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Reps"
                        name="reps"
                        fullWidth
                        margin="normal"
                        value={workoutDetails.reps}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Weight (kg)"
                        name="weight"
                        fullWidth
                        margin="normal"
                        value={workoutDetails.weight}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Duration (minutes)"
                        name="duration"
                        fullWidth
                        margin="normal"
                        value={workoutDetails.duration}
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

            {/* Display Logged Workouts */}
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant="h5" gutterBottom>
                    Logged Workouts
                </Typography>
                <Grid container spacing={2}>
                    {workouts.map((workout, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle1">#{workout.category}</Typography>
                                    <Typography variant="h6">{workout.workoutName}</Typography>
                                    <Typography variant="body2">
                                        {workout.sets} sets x {workout.reps} reps
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" marginTop="10px">
                                        <Typography variant="body2" display="flex" alignItems="center">
                                            <FitnessCenterRounded fontSize="small" /> {workout.weight} kg
                                        </Typography>
                                        <Typography variant="body2" display="flex" alignItems="center">
                                            <TimelapseRounded fontSize="small" /> {workout.duration} min
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default WorkoutLog;
