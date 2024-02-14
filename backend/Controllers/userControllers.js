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

    // Check if the user has already given the test
    if (user.testSubmissionTime !== null) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "You've already submitted the test",
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

exports.verifyAnswer = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { questionId, answer } = req.body;

    // Check if 'questionId' and 'answer' fields are present
    if (!questionId || !answer) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "'questionId' and 'answer' fields are mandatory",
      });
    }

    if (questionId == process.env.TOTAL_QUESTION_COUNT) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "cannot verify last question",
      });
    }

    // Find the user in the database
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "User not found",
      });
    }

    // Check if the provided questionId is less than or equal to questionsSolved
    if (questionId <= user.questionsSolved) {
      return res.status(200).json({
        status: "success",
        data: { questionAlreadySolved: true },
        message: "Question already solved",
      });
    }

    // Find the corresponding question in the 'Test' Document
    const testQuestion = await Test.findOne({ questionId });

    if (!testQuestion) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Invalid 'questionId'",
      });
    }

    // Match the actual 'answer' with the answer given by the user
    const isAnswerCorrect = testQuestion.answer === answer;

    if (isAnswerCorrect) {
      // If the answer is correct, increment 'questionsSolved' for the user
      await User.findByIdAndUpdate(userId, { $inc: { questionsSolved: 1 } });
    }

    return res.status(200).json({
      status: "success",
      data: { answerCorrect: isAnswerCorrect },
      message: isAnswerCorrect ? "Answer is correct" : "Answer is incorrect",
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

exports.getNextQuestion = async (req, res) => {
  try {
    // Extract user information from the request, assuming user id is available in req.user.id
    const userId = req.user.id;

    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "User not found",
      });
    }

    // Check the 'questionsSolved' field
    const questionsSolved = user.questionsSolved || 0;

    // If questionsSolved is 0, send the first question
    if (questionsSolved === 0) {
      const firstQuestion = await Test.findOne(
        { questionId: 1 },
        { question: 1, questionId: 1, _id: 0 }
      );

      return res.status(200).json({
        status: "success",
        data: firstQuestion,
        message: "First question retrieved successfully",
      });
    }

    // If questionsSolved is greater than 0, send the next question
    const nextQuestionId = questionsSolved + 1;

    // Check if there is a next question
    const nextQuestion = await Test.findOne(
      { questionId: nextQuestionId },
      { question: 1, questionId: 1, _id: 0 }
    );

    if (!nextQuestion) {
      return res.status(200).json({
        status: "success",
        data: null,
        message: "No more questions available",
      });
    }

    return res.status(200).json({
      status: "success",
      data: nextQuestion,
      message: "Next question retrieved successfully",
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

exports.endTest = async (req, res) => {
  try {
    const { questionId, answer } = req.body;

    // Verify the current answer with the current questionId
    const testQuestion = await Test.findOne({ questionId });

    if (!testQuestion) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Invalid 'questionId'",
      });
    }

    // Check if the test is already given
    const user = await User.findById(req.user.id);
    if (user.testSubmissionTime !== null) {
      return res.status(200).json({
        status: "fail",
        data: null,
        message: "You've already Submitted the test Once!",
      });
    }

    // Check if the provided answer is correct
    const isAnswerCorrect = testQuestion.answer === answer;

    if (isAnswerCorrect) {
      // If answer is correct, increment questionsSolved count
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { questionsSolved: 1 },
      });
    }

    // Save the timestamp of the current instance as 'testSubmissionTime' in User Model
    const submissionTime = new Date();
    await User.findByIdAndUpdate(req.user.id, {
      testSubmissionTime: submissionTime,
    });

    return res.status(200).json({
      status: "success",
      data: null,
      message: "Test submitted successfully!",
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
