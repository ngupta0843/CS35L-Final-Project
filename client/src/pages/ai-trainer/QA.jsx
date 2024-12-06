import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, TextField, Switch, FormControlLabel, Button, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import loadinggif from '../../testimages/loading.gif';

const capitalizeWords = (str) => {
  return str
    .split(/[\s\-\/]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const QA = () => {
  const [data_text, set_data] = useState('');
  const [type_text, set_type] = useState("d");
  const [result, setResult] = useState('?');

  const handleToggleChange = (event, newType) => {
    if (newType) {
      set_type(newType);
    }
  };

  const calculate = async () => {
    console.log(`Data: ${data_text}, Type: ${type_text}`);
    if (!data_text) {
      alert('Please enter valid text!');
      return;
    }
  
    try {
      const url = `/ml`;
      console.log(`Making request to: ${url}`);
      const response = await axios.post("http://localhost:8088" + url, { indata: data_text, type: type_text });
      console.log(response);
      setResult(response.data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#121212",
        width: "100%",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          color: "#ffffff",
          backgroundColor: "#121212",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          AI-Generated Workout
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaaaaa", mb: 3 }}>
          Enter the muscle groups you'd like to target below
        </Typography>
  
        {/* Data Entry */}
        <TextField
          required
          fullWidth
          multiline
          minRows={4}
          label="Enter Workout or Diet Data"
          variant="filled"
          value={data_text}
          onChange={(e) => set_data(e.target.value)}
          sx={{
            mb: 2,
            backgroundColor: "#333333",
            borderRadius: 1,
            "& .MuiFilledInput-root": {
              color: "#ffffff",
              "&:before": { borderBottomColor: "#666666" },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#aaaaaa",
              },
            },
          }}
          InputLabelProps={{
            style: { color: "#aaaaaa" },
          }}
        />
  
        {/* Toggle Button for Workout/Diet */}
        <ToggleButtonGroup
          value={type_text}
          exclusive
          onChange={handleToggleChange}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="d" sx={{ color: "#ffffff", borderColor: "#666666" }}>Workout</ToggleButton>
          <ToggleButton value="w" sx={{ color: "#ffffff", borderColor: "#666666" }}>Diet</ToggleButton>
        </ToggleButtonGroup>
  
        <Button
          fullWidth
          onClick={calculate}
          variant="contained"
          sx={{
            mb: 3,
            backgroundColor: "#ffffff",
            color: "#000000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
        >
          Get Result
        </Button>
      </Box>
  
      {/* Right Section - Results */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          backgroundColor: "#1c1c1c",
        }}
      >
        {result !== '?' ? (
          // Display Result
          <Paper
            sx={{
              p: 3,
              backgroundColor: "#333333",
              color: "#ffffff",
              borderRadius: 2,
              width: "100%",
              maxWidth: "600px",
              boxSizing: "border-box",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "left", fontSize: "2rem" }}>
              Result
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
              {result ? (
                <ul style={{ paddingLeft: "20px", textAlign: "left", fontSize: "1.5rem" }}>
                  {result
                    .replace(/[{}"']/g, "") // Remove unwanted characters
                    .split(',') // Split by commas
                    .map((item, index) => (
                      <li key={index} style={{ marginBottom: "8px" }}>
                        {capitalizeWords(item.trim())} {/* Capitalize each word */}
                      </li>
                    ))}
                </ul>
              ) : (
                <Typography variant="body2" sx={{ color: "#aaaaaa" }}>
                  No results to display.
                </Typography>
              )}
            </Typography>
          </Paper>
        ) : (
          <img src={loadinggif} alt="loading" style={{ width: "200px"}} />
        )}
      </Box>
    </Container>
  );
};

export default QA;
