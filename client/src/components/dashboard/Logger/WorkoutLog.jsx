import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import { Box, Button, Typography, Grid } from "@mui/material";
import WorkoutModal from "./WorkoutModal";
import WorkoutCont from "./WorkoutCont";
import { useSelector } from "react-redux";

const WorkoutLog = () => {
    const user = useSelector((state) => state.user); // Fetch user details from Redux
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
    const [workouts, setWorkouts] = useState([]); // Store workouts for the selected date
    const baseURL = "http://localhost:8088/api"; // Backend URL

    // Fetch workouts for the selected date
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const dateKey = selectedDate.toISOString().split("T")[0];
                const response = await axios.get(`${baseURL}/workouts/${user.email}/${dateKey}`);
                setWorkouts(response.data.workouts || []);
            } catch (error) {
                console.error("Error fetching workouts:", error);
                setWorkouts([]); // Reset if no workouts found
            }
        };

        if (user.email) fetchWorkouts();
    }, [selectedDate, user.email]);

    // Add a new workout
    const handleAddWorkout = async () => {
        try {
            const dateKey = selectedDate.toISOString().split("T")[0];
            const response = await axios.post(`${baseURL}/workouts/add`, {
                userId: user.email, // Use email instead of user ID
                date: dateKey,
                workout: workoutDetails,
            });
            setWorkouts(response.data.workoutLog.workouts); // Update the workouts list
            setShowModal(false);
            setWorkoutDetails({ category: "", name: "", sets: "", reps: "", weight: "", duration: "" });
        } catch (error) {
            console.error("Error adding workout:", error);
        }
    };

    // Delete a workout
    const handleDeleteWorkout = async (workoutId) => {
        try {
            await axios.delete(`${baseURL}/workouts/${workoutId}`);
            setWorkouts((prevWorkouts) =>
                prevWorkouts.filter((workout) => workout._id !== workoutId)
            );
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkoutDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", gap: "20px", padding: "20px" }}>
            {/* Calendar Section */}
            <Box sx={{ flex: "1", maxWidth: "300px" }}>
                <Typography variant="h5" gutterBottom>
                    Select Date
                </Typography>
                <Calendar onClickDay={setSelectedDate} value={selectedDate} />
            </Box>

            {/* Workouts Section */}
            <Box sx={{ flex: "3" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
                    <Typography variant="h5">Today's Workouts</Typography>
                    <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>
                        Add Workout
                    </Button>
                </Box>

                {/* Display Workouts */}
                <Grid container spacing={2}>
                    {workouts.length === 0 ? (
                        <Typography>No workouts logged for this day.</Typography>
                    ) : (
                        workouts.map((workout) => (
                            <Grid item xs={12} sm={6} md={4} key={workout._id}>
                                <WorkoutCont
                                    workout={workout}
                                    onDelete={() => handleDeleteWorkout(workout._id)}
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
                workoutCategories={[
                    "Biceps",
                    "Triceps",
                    "Shoulders",
                    "Legs",
                    "Chest",
                    "Back",
                    "Abs",
                    "Cardio",
                ]}
            />
        </Box>
    );
};

export default WorkoutLog;
