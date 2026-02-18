// const express =require("express");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
require('./reminderCron')
// const port=8080;

// app.listen(port,(req,res)=>{
// console.log("port is running");
// })
const appointmentRoutes = require('./routes/appointmentRoutes'); 


const app = express();
connectDB();
app.use(cors({ origin: "http://localhost:4200" }));
// app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use('/api/appointments', appointmentRoutes);
app.listen(5000, () => console.log("Server running "));
