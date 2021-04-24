const mongoose = require("mongoose");
const { default: validator } = require("validator");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
  },
  email: {
    type: String,
    require: true,
    unique: [true, "Email is already Exist"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    min: 10,
    require: true,
    unique: true,
  },
  address: {
    type: String,
    require: true,
  },
});

//we will create new collection

const Student = new mongoose.model("Student", StudentSchema);

module.exports = Student;
