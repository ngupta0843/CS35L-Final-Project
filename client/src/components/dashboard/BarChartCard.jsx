import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";

const BarChartCard = ({ title, data, options }) => (
  <Card
    sx={{
      backgroundColor: "background.paper",
      borderRadius: 4,
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
      padding: "20px",
    }}
  >
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </Box>
    </CardContent>
  </Card>
);

export default BarChartCard;
