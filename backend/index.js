// Imports
const express = require("express");
const app = express();
const cors = require("cors");

// Local Imports
const connectDb = require("./Config/db");

// Routes Import
const adminRoutes = require("./Routes/adminRoutes");
const userRoutes = require("./Routes/userRoutes");

// Middleware to parse JSON
app.use(express.json());
// Middleware to allow cross origin requests
app.use(cors());

// Adding Config File Contents to process
require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 8000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Database Connection
connectDb(CONNECTION_STRING);

//Defining API's
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>TestConductor</h1>");
});

app.listen(PORT, () => {
  console.log(`TestConductor listening on port ${PORT}`);
});
