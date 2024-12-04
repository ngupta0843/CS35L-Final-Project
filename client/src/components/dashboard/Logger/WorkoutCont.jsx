import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { Delete, FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";

const WorkoutCont = ({ workout, onDelete }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "16px",
                backgroundColor: "#f9f9f9",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#e3f2fd",
                    color: "#1565c0",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    display: "inline-block",
                    marginBottom: "12px",
                }}
            >
                #{workout.category}
            </Box>
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    {workout.name}
                </Typography>

                {workout.category === "Cardio" ? (
                    <Typography variant="body2" display="flex" alignItems="center" mt={1}>
                        <TimelapseRounded fontSize="small" /> Time Spent: {workout.duration} min
                    </Typography>
                ) : (
                    <>
                        <Typography variant="body2" mt={1}>
                            Count: {workout.sets} sets x {workout.reps} reps
                        </Typography>
                        {workout.weight && (
                            <Typography variant="body2" display="flex" alignItems="center" mt={1}>
                                <FitnessCenterRounded fontSize="small" /> {workout.weight} kg
                            </Typography>
                        )}
                    </>
                )}

                <IconButton
                    color="secondary"
                    onClick={onDelete}
                    sx={{ marginTop: "10px", marginLeft: "-8px" }}
                >
                    <Delete />
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default WorkoutCont;
