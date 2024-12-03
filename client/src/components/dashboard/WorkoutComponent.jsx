import React from "react";
const ExerciseLog = ({ log, onDelete, onEdit }) => {

  return (
    <div style={{ backgroundColor: log.color, padding: "10px", margin: "10px" }}>
      <h3>{log.tag}</h3>
      <p>{log.exerciseName}</p>
      <p>Weight: {log.weight} lbs</p>
      <p>Reps: {log.reps}</p>
      <p>Sets: {log.sets}</p>
      <p>Date: {log.date}</p>
      <button onClick={() => onDelete(log._id)}>Delete</button>
      <button onClick={() => onEdit(log)}>Edit</button>
    </div>
  );
};

export default ExerciseLog;