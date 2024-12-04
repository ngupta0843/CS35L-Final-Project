import React from "react";
import { Button, Typography, Paper } from "@mui/material";

const colorMap = {
  red: "#FF5252",
  blue: "#90caf9",
  pink: "#f48fb1",
  green: "#81C784",
  orange: "#FFB74D",
  purple: "#BA68C8",
  cyan: "#00BCD4",
};

const ExerciseLog = ({ log, onDelete, onEdit }) => {
  const normalizedColor = log.color ? log.color.toLowerCase() : "default"; 
  const borderColor = colorMap[normalizedColor] || colorMap.default;

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        // marginBottom: "16px",
        overflow: "hidden",
        backgroundColor: `${borderColor}20`,
        padding: "16px",
        margin: "16px",
        borderLeft: `6px solid ${borderColor}`, 
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h5" sx={{ color: borderColor, fontWeight: "bold" }}>
        {log.exercise}
      </Typography>
      <Typography variant="body1" sx={{ color: borderColor }}>
        {log.tag}
      </Typography>
      <Typography variant="body2" sx={{ color: borderColor }}>
        <strong>Weight:</strong> {log.weight} lbs
      </Typography>
      <Typography variant="body2" sx={{ color: borderColor }}>
        <strong>Reps:</strong> {log.reps}
      </Typography>
      <Typography variant="body2" sx={{ color: borderColor }}>
        <strong>Sets:</strong> {log.sets}
      </Typography>
      <Typography variant="body2" sx={{ color: borderColor }}>
        <strong>Date:</strong> {log.date}
      </Typography>
      <div>
        <Button variant="contained" color="secondary" onClick={() => onDelete(log._id)} style={{ marginRight: "8px" }}>
          Delete
        </Button>
        <Button variant="contained" color="primary" onClick={() => onEdit(log)}>
          Edit
        </Button>
      </div>
    </Paper>
  );
};

export default ExerciseLog;