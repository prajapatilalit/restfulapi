const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/students-api", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection is Successfully Established");
  })
  .catch((err) => {
    console.log("No Connection");
  });
