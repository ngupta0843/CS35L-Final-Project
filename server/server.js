const express = require("express");
const app = express();
const cors = require("cors");
const port = 8088;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api",(req, res) => {
    res.status(200).json({message: 'hello from /api'})
})

app.listen(port, () => {  
  console.log(`Server running at http://localhost:${port}`);
});
