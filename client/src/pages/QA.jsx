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
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Generate Fitness Plan</h1>
      <div>
        <label htmlFor="num1">Enter Fitness Goals/Themes:</label>
        <input
          type="text"
          id="data"
          value={data_text}
          onChange={(e) => set_data(e.target.value)}
          placeholder="Enter goals/themes"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="toggleSwitch">Workout or Diet:</label>
        <input
          type="checkbox"
          id="toggleSwitch"
          checked={type_text === "d"}
          onChange={handleToggleChange}
        />
        <span>{type_text}</span>
      </div>

      <div>
        <button onClick={calculate}>Calculate</button>
      </div>

      {/* Display the result */}
      <h2>Plan: <span>{result}</span></h2>
    </div>
  );
};

export default QA;
