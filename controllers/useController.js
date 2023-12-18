const Users = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
/*
@desc POST Request
@desc Register a user
@access Public
*/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  //check if the user exist
  const ifUserExist = await Users.findOne({ email });
  if (ifUserExist) {
    res.status(400);
    throw new Error("User is already exist");
  }

  //   hash the pasword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   create a user
  const createdUser = await Users.create({
    name,
    email,
    password: hashedPassword,
  });

  if (createdUser) {
    res.status(201).json({
      _id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      token: generateToken(createdUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

/*
  @desc POST request
  @desc LOGIN the user
  @access Public
*/

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // check for use email
  const user = await Users.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

/*
@desc GET request
@desc GET the current user /api/user/current
@access PRIVATE
*/

const currentUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await Users.findById(req.user.id);
  if ((_id, name, email)) {
    res.status(200).json({
      _id,
      name,
      email,
    });
  } else {
    res.status(404);
    throw new Error("Not Found!");
  }
});

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "8d",
  });
};

module.exports = { registerUser, loginUser, currentUser };
