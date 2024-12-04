import React from "react";
import { Card, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const ChecklistCard = ({ goals }) => (
  <Card
    sx={{
      backgroundColor: "background.paper",
      borderRadius: 4,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      padding: "20px",
    }}
  >
    <Typography variant="h6" gutterBottom>
      Workout Goals
    </Typography>
    <FormGroup>
      {goals.map((goal, index) => (
        <FormControlLabel
          key={index}
          control={<Checkbox sx={{ color: "primary.main" }} />}
          label={goal}
        />
      ))}
    </FormGroup>
  </Card>
);

export default ChecklistCard;
