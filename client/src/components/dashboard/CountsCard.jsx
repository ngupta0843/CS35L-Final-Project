import React from 'react';

const CountsCard = ({ name, icon, desc, value, color, lightColor }) => {
  return (
    <div style={{
      backgroundColor: lightColor,
      borderLeft: `5px solid ${color}`,
      padding: '15px',
      borderRadius: '8px',
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        {icon}
        <h3 style={{ color, marginLeft: '10px', fontSize: '1.2em' }}>{name}</h3>
      </div>
      <p style={{ fontSize: '0.9em', color: '#666' }}>{desc}</p>
      <h4 style={{ fontSize: '1.5em', color }}>{value}</h4>
    </div>
  );
};

export default CountsCard;
