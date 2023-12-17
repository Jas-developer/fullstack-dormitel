const asyncHandler = require("express-async-handler");

/*
 @desc GET request
 @desc GET all the request
 @access PRIVATE
*/
const getBoarders = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get all boarders",
  });
});

/*
@desc GET request
@desc GET a specific boarder
@access PRIVATE
*/
const getBoarder = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Boarder with an id of ${req.params.id}`,
  });
});

/*
@desc POST request
@desc POST a request/add data to the server
@access PRIVATE 
*/
const addBoarder = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "New Boarder Added",
  });
});
/*
@desc UPDATE request
@desc UPDATE a data/modify a data to the server
@access PRIVATE
*/
const updateBoarder = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Boarder has been updated",
    id: `${req.params.id}`,
  });
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
