import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Pie } from "react-chartjs-2";

const PieChartCard = ({ title, data }) => {
  const options = {
    plugins: {
      legend: {
        position: "right", 
        labels: {
          color: "#FFFFFF", 
          font: {
            size: 20,
          },
          padding: 20,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 30,
      },
    },
    maintainAspectRatio: false, 
  };

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 4,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        padding: "10px",
        width: "100%", // Full width
        height: "450px", // Fixed height
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "350px", // Constrain the height
          }}
        >
          {data.labels.length > 0 ? (
            <Pie data={data} options={options} />
          ) : (
            <Typography color="text.secondary" align="center">
              No workouts logged in the past week.
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PieChartCard;
