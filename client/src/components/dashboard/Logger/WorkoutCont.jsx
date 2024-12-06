import React from "react";
import { Card, CardContent, Typography, IconButton, Box, Divider } from "@mui/material";
import { Delete, FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";

const WorkoutCont = ({ workout, onDelete }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "180px", // Make the card slightly shorter
                width: "100%", // Increase the card's length
                backgroundColor: "#1E1E1E",
            }}
        >
            {/* Top Row: Trash Icon and Category Tag */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box
                    sx={{
                        backgroundColor: "#e3f2fd",
                        color: "#1565c0",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        width: "fit-content",
                    }}
                >
                    #{workout.category}
                </Box>
                <IconButton
                    color="error"
                    onClick={onDelete}
                    sx={{
                        padding: "6px",
                        fontSize: "20px",
                        backgroundColor: "#ffebee",
                        "&:hover": {
                            backgroundColor: "#ffcdd2",
                        },
                    }}
                >
                    <Delete />
                </IconButton>
            </Box>

            {/* Main Content */}
            <CardContent sx={{ padding: "8px 0" }}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                        marginBottom: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "#FFFFFF",
                    }}
                >
                    {workout.name}
                </Typography>
                <Divider sx={{ marginBottom: "8px" }} />
                {workout.category === "Cardio" ? (
                    <Typography variant="body2" display="flex" alignItems="center" mt={1} color="#FFFFFF">
                        <TimelapseRounded fontSize="small" sx={{ marginRight: "6px" }} />
                        {workout.duration} minutes
                    </Typography>
                ) : (
                    <>
                        <Typography variant="body2" mt={1} color="#FFFFFF">
                            <strong>Count:</strong> {workout.sets} sets x {workout.reps} reps
                        </Typography>
                        {workout.weight && (
                            <Typography variant="body2" display="flex" alignItems="center" mt={1} color="#FFFFFF">
                                <FitnessCenterRounded fontSize="small" sx={{ marginRight: "6px" }} />
                                {workout.weight} kg
                            </Typography>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default WorkoutCont;
