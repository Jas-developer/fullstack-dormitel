const express = require("express");
const router = express.Router();
const {
  getBoarders,
  getBoarder,
  updateBoarder,
  addBoarder,
  deleteBoarder,
} = require("../controllers/boaderController");
const { protect } = require("../middleware/authHandler");
router.route("/boarders").get(protect, getBoarders).post(protect, addBoarder);
// getting a specific boarders route
router
  .route("/boarders/:id")
  .get(protect, getBoarder)
  .put(protect, updateBoarder)
  .delete(protect, deleteBoarder);

// exporting common js
module.exports = router;
