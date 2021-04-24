const express = require("express");
const app = express();
require("./db/connection");
const Student = require("./models/students");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello welcome to this website");
});

app.post("/students", (req, res) => {
  res.send("Hello from the server");
});

app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
