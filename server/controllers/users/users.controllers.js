const Users = require("../../models/userModel.js");
const bcrypt = require("bcryptjs");

// Sign in route
const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    res
      .status(200)
      .json({
        result: {
          name: existingUser.name,
          email: existingUser.email,
          id: existingUser.id,
          bio: existingUser.bio,
          profile_photo: existingUser.profile_photo,
          followers: existingUser.followers,
          following: existingUser.following,
          posts: existingUser.posts,
          saved_workouts: existingUser.saved_workouts,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Sign up route
const signup = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    const newUser = new Users({
      email,
      password: hashedPassword,
      name: `${firstname} ${lastname}`,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Test route (for debugging purposes)
const test = async (req, res) => {
  console.log("req body", req.body);
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
};

module.exports = { signin, signup, test, testGet };
