const express = require("express");
// Importing Models
const User = require("../Models/UserModel");

// Router Import
const router = express.Router();

// Import Controllers
const {
  logUserIn,
  protect,
  feedUserAccount,
  addHealthData,
  createUserAccount,
  getMyHealthData,
} = require("../Controllers/userControllers");

// Account Login
router.post("/", logUserIn);

// User Account Creation
router.post("/register", createUserAccount);

//Feed: Get all user Accounts as a feed
router.get("/feedUsers", protect, feedUserAccount);

//Add Health Data
router.post("/health", protect, addHealthData);

// Get My Health Data
router.get("/health", protect, getMyHealthData);

module.exports = router;
