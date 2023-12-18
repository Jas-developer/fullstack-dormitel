const asyncHandler = require("express-async-handler");
const Boarders = require("../models/boarderModel");
const User = require("../models/UserModel");
/*
 @desc GET request
 @desc GET all the request
 @access PRIVATE
*/
const getBoarders = asyncHandler(async (req, res) => {
  const boarder = await Boarders.find({ user: req.user.id });
  res.status(200).json(boarder);
});

/*
@desc GET request
@desc GET a specific boarder
@access PRIVATE
*/
const getBoarder = asyncHandler(async (req, res) => {
  try {
    const boarder = await Boarders.findById(req.params.id);
    if (!boarder) {
      return res.status(404).json({
        error: `Unable to get the boarder with the id of ${req.params.id}`,
      });
    }

    return res.status(200).json(boarder);
  } catch (error) {
    return res.status(500).json({
      error: "Server Error",
    });
  }
});

/*
@desc POST request
@desc POST a request/add data to the server
@access PRIVATE 
*/
const addBoarder = asyncHandler(async (req, res) => {
  const { name, amount, room, due, starting } = req.body;

  if (!name || !amount || !room || !due || !starting) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if a boarder with the same room exists
  const existingBoarder = await Boarders.findOne({ room });

  if (existingBoarder) {
    res.status(400);
    throw new Error("Boarder is already exist/room is occupied");
  }

  // Create a new boarder
  const newBoarder = await Boarders.create({
    user: req.user.id,
    name,
    amount,
    room,
    due,
    starting,
  });

  if (newBoarder) {
    res.status(201).json(newBoarder);
  } else {
    res.status(500);
    throw new Error("Server Error");
  }
});

/*
@desc UPDATE request
@desc UPDATE a data/modify a data to the server
@access PRIVATE
*/

const updateBoarder = asyncHandler(async (req, res) => {
  const { name, amount, room, due, starting } = req.body;
  const updatedData = {};

  if (name) updatedData.name = name;
  if (amount) updatedData.amount = amount;
  if (room) updatedData.room = room;
  if (due) updatedData.due = due;
  if (starting) updatedData.starting = starting;

  const boarder = await Boarders.findById(req.params.id);
  if (!boarder) {
    res.status(404);
    throw new Error("Boarder is not exist");
  }

  const user = await User.findById(req.user.id);
  //  check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (boarder.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not Authorized");
  }

  const updatedBoarder = await Boarders.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
      new: true,
    }
  );

  if (updatedBoarder) {
    res.status(201).json(updatedBoarder);
  } else {
    res.status(500);
    throw new Error("Server Error");
  }
});
/*
@desc DELETE request
@desc delete/remove a specific data from the server
@access PRIVATE
*/
const deleteBoarder = asyncHandler(async (req, res) => {
  const boarder = await Boarders.findById(req.params.id);
  if (boarder) {
    const user = await User.findById(req.user.id);
    //  check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found!");
    }

    if (boarder.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User is not Authorized");
    }
    const deleteBoarder = await Boarders.findByIdAndDelete(req.params.id);
    if (deleteBoarder) {
      return res.status(200).json({
        message: "Boarder has been deleted",
      });
    }
  }
});

module.exports = {
  getBoarders,
  addBoarder,
  getBoarder,
  updateBoarder,
  deleteBoarder,
};
