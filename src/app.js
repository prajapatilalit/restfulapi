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

// //Read student by _id
// app.get("/students/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const studentData = await Student.findById(_id);
//     if (!studentData) {
//       return res.status(404).send("Student Not Found");
//     } else {
//       res.send(studentData);
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

//Read student by name
app.get("/students/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const studentData = await Student.findOne(name).select(name);
    if (!studentData) {
      return res.status(404).send("Student Not Found");
    } else {
      res.send(studentData);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//update student by id

app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateStudent);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete student by id

app.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(_id);
    if (!deleteStudent) {
      res.status(404).send();
    } else {
      res.send(deleteStudent);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
