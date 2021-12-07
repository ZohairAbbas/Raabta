const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    FirstName: { type: String },
    LastName: { type: String },
    Email: { type: String, unique: true },
    Bio: { type: String, default: "This is a default Bio" },
    Password: { type: String },
    Role: {
      type: String,
      default: "Client",
    },
  },
  { collection: "users" }
);

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
