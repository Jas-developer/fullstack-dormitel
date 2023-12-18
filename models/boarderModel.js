const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const boardersSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    amount: {
      type: String,
      required: [true, "Please enter an amount"],
    },
    room: {
      type: String,
      required: [true, "Please enter a room number"],
    },
    due: {
      type: String,
      required: [true, "Please enter a due date"],
    },
    starting: {
      type: String,
      required: [true, "Please enter the starting date"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new model("Boarders", boardersSchema);
