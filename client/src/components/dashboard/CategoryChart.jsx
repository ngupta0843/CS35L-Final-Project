import React from 'react';

const CategoryChart = ({ data }) => {
  return (
    <div style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      flex: '2',
    }}>
      <h3 style={{ marginBottom: '10px' }}>Category Chart</h3>
      <p style={{ color: '#666' }}>This chart will display categories based on sample data.</p>
    </div>
  );
};

export default CategoryChart;
