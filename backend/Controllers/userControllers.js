const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// Importing Models
const User = require("../Models/UserModel");
const Test = require("../Models/TestModel");

const signToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.logUserIn = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    console.log(emailId, password);

    // Check if the username and password fields are provided
    if (!emailId || !password) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "EmailId and password fields are mandatory",
      });
    }

    // Check if a user with the given username exists in the database
    const user = await User.findOne({ emailId });
    console.log(user);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "Invalid username or password",
      });
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "Invalid username or password",
      });
    }

    // If everything is OK, send a token to the client
    const token = signToken(user._id); // Assuming you have an '_id' field in your User model
    return res.status(200).json({
      status: "success",
      data: null,
      message: "Logged in successfully!",
      token,
    });
  } catch (exception) {
    console.log(exception);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side!",
      exception: exception.message,
    });
  }
};

exports.createUserAccount = async (req, res) => {
  try {
    // Extracting user data from request body
    const { name, emailId, password, locality } = req.body;

    // Checking if emailId and password fields are provided
    if (!emailId || !password) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "EmailId and password fields are mandatory",
      });
    }

    // Checking if name and locality  fields are provided
    if (!name || !locality) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "All fields are mandatory",
      });
    }

    // Checking if the email is already in use
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Email already in use",
      });
    }

    // Creating a new user document
    const newUser = new User({
      name,
      emailId,
      password,
      locality,
    });

    // Saving the new user to the database
    await newUser.save();

    // Sending success response
    res.status(201).json({
      status: "success",
      data: { newUser },
      message: "User account created successfully",
    });
  } catch (exception) {
    console.log(exception);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side!",
      exception: exception.message,
    });
  }
};

//Controller for checking if a particular request is authenticated or not
exports.protect = async (req, res, next) => {
  try {
    // Get token and check if it's there
    const token =
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null;

    if (!token) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "You are not logged in! Please Login to get access",
      });
    }

    // Validate the token
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error(error); // Log the error for debugging

      return res.status(401).json({
        status: "fail",
        data: null,
        message: "Invalid token or token has expired",
      });
    }

    // Check if the user still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "Invalid Token! User does not exist",
      });
    }

    // Attach the user id to the request object
    req.user = { id: decoded.id };

    // All the above cases have passed!
    // Therefore it is an authenticated request! Hence calling next()
    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side!",
      exception: error.message,
    });
  }
};
