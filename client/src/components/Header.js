import React from 'react';
import { Typography } from '@mui/material';
import './Header.css';

const Header = () => {
  return (
    <Typography 
      variant="h3"
      align="center"
      className="title"
      sx={{
        fontWeight: 'bold',
        letterSpacing: '5px',
        color: 'Black',
        textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff0, 0 0 40px #ff0, 0 0 50px #ff0',
      }}
    >
      MyFitness
    </Typography>
  );
};

export default Header;
