import React, { useState, useEffect } from "react";
import ExerciseLog from "./WorkoutComponent";
import { useSelector } from "react-redux";
import styles from "./DynamicLoggerStyles.module.css";
import axios from "axios";

const DynamicLogger = () => {
  const user = useSelector((state) => state.user);
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({
    tag: "",
    exercise: "",
    weight: 0,
    reps: 0,
    sets: 0,
    color: "",
    userId: "",
    date: "",
  });

  const [editLog, setEditLog] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/exercise/getExercise/${user.email}`
        );
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching exercise logs:", error);
      }
    };
    if (user.email) {
      fetchLogs();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLog({ ...newLog, [name]: value });
  };

  const handleAddLog = async () => {
    try {
      const object = {
        tag: newLog.tag,
        exercise: newLog.exercise,
        weight: newLog.weight,
        reps: newLog.reps,
        sets: newLog.sets,
        color: newLog.color,
        userId: user.email,
        date: newLog.date,
      };
  
      const response = await axios.post(
        "http://localhost:8088/exercise/addExercise",
        { data: object }
      );
  
      const updatedLog = response.data;
      setLogs([...logs, updatedLog]);
    } catch (error) {
      console.error("Error adding exercise", error);
    }
  };
  
  const handleUpdateLog = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8088/exercise/editExercise/${editLog._id}`,
        { data: newLog }
      );
      const updatedLog = response.data;
  
      setLogs(logs.map((log) => (log._id === updatedLog._id ? updatedLog : log)));
      setEditLog(null);
    } catch (error) {
      console.error("Error updating log:", error);
    }
  };
  
  

  const handleDeleteLog = async (id) => {
    try {
      await axios.delete(`http://localhost:8088/exercise/deleteExercise/${id}`);
      setLogs(logs.filter((log) => log._id !== id));
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  const handleEditLog = (log) => {
    setEditLog(log);
    setNewLog({
      tag: log.tag,
      exercise: log.exercise,
      weight: log.weight,
      reps: log.reps,
      sets: log.sets,
      color: log.color,
      date: new Date(log.date).toLocaleDateString(),
    });
  };

  return (
    <div>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          name="tag"
          value={newLog.tag}
          onChange={handleChange}
          placeholder="Tag (e.g., Push Day)"
        />
        <input
          className={styles.input}
          type="text"
          name="exercise"
          value={newLog.exercise}
          onChange={handleChange}
          placeholder="Exercise Name"
        />
        <input
          className={styles.input}
          type="number"
          name="weight"
          value={newLog.weight}
          onChange={handleChange}
          placeholder="Weight"
        />
        <input
         className={styles.input}
          type="number"
          name="reps"
          value={newLog.reps}
          onChange={handleChange}
          placeholder="Reps"
        />
        <input
        className={styles.input}
          type="number"
          name="sets"
          value={newLog.sets}
          onChange={handleChange}
          placeholder="Sets"
        />
        <input
          className={styles.input}
          type="text"
          name="color"
          value={newLog.color}
          onChange={handleChange}
          placeholder="Color"
        />
        <input
          className={styles.input}
          type="date"
          name="date"
          value={newLog.date}
          onChange={handleChange}
          placeholder="Date"
        />
        {editLog ? (
          <button onClick={handleUpdateLog}>Update Log</button>
        ) : (
          <button onClick={handleAddLog} className={styles.addLogButton}>Add Log</button>
        )}
      </div>

      <div className={styles.logContainer}>
        {logs.map((log) => (
          <ExerciseLog
            key={log._id}
            log={log}
            onDelete={handleDeleteLog}
            onEdit={handleEditLog}
          />
        ))}
      </div>
    </div>
  );
};

export default DynamicLogger;
