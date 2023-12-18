const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an  email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add an password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new model("Users", usersSchema);
