import React from 'react';

const WorkoutCard = () => {
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    }}>
      <h3 style={{ marginBottom: '10px' }}>Workout Plan</h3>
      <p style={{ color: '#666' }}>Details of your workout plan go here.</p>
    </div>
  );
};

export default WorkoutCard;
