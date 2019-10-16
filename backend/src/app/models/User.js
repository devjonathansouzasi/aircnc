const mongoose = require("../database");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
