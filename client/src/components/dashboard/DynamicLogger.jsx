import React, { useState, useEffect } from "react";
import ExerciseLog from "./WorkoutComponent";
import { useSelector } from "react-redux";
import axios from "axios";

const DynamicLogger = () => {
  const user = useSelector((state) => state.user);
  const [logs, setLogs] = useState(["j","k"]);
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
      const response = await fetch(`/api/getExercise?userId=${user.email}`);
      const data = await response.json();
      setLogs(data);
    };
    fetchLogs();
  }, [user.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLog({ ...newLog, [name]: value });
  };

  const handleAddLog = async () => {
    try {
      let object = {
        tag: newLog.tag,
        exercise: newLog.exercise,
        weight: newLog.weight,
        reps: newLog.reps,
        sets: newLog.sets,
        color: newLog.color,
        userId: user.email,
        date: new Date(newLog.date).toLocaleDateString(),
      }
      const logWithEmail = { ...newLog, userId: user.email };
      console.log(user.email);
      const response = await axios.post(
        "http://localhost:8088/api/addExercise", {data: object}
        );

        console.log(response.data)
        const updatedLog = response.data;

      setLogs([...logs, updatedLog]);
      console.log(logs);
    } catch (error) {
      console.error("Error adding exercise", error);
    }
  };

  const handleDeleteLog = async (id) => {
    await axios.delete(`http://localhost:8088/api/exercise-log/${id}`);
    setLogs(logs.filter((log) => log._id !== id));
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

  const handleUpdateLog = async () => {
    const logWithEmail = { ...newLog, userId: user.email };
    const response = await axios.put(
      `http://localhost:8088/api/exercise-log/${editLog._id}`,
      logWithEmail
    );
    const updatedLog = response.data;

    setLogs(logs.map((log) => (log._id === updatedLog._id ? updatedLog : log)));
    setEditLog(null);
    setNewLog({
      tag: "",
      exerciseName: "",
      weight: 0,
      reps: 0,
      sets: 0,
      color: "",
      date: "",
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="tag"
          value={newLog.tag}
          onChange={handleChange}
          placeholder="Tag (e.g., Push Day)"
        />
        <input
          type="text"
          name="exercise"
          value={newLog.exercise}
          onChange={handleChange}
          placeholder="Exercise Name"
        />
        <input
          type="number"
          name="weight"
          value={newLog.weight}
          onChange={handleChange}
          placeholder="Weight"
        />
        <input
          type="number"
          name="reps"
          value={newLog.reps}
          onChange={handleChange}
          placeholder="Reps"
        />
        <input
          type="number"
          name="sets"
          value={newLog.sets}
          onChange={handleChange}
          placeholder="Sets"
        />
        <input
          type="text"
          name="color"
          value={newLog.color}
          onChange={handleChange}
          placeholder="Color"
        />
        <input
          type="date"
          name="date"
          value={newLog.date}
          onChange={handleChange}
          placeholder="Date"
        />
        {editLog ? (
          <button onClick={handleUpdateLog}>Update Log</button>
        ) : (
          <button onClick={handleAddLog}>Add Log</button>
        )}
      </div>

      <div>
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
