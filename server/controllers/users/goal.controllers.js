const Goal = require("../../models/goalModel.js");

//create a goal
const addGoal = async (req, res) => {
    try{
        const {userId, goal} = req.body.data;
        if (!userId || !goal) {
            return res.status(400).json({ message: "User email and goal are required." });
        }
        const existingGoals = await Goal.find({ userId });
        if (existingGoals.length >=3) {
            return res.status(400).json({ message: "You can only have up to 3 goals"});
        }

        const newGoal = new Goal({
            userId: userId, 
            goal: goal,
        });
        await newGoal.save()

        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({ message: 'Error creating goal', error });
    }
};

const getGoals = async (req, res) => {
    try {
        const { userId } = req.params;
        const goals = await Goal.find({ userId });
        res.json(goals);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching goals', error });
      }
};
const deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGoal = await Goal.findByIdAndDelete(id);
    
        if (!deletedGoal) {
          return res.status(404).json({ message: 'Goal not found' });
        }
    
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting goal', error });
      }
};
const editGoal = async (req, res) => {
    const {goal} = req.body.data; //remove .data if does not work?
    const {id} = req.params;
    try {
        const updatedGoal = await Goal.findByIdAndUpdate(
          id,
          { goal },
          { new: true }
        );
        if (!updatedGoal) {
          return res.status(404).json({ message: 'Goal not found' });
        }
        res.json(updatedGoal);
      } catch (error) {
        res.status(500).json({ message: 'Error updating goal', error });
      }
};

module.exports = {
    addGoal,
    editGoal,
    getGoals,
    deleteGoal,
};