import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Delete, FitnessCenterRounded } from "@mui/icons-material";

const WorkoutCard = ({ workout, onDelete }) => {
    return (
        <Card variant="outlined" sx={{ padding: "10px" }}>
            <Typography
                variant="subtitle2"
                sx={{
                    backgroundColor: "#e3f2fd",
                    color: "#1565c0",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    display: "inline-block",
                    marginBottom: "8px",
                }}
            >
                #{workout.category}
            </Typography>
            <CardContent>
                <Typography variant="h6">{workout.name}</Typography>
                <Typography variant="body2">
                    Count: {workout.sets} sets x {workout.reps} reps
                </Typography>
                {workout.weight && (
                    <Typography variant="body2">
                        <FitnessCenterRounded fontSize="small" /> {workout.weight} kg
                    </Typography>
                )}
                <IconButton
                    color="secondary"
                    onClick={onDelete}
                    sx={{ marginTop: "10px" }}
                >
                    <Delete />
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default WorkoutCard;
