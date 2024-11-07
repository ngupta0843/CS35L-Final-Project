import { useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import Hello from './components/Hello'

function App() {
  const [test, setTest] = useState("test");

  // useEffect(() => {
  //   fetch('http://localhost:5000/api')
  //   .then(data => setTest(data))
  // }, [])

  const handleClick = async () => {
    console.log("clicked");
    try {
      const response = await axios.get("http://localhost:8088/api");
      console.log(response)
      console.log(response.data.message);
      setTest(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {test}
        <button onClick={handleClick}>Click Me</button>
      </header>
    </div>
  );
}

export default App;
