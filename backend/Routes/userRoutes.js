const express = require("express");
// Importing Models
const User = require("../Models/UserModel");

// Router Import
const router = express.Router();

// Import Controllers
const {
  logUserIn,
  protect,
  createUserAccount,
} = require("../Controllers/userControllers");

// Account Login
router.post("/", logUserIn);

// User Account Creation
router.post("/register", createUserAccount);

module.exports = router;
