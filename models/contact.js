const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      requireed: [true, "Name is required field"],
    },
    email: { type: String, requireed: [true, "Email is required field"] },
    phone: { type: String, requireed: [true, "phone is required field"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
