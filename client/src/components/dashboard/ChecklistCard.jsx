import React, { useState, useEffect } from "react";
import { 
  Card, 
  Typography, 
  FormGroup, 
  FormControlLabel, 
  Checkbox,
  IconButton, 
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSelector } from "react-redux";

const ChecklistCard = () => {
  const user = useSelector((state) => state.user);
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    goal: "",
    userId: "",
  });
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        if (user.email){
        const response = await axios.get(`
          http://localhost:8088/api/goals/getGoal/${user.email}`
        );
        console.log(response.data);
        setGoals(response.data);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    if (user.email) {
      fetchGoals();
    }
  }, [user.email]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleAddGoal = async () => {
    try {
      const object = {
        goal: newGoal.goal,
        userId: user.email,
      };
      const response = await axios.post("http://localhost:8088/api/goals/addGoal", 
      { data: object }
      );
      const updatedGoal = response.data;
      setGoals([...goals, updatedGoal]);
      setNewGoal({ goal: ""}); //comment this out?
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleUpdateGoal = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8088/api/goals/editGoal/${editingGoal._id}`,
        { data: newGoal }
      );
      const updatedGoal = response.data;
      setGoals(goals.map((goal) => (goal._id === updatedGoal._id ? updatedGoal : goal)));
      setEditingGoal(null);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:8088/api/goals/deleteGoal/${id}`);
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setNewGoal({ goal: goal.goal}); //add userId?
  };
  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Workout Goals
      </Typography>

      <FormGroup sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {goals.map((goal) => (
          <FormControlLabel
            key={goal._id}
            control={
              <Checkbox
                sx={{ color: "primary.main" }}
                onClick={() => handleDeleteGoal(goal._id)}
              />
            }
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                {goal.goal}
                <IconButton size="small" onClick={() => handleEditGoal(goal)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDeleteGoal(goal._id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            }
          />
        ))}
      </FormGroup>

      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <TextField
          label={editingGoal ? "Edit Goal" : "New Goal"}
          value={newGoal.goal}
          name="goal"
          onChange={handleChange}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={editingGoal ? handleUpdateGoal : handleAddGoal}
          sx={{ marginLeft: "10px" }}
          disabled={!newGoal.goal.trim()}
        >
          {editingGoal ? "Update" : "Add"}
        </Button>
      </div>
    </Card>
  );
};
export default ChecklistCard;
