const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema(
  {
    Date: { type: String },
    Time: { type: String },
    Email: { type: String },
    FullName: { type: String },
    PhoneNumber: { type: String },
    Message: { type: String },
    Expert: { type: ObjectId, ref: "UserSchema", required: true },
    Client: { type: ObjectId, ref: "UserSchema", required: true },
    Status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Rejected", "Accepted"],
    },
  },
  { collection: "appointments" }
);

const model = mongoose.model("AppointmentSchema", AppointmentSchema);

module.exports = model;
