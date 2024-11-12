import { useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import Hello from './components/Hello'
import UserProfile from './pages/profile'
import prof_pic from "./testimages/nikhil_profile_pic.png";

function App() {
  const [test, setTest] = useState("test");
  const [user, setUser] = useState({});

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

  const handleSignin = async () => {
    const user = {
      email: "johndoe@gmail.com",
      password: "password",
    };

    try {
      const response = await axios.post("http://localhost:8088/users/signin", user);
      console.log(response);
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleSignupfail = async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "password",
    };

    try {
      const response = await axios.post("http://localhost:8088/users/signup", user);
      console.log(response);
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleSignuppass = async () => {
    const user = {
      name: "Akarsh Legala",
      email: "akarsh@gmail.com",
      password: "password",
    };

    try {
      const response = await axios.post("http://localhost:8088/users/signup", user);
      console.log(response);
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleSendUserInfo = async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "password",
    };

    try {
      const response = await axios.post("http://localhost:8088/users/test", user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <UserProfile username="Nikhil" profilepic={prof_pic} />

  );
}

export default App;
