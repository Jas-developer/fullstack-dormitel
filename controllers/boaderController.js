const asyncHandler = require("express-async-handler");
const Boarders = require("../models/boarderModel");
/*
 @desc GET request
 @desc GET all the request
 @access PRIVATE
*/
const getBoarders = asyncHandler(async (req, res) => {
  try {
    const boarders = await Boarders.find();
    res.status(200).json(boarders);
  } catch (error) {
    throw new Error("Error getting the boarders", error);
  }
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
        error: "Unable to get the boarder with the id",
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
  try {
    const { name, amount, room, due, starting } = req.body;

    if (!name || !amount || !room || !due || !starting) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Check if a boarder with the same room exists
    const existingBoarder = await Boarders.findOne({ room });

    if (existingBoarder) {
      if (
        existingBoarder.name.toString() === name.toString() &&
        existingBoarder.room.toString() === room.toString()
      ) {
        return res.status(400).json({
          error: "Boarder already exists",
        });
      }
    }

    // Create a new boarder
    const newBoarder = await Boarders.create({
      name,
      amount,
      room,
      due,
      starting,
    });

    if (newBoarder) {
      return res.status(201).json({
        boarder: newBoarder,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Error adding a boarder",
    });
  }
});

/*
@desc UPDATE request
@desc UPDATE a data/modify a data to the server
@access PRIVATE
*/
const updateBoarder = asyncHandler(async (req, res) => {
  try {
    const { name, amount, room, due, starting } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (amount) updateFields.amount = amount;
    if (room) updateFields.room = room;
    if (due) updateFields.due = due;
    if (starting) updateFields.starting = starting;

    const boarder = await Boarders.findById(req.params.id);
    if (!boarder) {
      return res.status(404).json({
        error: "Boarder does not exist",
      });
    }

    const updatedBoarder = await Boarders.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    return res.status(201).json({
      message: "Boarder updated",
      boarder: updatedBoarder,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error",
    });
  }
});

/*
@desc DELETE request
@desc delete/remove a specific data from the server
@access PRIVATE
*/
const deleteBoarder = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Boarder has been deleted`,
    id: `${req.params.id}`,
  });
});
module.exports = {
  getBoarders,
  addBoarder,
  getBoarder,
  updateBoarder,
  deleteBoarder,
};
