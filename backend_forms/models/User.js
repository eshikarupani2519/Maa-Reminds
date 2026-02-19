// const mongoose = require("mongoose");
// const pillSchema = new mongoose.Schema({
//   pillName: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   frequency: { type: String, required: true },
//   timing: { type: String, required: true },
//   beforeAfterMeal: { type: String, required: true },
//   quantityYouHave: { type: Number },
//   description: { type: String, required: false }
// });

// const appointmentSchema = new mongoose.Schema({
//   doctorName: { type: String, required: true },
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   notes: { type: String },
// });

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   phone: { type: Number, required: true },
//   fullName: { type: String, required: true },
//   password: { type: String, required: true },
//   age: { type: Number, required: true },
//   familyMemberName: { type: String },
//   familyMemberPhone: { type: String },
//   otp:{ type: String },
//   appointments: [appointmentSchema],
//   pills: [pillSchema],
//   resetToken: String,
// resetTokenExpiry: Date,

// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;

const mongoose = require("mongoose");

const pillSchema = new mongoose.Schema({
  pillName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  frequency: { type: String, required: true },
  timing: { type: String, required: true },
  beforeAfterMeal: { type: String, required: true },
  quantityYouHave: { type: Number },
  description: { type: String }
});

const appointmentSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  notes: { type: String },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  familyMemberName: { type: String },
  familyMemberPhone: { type: String },
  otp:{ type: String },
  appointments: [appointmentSchema],
  pills: [pillSchema],
  missedDosages: [pillSchema],
  medicineHistory: [pillSchema],
  appointmentHistory: [appointmentSchema],
  resetToken: String,
  resetTokenExpiry: Date,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
