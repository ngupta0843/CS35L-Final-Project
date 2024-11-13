import React from 'react';

const WeeklyStatCard = ({ data }) => {
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      flex: '1',
    }}>
      <h3 style={{ marginBottom: '10px' }}>Weekly Stats</h3>
      <p style={{ color: '#666' }}>Weekly statistics will be shown here using the data provided.</p>
    </div>
  );
};

export default WeeklyStatCard;
