const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");

dotenv.config();

const corsOptions = {
  origin: "*",
  credentials: true,
}
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use("/users", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/api", (req, res) => {
//   res.status(200).json({ message: "hello from /api" });
// });

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port: ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
