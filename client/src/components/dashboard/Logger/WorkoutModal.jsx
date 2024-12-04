import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";

const WorkoutModal = ({
    open,
    onClose,
    onSave,
    workoutDetails,
    handleChange,
    workoutCategories,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Workout</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category"
                        value={workoutDetails.category}
                        onChange={handleChange}
                        required
                    >
                        {workoutCategories.map((category, index) => (
                            <MenuItem key={index} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onSave} variant="contained" color="primary">
                    Add Workout
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkoutModal;
