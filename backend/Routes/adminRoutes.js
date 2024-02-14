const express = require("express");

// Router Import
const router = express.Router();

// Utility Import
// Import Controllers
const {
  logAdminIn,
  createStudentAccounts,
  createTest,
  getResults,
  getAllUsers,
  resetUserData,
  getTotalQuestionCount,
  protect,
} = require("../Controllers/adminControllers");

// Account Login
router.post("/", logAdminIn);
// Create Student Account
router.post("/createStudentAccounts", protect, createStudentAccounts);
// Get Registered User Data
router.get("/getAllUsers", protect, getAllUsers);
// Get Total Question Count
router.get("/getTotalQuestionCount", protect, getTotalQuestionCount);
// Reset User Data of a particular User
router.post("/resetData", protect, resetUserData);
// Create Test
router.post("/createTest", protect, createTest);
// Generate Result
router.post("/getResults", protect, getResults);
module.exports = router;
