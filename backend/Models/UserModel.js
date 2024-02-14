const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
  },
  emailId: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already in use"],
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email format",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [2, "Password must be at least 2 characters long"],
  },
  questionsSolved: {
    type: Number,
    default: 0,
  },
  testSubmissionTime: {
    type: Date,
    default: null,
  },
  accountCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
