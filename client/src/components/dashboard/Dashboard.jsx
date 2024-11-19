import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid2 as Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const workoutData = [
  { date: "2023-01-01", workout: "Cardio", duration: 30 },
  { date: "2023-01-02", workout: "Strength", duration: 45 },
  // ...more data...
];

const graphData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  // ...more data...
];

const Dashboard = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Workout Plans */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom> Hello,  </Typography>
            <Typography variant="h6" gutterBottom>
              Workout Plans
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Plan A: Cardio and Strength" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Plan B: Yoga and Flexibility" />
              </ListItem>
              {/* ...more plans... */}
            </List>
          </Paper>
        </Grid>

        {/* Graph */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              Workout Progress
            </Typography>
            <LineChart
              width={600}
              height={300}
              data={graphData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>

        {/* Log of Previous Workouts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              Previous Workouts
            </Typography>
            <List>
              {workoutData.map((workout, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${workout.date} - ${workout.workout}`}
                    secondary={`Duration: ${workout.duration} minutes`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
