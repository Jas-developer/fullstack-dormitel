const express = require("express");
const router = express.Router();
const {
  getBoarders,
  getBoarder,
  updateBoarder,
  addBoarder,
  deleteBoarder,
} = require("../controllers/boaderController");

router.get("/boarders", getBoarders);
// getting a specific boarders route
router.get("/boarders/:id", getBoarder);
// update route
router.put("/boarders/:id", updateBoarder);
// post route
router.post("/boarders", addBoarder);
// delte route to remove specific boarder
router.delete("/boarders/:id", deleteBoarder);
// exporting common js
module.exports = router;
