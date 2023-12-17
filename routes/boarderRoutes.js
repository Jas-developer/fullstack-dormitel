const express = require("express");
const router = express.Router();
const {
  getBoarders,
  getBoarder,
  updateBoarder,
  addBoarder,
  deleteBoarder,
} = require("../controllers/boaderController");

router.route("/boarders").get(getBoarders).post(addBoarder);
// getting a specific boarders route
router
  .route("/boarders/:id")
  .get(getBoarder)
  .put(updateBoarder)
  .delete(deleteBoarder);

// exporting common js
module.exports = router;
