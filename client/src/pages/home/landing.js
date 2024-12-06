import React, { useState, useEffect } from 'react';
import AuthButtons from '../../components/navigation/AuthButtons';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Icon } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import './landing.css';

// Mock of the testimonials (simulating reading from testimonials.txt)
const testimonials = [
  "\"I've gone from 'sitting is life' to 'squatting is life' thanks to this app!\" - Raghu Padmanabuni, UCLA Computational Biologist & Fitness Tech Specialist",
  "\"I tried using this app to calculate my workout efficiency, but it just told me to stop skipping leg day.\" - Nikhil Gupta, CEO of Fitness is my Passion",
  "\"I lost 15 pounds using this app... and gained 25 pounds of knowledge on how to eat more protein.\" - Sachit Murthy, Specialist in Child Obesity at UCLA",
  "\"I tried to skip leg day, but the app sent me motivational notifications until I gave in.\" - Arsh Koneru, Fitness Motivational Speaker",
  "\"I used to just teach about computational fitness. Now I LIVE computational fitness.\" - Min Gao, Professor in Computational Fitness Studies at UCLA",
  "\"I'm still trying to figure out how to lift my GPA, but at least this app is lifting my deadlifts.\" - Aditya Murthy, UCLA AI for Weight Loss Technologies Researcher",
  "\"I've engineered my body to be 30% muscle, 70% protein shakes.\" - Glenn Reinman, Computer Engineering (and Engineering Muscles)",
  "\"I tried Shark Tank, but this app helped me create a six-pack instead of a pitch deck.\" - Carey Nachenburg, Shark Tank Entrepreneur and Founder of Passion Fitness Gym",
  "\"Before this app, I was bench pressing my lunch instead of actual weights. Now I bench 100 pounds.\" - Raghu Padmanabuni, UCLA Computational Biologist & Fitness Tech Specialist",
  "\"I used to believe in magic tricks, but now I believe in fitness algorithms.\" - Nikhil Gupta, CEO of Fitness is my Passion",
  "\"I used to think protein was just for shakes. Now I know it's for every meal.\" - Aditya Murthy, UCLA AI for Weight Loss Technologies Researcher",
  "\"Before this app, my workout routine was 'wait until I feel like it.' Now it's a scientific schedule I actually stick to.\" - Caroline Wei, UCLA Exercise Science & Computer Science Student Entrepreneur",
  "\"I thought skipping leg day was a joke. Turns out, the joke was on me. Thanks to this app, I never skip again.\" - Akarsh Legala, Gym Bro",
  "\"This app doesn't just motivate me, it transforms me into a motivational speaker myself!\" - Arsh Koneru, Fitness Motivational Speaker",
  "\"I used to train my clients in the gym; now I train my app to track every single rep and set. It's my new workout partner!\" - Kashyap Kanumuri, LA Fitness Personal Trainer",
  "\"I went from thinking 'fitness' was just a buzzword to making it my full-time obsession. This app is the reason.\" - Paul Eggert, Professor in Computer Science and Engineering at UCLA",
  "\"This app helped me optimize my workouts. Now my biceps have better algorithms than my code.\" - Caroline Wei, UCLA Exercise Science & Computer Science Student Entrepreneur",
  "\"My gym bro status was in danger, but this app turned me into a full-fledged leg day warrior.\" - Akarsh Legala, Gym Bro",
  "\"This app is like a motivational speaker in my pocket—except it doesn't ask me to 'dig deeper' every five minutes.\" - Arsh Koneru, Fitness Motivational Speaker",
  "\"I've trained my body for years. Now this app is training my mind to push further, faster, and with more protein shakes.\" - Kashyap Kanumuri, LA Fitness Personal Trainer"
];

const LandingPage = () => {
  const [index, setIndex] = useState(0);
const [isFading, setIsFading] = useState(false);

// Fade animation for the testimonials
const fadeProps = useSpring({
  opacity: isFading ? 1 : 0,  // Fade in and out based on the isFading state
  from: { opacity: 0 },
  reset: true,
  config: { friction: 50, tension: 50, mass: 1 },
  onRest: () => {
    if (isFading) {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsFading(false);  // Mark fade transition as done
    }
  }
});

// Change the testimonial every 3 seconds, respecting the fade transition
useEffect(() => {
  const interval = setInterval(() => {
    if (!isFading) {
      setIsFading(true);  // Start the fade transition
    }
  }, 1000);

  return () => clearInterval(interval); // Cleanup on component unmount
}, [isFading]); // Only change the testimonial when the fade is complete


  return (
    <Box
      className="landing-page"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'white',
        position: 'relative',
        padding: 3,
        paddingBottom: 10
      }}
    >
      
      {/* Main Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          fontSize: '6rem',
          textAlign: 'center',
          marginBottom: 1.5,
        }}
      >
        Fitness is my Passion
      </Typography>

      {/* Subheading */}
      <Typography
        variant="h4"
        sx={{
          fontSize: '2rem',
          textAlign: 'center',
          marginBottom: 5,
          color: '#aaa',
        }}
      >
        The Premier Social Platform for Gym Enthusiasts
      </Typography>

      <Icon
        component={FitnessCenterIcon}
        sx={{ 
          fontSize: "20rem",
          bottom: 4,
      }}
        className='icon'
      />

      {/* Testimonials */}
      <Box sx={{
        bottom: '100px',
        position: 'absolute',
      }}>
        <animated.div style={fadeProps}>
          <Typography
            variant="h5"
            sx={{
              
              fontSize: '1.25rem',
              textAlign: 'center',
              color: '#aaa',
              
            }}
          >
            {testimonials[index]}
          </Typography>
        </animated.div>
      </Box>

      {/* AuthButtons */}
      <AuthButtons />

      {/* Footer */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          textAlign: 'center',
          fontSize: '1rem',
          color: '#aaa',
        }}
      >
        <Typography variant="body2">
          Developed by: Nikhil Gupta, Aditya Murthy, Caroline Wei, Akarsh Legala, Sachit Murthy, and Kashyap Kanumuri
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
