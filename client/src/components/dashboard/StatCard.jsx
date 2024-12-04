import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value, description, color }) => (
  <Card
    sx={{
      backgroundColor: "background.paper",
      borderRadius: 4,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      padding: "20px",
      height: "200px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <CardContent sx={{ padding: 0 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold" color={color}>
        {value}
      </Typography>
      <Typography variant="body2" color="secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default StatCard;