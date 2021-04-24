const express = require("express");
const app = express();
require("./db/connection");
const Student = require("./models/students");

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello welcome to this website");
});

//Create Students
// app.post("/students", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Read all students

app.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.status(200).send(studentsData);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Read student by _id
app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById(_id);
    if (!studentData) {
      return res.status(404).send("Student Not Found");
    } else {
      return res.send(studentData);
    }
  } catch (err) {
    res.send(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
