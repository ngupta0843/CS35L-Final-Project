import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Still using react-calendar for the calendar
// import 'react-calendar/dist/Calendar.css';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Card,
    CardContent,
    Grid,
} from '@mui/material';

const WorkoutLog = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [workouts, setWorkouts] = useState([]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setShowModal(true);
    };

    const handleAddWorkout = (event) => {
        event.preventDefault();
        const workoutName = event.target.workoutName.value;
        const duration = event.target.duration.value;

        if (workoutName && duration) {
            setWorkouts([...workouts, { date: selectedDate, workoutName, duration }]);
            setShowModal(false);
        }
    };

    return (
        <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Workout Log
            </Typography>

            {/* Calendar Component */}
            <Box sx={{ marginBottom: '20px' }}>
                <Calendar onClickDay={handleDateClick} value={selectedDate} />
            </Box>

            {/* Modal for Adding Workouts */}
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>Log Workout for {selectedDate.toDateString()}</DialogTitle>
                <form onSubmit={handleAddWorkout}>
                    <DialogContent>
                        <TextField
                            label="Workout Name"
                            name="workoutName"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Duration (minutes)"
                            name="duration"
                            type="number"
                            fullWidth
                            margin="normal"
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowModal(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Add Workout
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Display Logged Workouts */}
            <Box sx={{ marginTop: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Logged Workouts
                </Typography>
                <Grid container spacing={2}>
                    {workouts.map((workout, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle1">
                                        Date: {workout.date.toDateString()}
                                    </Typography>
                                    <Typography variant="body1">Workout: {workout.workoutName}</Typography>
                                    <Typography variant="body2">
                                        Duration: {workout.duration} minutes
                                    </Typography>
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
