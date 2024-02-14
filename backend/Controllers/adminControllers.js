// Utility Function which generates a JWT Token from user Id,and Secret Key

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
// Importing Models
const User = require("../Models/UserModel");
const Test = require("../Models/TestModel");

// Importing Utilities
const parseExcelData = require("../Utils/AdminUtils/read");

const signToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.logAdminIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    // Check if the email and password exist
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "username and password fields are mandatory",
      });
    }

    // Check if a user with the given email exists in the database
    const actual_admin_username = process.env.ADMIN_USERNAME;
    const actual_admin_password = process.env.ADMIN_PASSWORD;

    // Check if the candidate password is the same as the actual password
    const correct =
      username === actual_admin_username && password === actual_admin_password;

    if (!correct) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Incorrect email or password",
      });
    }
    // If everything is OK, send a token to the client
    const token = signToken(process.env.ADMIN_ID);
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

exports.createStudentAccounts = async (req, res) => {
  try {
    // Parse data into array of objects
    const newStudentAccountData = parseExcelData(
      "./Data/AccountData/accounts.xlsx"
    );
    /*
    Validate Data: Each Array Object should contain the following keys:
    1.firstName
    2.lastName
    3.emailId
    4.password    
    */

    // Validate Data: Each Array Object should contain the following keys
    const validKeys = ["firstName", "lastName", "emailId", "password"];

    const isValidData = newStudentAccountData.every((student) => {
      return validKeys.every((key) => student.hasOwnProperty(key));
    });

    if (!isValidData) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message:
          "Invalid data format. Each row should have 'firstName', 'lastName', 'emailId' and 'password'.",
      });
    }
    // Delete all data from User model
    await User.deleteMany({});

    // Add the new array of objects to the User model
    const currentStudentData = await User.insertMany(newStudentAccountData);

    return res.status(200).json({
      status: "success",
      data: currentStudentData,
      message: "Accounts Created Successfully!",
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

exports.getAllUsers = async (req, res) => {
  try {
    // 1] Get all the users from the 'User' collection
    const users = await User.find(
      {},
      "-testSubmissionTime -questionsSolved -password -accountCreatedAt"
    );

    // 2] Send all the data as a response
    return res.status(200).json({
      status: "success",
      data: users,
      message: "All users retrieved successfully",
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

exports.resetUserData = async (req, res) => {
  try {
    // 1] Check if the userId is present in the req body
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Please specify the userId",
      });
    }

    // 2] Find the object with the specified userId
    let user;
    try {
      user = await User.findById(userId);
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Invalid userId format",
      });
    }

    if (!user) {
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "User not found with the specified userId",
      });
    }

    // 3] Reset the values of 'questionsSolved' to 0 and 'testSubmissionTime' to null
    user.questionsSolved = 0;
    user.testSubmissionTime = null;

    // Save the updated user object
    await user.save();

    // 4] Send the response that the data reset was successful
    return res.status(200).json({
      status: "success",
      data: null,
      message: "User data reset was successful",
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

exports.createTest = async (req, res) => {
  try {
    // Parse data into array of objects
    const newTestData = parseExcelData("./Data/TestData/test.xlsx");
    /*
    Validate Data: Each Array Object should contain the following keys:
    1.questionId
    2.question
    3.answer
    */
    // Validate Data: Each Array Object should contain the following keys
    const validKeys = ["questionId", "question", "answer"];

    const isValidData = newTestData.every((testObject) => {
      return validKeys.every((key) => testObject.hasOwnProperty(key));
    });

    if (!isValidData) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message:
          "Invalid data format. Each row should have 'questionId', 'question', 'answer' and 'password'.",
      });
    }
    // Delete all data from Test model
    await Test.deleteMany({});

    // Add the new array of objects to the Test model
    const testData = await Test.insertMany(newTestData);

    return res.status(200).json({
      status: "success",
      data: testData,
      message: "Test Created Successfully!",
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

exports.getTotalQuestionCount = async (req, res) => {
  try {
    // Parse data into array of objects
    return res.status(200).json({
      status: "success",
      totalQuestionCount: process.env.TOTAL_QUESTION_COUNT,
      message: "Total Question Count Retrived Successfully",
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

exports.getResults = async (req, res) => {
  /*
    Algorithm:
    1] get the user data from database
    2] sort all the users objects by considering following criteria:
      a. sort according to the questionsSolved value in ascending order
      b. Incase questionsSolved values of 2 or more objects are same, then compare the 'testSubmissionTime'. The user with less testSubmissionTime will be put first!
    3] Now, create a new response object with this format:
    [{rank:1,firstname:something,lastname:something,email:something}, {}, {}, {}, {}, {}, {}, {},]
     
    My user Data object containers following keys:
        _id
        firstName
        lastName
        emailId
        password
        questionsSolved
        testSubmissionTime
        accountCreatedAt
       __v
    */
  try {
    // Get user data from the database
    const userData = await User.find();

    // Sort users based on questionsSolved and testSubmissionTime
    userData.sort((a, b) => {
      if (a.questionsSolved !== b.questionsSolved) {
        return b.questionsSolved - a.questionsSolved; // Sort by questionsSolved in ascending order
      } else {
        // If questionsSolved is the same, sort by testSubmissionTime in ascending order
        return new Date(a.testSubmissionTime) - new Date(b.testSubmissionTime);
      }
    });

    // Create a new response object
    const results = userData.map((user, index) => ({
      _id: user._id,
      rank: index + 1,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailId,
      questionsSolved: user.questionsSolved,
      testSubmissionTime: user.testSubmissionTime,
      accountCreatedAt: user.accountCreatedAt,
    }));

    return res.status(200).json({
      status: "success",
      data: results,
      message: "Results retrieved successfully",
    });
  } catch (exception) {
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side!",
      exception: exception.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // get token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "You are not logged in! Please Login to get access",
      });
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "You are not logged in! Please Login to get access",
      });
    }

    // validate the token
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (exception) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "The user belonging to the token does no longer exist",
      });
    }

    if (!(decoded.id === process.env.ADMIN_ID)) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "Invalid Token!",
      });
    }
    console.log(decoded);
    req.user = { id: decoded.id }; //attaching the user id to the request object

    //  All the above cases have passed!
    //  Therefore it is an authenticated request! Hence calling next()
    console.log("The User is authenticated!");
    next();
  } catch (exception) {
    console.log(exception);

    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side !",
      exception: exception.message,
    });
  }
};
