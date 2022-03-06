const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, unique: true },
    age: { type: Number, required: true, min: 5, max: 15 },
    gender: { type: String, required: true },
    state: { type: String, required: true },
    parentEmail: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
