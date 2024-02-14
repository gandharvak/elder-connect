// Define a new schema for health data
const mongoose = require("mongoose");

const healthDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bloodPressure: {
    type: Number,
    required: true,
  },
  sugarLevel: {
    type: Number,
    required: true,
  },
  heartRate: {
    type: Number,
    required: true,
  },
  oxygenLevel: {
    type: Number,
    required: true,
  },
});

const HealthData = mongoose.model("HealthData", healthDataSchema);

module.exports = HealthData;
