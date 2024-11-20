import React, { useState } from 'react';
import axios from 'axios';
import { set } from 'mongoose';

const QA = () => {
  const [data_text, set_data] = useState('');
  const [type_text, set_type] = useState("d");
  const [result, setResult] = useState('?');
  
  const handleToggleChange = () => {
    set_type(type_text => (type_text === "w" ? "d" : "w"));
  };

  const calculate = async () => {
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
  /*
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setResult(data.result);
      })
      .catch(error => {
        console.error('Error:', error);
        setResult('Error');
      });
    */
  };

  return (
    <Container
      disableGutters
      maxWidth={"xl"}
      sx={{
        backgroundColor: "#11172a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ color: "#929eb2", fontWeight: "bold" }}
      >
        Generate Fitness Plan
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: "#21293b",
          borderRadius: 4,
          width: "70%",
        }}
      >
        <Icon
          component={FitnessCenterIcon}
          sx={{ color: "#929eb2", scale: 2, mb: 3 }}
        />
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          sx={{ color: "#929eb2" }}
        >
          Enter Fitness Goals or Themes:
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="E.g., Build muscle, weight loss"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#11172a",
              "&:hover fieldset": {
                borderColor: "#696bee",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#696bee",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            },
            marginBottom: 2,
          }}
          value={data_text}
          onChange={(e) => set_data(e.target.value)}
        />

        <FormControlLabel
          control={
            <Switch
              sx={{}}
              checked={type_text === "d"}
              onChange={handleToggleChange}
              color="primary"
            />
          }
          label={type_text === "d" ? "Diet" : "Workout"}
          sx={{ color: "white", marginBottom: 2 }}
        />
        <br />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={calculate}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#696bee",
              "&:hover": {
                backgroundColor: "#6e6ee0",
              },
              color: "white",
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Generate Plan
          </Button>
        </Box>

        <Box
          sx={{
            marginTop: 2,
            padding: 2,
            backgroundColor: "#11172a",
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#929eb2" }}
          >
            Plan:
          </Typography>
          <Typography variant="body1" sx={{ color: "#929eb2" }}>
            {result}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default QA;
