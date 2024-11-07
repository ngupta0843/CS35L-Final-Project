const Users = require("../../models/userModel.js");

// Sign in route
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email, password });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    res.status(200).json({ result: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Sign up route
const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new Users({
      email,
      password,
      name: `${firstName} ${lastName}`,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Test route (for debugging purposes)
const test = async (req, res) => {
  console.log( "req body", req.body);
  const { name, email, password } = req.body;
  try {
    console.log(name, email, password);
    const newUser = new Users({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Test user created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const testGet = async (req, res) => {
  console.log("test get", req.body);
  res.status(200).json({ message: "Test GET route" });
}

module.exports = { signin, signup, test, testGet };
