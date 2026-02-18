const mongoose = require("mongoose");
const pillSchema = new mongoose.Schema({
  pillName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  frequency: { type: String, required: true },
  timing: { type: String, required: true },
  beforeAfterMeal: { type: String, required: true },
  quantityYouHave: { type: Number, required: true },
  description: { type: String, required: false }
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
  pills: [pillSchema]
});

// module.exports = mongoose.model("User", userSchema);

// Example of your current user schema
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   // ... other user fields like name, email, password, etc.
// });

// UPDATED schema with pills array
// const pillSchema = new mongoose.Schema({
//   pillName: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   frequency: { type: String, required: true },
//   timing: { type: String, required: true },
//   beforeAfterMeal: { type: String, required: true },
//   quantityYouHave: { type: Number, required: true },
//   description: { type: String, required: false }
// });

// const userSchema = new mongoose.Schema({
//   // ... other user fields like name, email, password, etc.
//   pills: [pillSchema] // Add this line
// });

const User = mongoose.model('User', userSchema);

module.exports = User;