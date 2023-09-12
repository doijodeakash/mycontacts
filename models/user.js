const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required field"],
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "password is required field"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
