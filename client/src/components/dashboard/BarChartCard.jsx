import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";

const BarChartCard = ({ title, data, options }) => {
  const updatedOptions = {
    ...options,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        reverse: true, 
      },
      ...options.scales, 
    },
  };

  return (
    <Card
  sx={{
    backgroundColor: "background.paper",
    borderRadius: 4,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    width: "100%", // Same width as PieChartCard
    height: "450px", // Same height as PieChartCard
  }}
>

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ height: "350px" }}>
          <Bar data={data} options={updatedOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BarChartCard;
