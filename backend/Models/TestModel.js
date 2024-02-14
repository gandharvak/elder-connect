const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    unique: true,
  },
  question: {
    type: String,
    required: [true, "question is required"],
    trim: true,
    unique: true,
  },
  answer: {
    type: String,
    required: [true, "answer is required"],
    trim: true,
  },
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
