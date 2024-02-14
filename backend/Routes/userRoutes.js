const express = require("express");
// Importing Models
const User = require("../Models/UserModel");

// Router Import
const router = express.Router();

// Import Controllers
const {
  logUserIn,
  getNextQuestion,
  verifyAnswer,
  endTest,
  getTotalQuestionCount,
  protect,
} = require("../Controllers/userControllers");

// Account Login
router.post("/", logUserIn);

// Get Total Question Count
router.get("/getTotalQuestionCount", protect, getTotalQuestionCount);

// Verify Answer
router.post("/verifyAnswer", protect, verifyAnswer);

// Get Next Question
router.get("/getNextQuestion", protect, getNextQuestion);

// End Test
router.post("/endTest", protect, endTest);

module.exports = router;
