import React from "react";
import { useSelector } from "react-redux";

const ExerciseLog = ({ log, onDelete, onEdit }) => {
  const user = useSelector((state) => state);
  const email = user.email;
  const formattedDate = new Date(log.date).toLocaleDateString();

  return (
    <div style={{ backgroundColor: log.color, padding: "10px", margin: "10px" }}>
      <h3>{log.tag}</h3>
      <p>{log.exerciseName}</p>
      <p>Weight: {log.weight} lbs</p>
      <p>Reps: {log.reps}</p>
      <p>Sets: {log.sets}</p>
      <p>Date: {formattedDate}</p>
      <p>User Email: {email}</p> 
      <button onClick={() => onDelete(log._id)}>Delete</button>
      <button onClick={() => onEdit(log)}>Edit</button>
    </div>
  );
};

export default ExerciseLog;