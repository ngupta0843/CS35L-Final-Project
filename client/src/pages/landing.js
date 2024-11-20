import React from 'react';
import Header from '../components/Header';
import Dumbbell from '../components/Logo';
import AuthButtons from '../components/AuthButtons';
import { Box } from '@mui/material';
import './landing.css';

const LandingPage = () => {
  return (
    <Box
      className="landing-page"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: 'white',
        position: 'relative',
      }}
    >
      <Header />
      <Dumbbell />
      <AuthButtons />
    </Box>
  );
};

export default LandingPage;
