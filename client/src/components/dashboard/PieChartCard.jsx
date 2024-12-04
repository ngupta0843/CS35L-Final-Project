import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Pie } from "react-chartjs-2";

const PieChartCard = ({ title, data }) => {
  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        position: "right",
        align: "center",
        labels: {
          color: "white",
          padding: 20,
        },
      },
      datalabels: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 4,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", 
            width: "100%",
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
