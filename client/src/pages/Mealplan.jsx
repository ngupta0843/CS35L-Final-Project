import React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Grid,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';

// Dark theme setup
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

const mealPlanData = [
  {
    day: 'Monday',
    meals: [
      { type: 'Breakfast', name: 'Oatmeal with Banana', calories: 300, protein: 8, carbs: 50, fats: 5 },
      { type: 'Lunch', name: 'Grilled Chicken Salad', calories: 400, protein: 30, carbs: 20, fats: 15 },
      { type: 'Dinner', name: 'Baked Salmon with Veggies', calories: 500, protein: 35, carbs: 25, fats: 20 },
      { type: 'Snack', name: 'Greek Yogurt with Berries', calories: 200, protein: 10, carbs: 25, fats: 5 },
    ],
  },
  {
    day: 'Tuesday',
    meals: [
      { type: 'Breakfast', name: 'Scrambled Eggs and Toast', calories: 350, protein: 15, carbs: 30, fats: 10 },
      { type: 'Lunch', name: 'Turkey Sandwich', calories: 400, protein: 25, carbs: 40, fats: 10 },
      { type: 'Dinner', name: 'Chicken Stir-Fry with Rice', calories: 550, protein: 40, carbs: 50, fats: 10 },
      { type: 'Snack', name: 'Trail Mix', calories: 250, protein: 8, carbs: 20, fats: 15 },
    ],
  },
  {
    day: 'Wednesday',
    meals: [
      { type: 'Breakfast', name: 'Avocado Toast', calories: 320, protein: 10, carbs: 35, fats: 12 },
      { type: 'Lunch', name: 'Grilled Veggie Wrap', calories: 380, protein: 15, carbs: 40, fats: 10 },
      { type: 'Dinner', name: 'Steak with Sweet Potatoes', calories: 600, protein: 45, carbs: 30, fats: 25 },
      { type: 'Snack', name: 'Protein Bar', calories: 220, protein: 15, carbs: 20, fats: 7 },
    ],
  },
  {
    day: 'Thursday',
    meals: [
      { type: 'Breakfast', name: 'Smoothie Bowl', calories: 300, protein: 10, carbs: 45, fats: 5 },
      { type: 'Lunch', name: 'Quinoa Salad', calories: 400, protein: 20, carbs: 35, fats: 10 },
      { type: 'Dinner', name: 'Pasta with Marinara Sauce', calories: 500, protein: 25, carbs: 60, fats: 10 },
      { type: 'Snack', name: 'Apple with Peanut Butter', calories: 250, protein: 7, carbs: 30, fats: 12 },
    ],
  },
  {
    day: 'Friday',
    meals: [
      { type: 'Breakfast', name: 'Pancakes with Maple Syrup', calories: 400, protein: 10, carbs: 70, fats: 5 },
      { type: 'Lunch', name: 'Chicken Caesar Salad', calories: 450, protein: 35, carbs: 15, fats: 20 },
      { type: 'Dinner', name: 'Grilled Shrimp Tacos', calories: 550, protein: 30, carbs: 40, fats: 15 },
      { type: 'Snack', name: 'Dark Chocolate Almonds', calories: 200, protein: 5, carbs: 15, fats: 10 },
    ],
  },
  {
    day: 'Saturday',
    meals: [
      { type: 'Breakfast', name: 'Bagel with Cream Cheese', calories: 350, protein: 12, carbs: 45, fats: 10 },
      { type: 'Lunch', name: 'BBQ Chicken Sandwich', calories: 500, protein: 35, carbs: 50, fats: 15 },
      { type: 'Dinner', name: 'Vegetable Curry with Rice', calories: 550, protein: 20, carbs: 65, fats: 10 },
      { type: 'Snack', name: 'Popcorn', calories: 150, protein: 3, carbs: 18, fats: 5 },
    ],
  },
  {
    day: 'Sunday',
    meals: [
      { type: 'Breakfast', name: 'French Toast with Berries', calories: 400, protein: 12, carbs: 60, fats: 8 },
      { type: 'Lunch', name: 'Grilled Cheese and Tomato Soup', calories: 450, protein: 15, carbs: 45, fats: 20 },
      { type: 'Dinner', name: 'Roast Chicken with Potatoes', calories: 600, protein: 40, carbs: 35, fats: 25 },
      { type: 'Snack', name: 'Banana with Nutella', calories: 250, protein: 4, carbs: 30, fats: 12 },
    ],
  },
];

const MealPlan = () => {
  const handleCustomMealPlan = () => {
    // Redirect or trigger the custom meal plan creation (quiz or form)
    window.location.href = '/custom-meal-plan';
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        sx={{
          paddingTop: '10vh',
          paddingBottom: '5vh',
          backgroundColor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', marginBottom: 4 }}
            onClick={handleCustomMealPlan}
          >
            Make a Custom Meal Plan
          </Button>

          <Typography variant="h4" gutterBottom align="center">
            Weekly Meal Plan
          </Typography>

          <Stack spacing={4} sx={{ marginTop: 4 }}>
            {mealPlanData.map((dayPlan, index) => (
              <Box key={index}>
                <Typography variant="h5" gutterBottom align="center">
                  {dayPlan.day}
                </Typography>
                <Grid container spacing={2}>
                  {dayPlan.meals.map((meal, idx) => (
                    <Grid item xs={12} md={6} lg={3} key={idx}>
                      <Card
                        sx={{
                          backgroundColor: 'background.paper',
                          borderRadius: 2,
                          boxShadow: 3,
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {meal.type}
                          </Typography>
                          <Typography variant="body1">{meal.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Calories: {meal.calories} kcal
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Protein: {meal.protein} g
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Carbs: {meal.carbs} g
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Fats: {meal.fats} g
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default MealPlan;
