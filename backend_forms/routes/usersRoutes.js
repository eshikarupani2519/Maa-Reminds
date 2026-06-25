// // const express = require('express');
// // const router = express.Router();
// // const User = require('../models/User'); 
// // const jwt = require('jsonwebtoken'); 
// // const jwtSecret = 'ankaeshika';

// // const getUserIdFromToken = (req, res, next) => {
// //   const token = req.headers.authorization;
// //   if (!token) return res.status(401).json({ message: 'Token missing' });
// //   const tokenValue = token.split(' ')[1];
// //   try {
// //     const decoded = jwt.verify(tokenValue, jwtSecret);
// //     req.userId = decoded.id;
// //     next();
// //   } catch (err) {
// //     return res.status(401).json({ message: 'Invalid token' });
// //   }
// // };

// // router.patch('/pills/:pillId', getUserIdFromToken, async (req, res) => {
// //     try {
// //       const token = req.headers.authorization;
// //       if (!token) {
// //         return res.status(401).json({ message: 'Authorization token not found.' });
// //       }
  
// //       const tokenValue = token.split(' ')[1];
// //       let userId;
// //       try {
// //         const decodedToken = jwt.verify(tokenValue, jwtSecret);
// //         userId = decodedToken.id; 
// //       } catch (error) {
// //         return res.status(401).json({ message: 'Invalid or expired token.' });
// //       }
  
// //       const { pillId } = req.params;
// //       const updatedPillData = req.body;
  
// //       // Find the user and update the specific pill within the pills array
// //       const updatedUser = await User.findOneAndUpdate(
// //         { _id: userId, 'pills._id': pillId }, // Find the user and the specific pill
// //         { 
// //           $set: {
// //             // Use the positional operator '$' to update the matched pill in the array
// //             'pills.$': updatedPillData 
// //           }
// //         },
// //         { new: true, runValidators: true } // Return the updated document and run Mongoose validators
// //       );
  
// //       if (!updatedUser) {
// //         // If updatedUser is null, it means either the user or the pill was not found
// //         return res.status(404).json({ message: 'Pill or User not found.' });
// //       }
  
// //       res.status(200).json({ message: 'Pill updated successfully.', user: updatedUser });
  
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ message: 'Server error.', error: error.message });
// //     }
// // });
// // router.post('/add-pill', async (req, res) => {
// //   console.log("Received request to add pill with data:", req.body);
// //   try {
// //     const token = req.headers.authorization;
// //     if (!token) {
// //       return res.status(401).json({ message: 'Authorization token not found.' });
// //     }

// //     const tokenValue = token.split(' ')[1];
// //     console.log("Received token:", tokenValue);

// //     let userId;
// //     try {
// //       const decodedToken = jwt.verify(tokenValue, jwtSecret);
// //       userId = decodedToken.id; 
// //        console.log("Decoded user ID from token:", userId);
// //     } catch (error) {
// //       return res.status(401).json({ message: 'Invalid or expired token.' });
// //     }
   

// //     const pillData = req.body;
// //     console.log("Received pill data:", pillData);

// //     const updatedUser = await User.findByIdAndUpdate(
// //       userId,
// //       { $push: { pills: pillData } },
// //       { new: true, useFindAndModify: false }
// //     );

// //     if (!updatedUser) {
// //       return res.status(404).json({ message: 'User not found.' });
// //     }

// //     res.status(200).json({ message: 'Pill added successfully.', user: updatedUser });

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error.', error: error.message });
// //   }
// // });
// // // 
// // router.get('/pills', async (req, res) => {
// //   console.log("in pills");
// //   try {
// //     const token = req.headers.authorization;
// //     if (!token) {
// //       return res.status(401).json({ message: 'Authorization token not found.' });
// //     }

// //     const tokenValue = token.split(' ')[1];

// //     let userId;
// //     try {
// //       const decodedToken = jwt.verify(tokenValue, jwtSecret);
// //       userId = decodedToken.id; 
// //     } catch (error) {
// //       return res.status(401).json({ message: 'Invalid or expired token.' });
// //     }

// //     // Find the user by ID and select only the 'pills' field
// //     // const user = await User.findById(userId).select('pills');


// //     const user = await User.findById(userId);

// // if (!user) {
// //   return res.status(404).json({ message: 'User not found.' });
// // }

// // await checkAndMoveExpiredData(user);

// // res.status(200).json(user.pills);

// //     // if (!user) {
// //     //   return res.status(404).json({ message: 'User not found.' });
// //     // }

// //     // res.status(200).json(user.pills);

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error.', error: error.message });
// //   }
// // });

// // router.delete('/pills/:pillId', async (req, res) => {
// //   try {
// //     const token = req.headers.authorization;
// //     if (!token) return res.status(401).json({ message: 'Authorization token not found.' });

// //     const tokenValue = token.split(' ')[1];
// //     let userId;
// //     try {
// //       const decodedToken = jwt.verify(tokenValue, jwtSecret);
// //       userId = decodedToken.id; 
// //     } catch (error) {
// //       return res.status(401).json({ message: 'Invalid or expired token.' });
// //     }

// //     const { pillId } = req.params;

// //     // Find user first
// //     const user = await User.findById(userId);
// //     if (!user) return res.status(404).json({ message: 'User not found.' });

// //     // Check if pill exists
// //     const pillExists = user.pills.some(p => p._id.toString() === pillId);
// //     if (!pillExists) return res.status(404).json({ message: 'Pill not found for this user.' });

// //     // Remove the pill
// //     user.pills = user.pills.filter(p => p._id.toString() !== pillId);
// //     await user.save();

// //     res.status(200).json({ message: 'Pill deleted successfully.' });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error.', error: error.message });
// //   }
// // });

// // router.get('/pills/:pillId', async (req, res) => {
// //   console.log("in get single pill");
// //   try {
// //     const token = req.headers.authorization;
// //     if (!token) {
// //       return res.status(401).json({ message: 'Authorization token not found.' });
// //     }
// //     const tokenValue = token.split(' ')[1];
// //     let userId;
// //     try {
// //       const decodedToken = jwt.verify(tokenValue, jwtSecret);
// //       userId = decodedToken.id; 
// //     } catch (error) {
// //       return res.status(401).json({ message: 'Invalid or expired token.' });
// //     }

// //     const { pillId } = req.params;
// //     console.log("Received request for pill ID:", pillId, "for user ID:", userId);           

// //     const user = await User.findById(userId);

// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found.' });
// //     }

// //     // Find the specific pill in the user's pills array
// //     const pill = user.pills.find(p => p._id.toString() === pillId);

// //     if (!pill) {
// //       return res.status(404).json({ message: 'Pill not found for this user.' });
// //     }

// //     res.status(200).json(pill);

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error.', error: error.message });
// //   }
// // });
// // router.get('/appointments', async (req, res) => {
// // try {
// //     const token = req.headers.authorization;
// //     if (!token) {
// //       return res.status(401).json({ message: 'Authorization token not found.' });
// //     }
// //     const tokenValue = token.split(' ')[1];
// //     let userId;
// //     try {
// //       const decodedToken = jwt.verify(tokenValue, jwtSecret);
// //       userId = decodedToken.id; 
// //     } catch (error) {
// //       return res.status(401).json({ message: 'Invalid or expired token.' });
// //     }

// //     const user = await User.findById(userId).select('appointments');
// //     // const user = await User.findById(userId);

// // if (!user) {
// //   return res.status(404).json({ message: 'User not found.' });
// // }

// // await checkAndMoveExpiredData(user);

// // res.status(200).json(user.appointments);


// //     // if (!user) {
// //     //   return res.status(404).json({ message: 'User not found.' });
// //     // }

// //     // res.status(200).json(user.appointments);

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error.', error: error.message });
// //   }
// // });

// // const checkAndMoveExpiredData = async (user) => {
// //   const now = new Date();

// //   // ---------- PILLS ----------
// //   const activePills = [];

// //   for (let pill of user.pills) {
// //     const endDate = new Date(pill.endDate);

// //     if (endDate < now) {
// //       user.medicineHistory.push(pill);
// //     } else {
// //       activePills.push(pill);
// //     }
// //   }

// //   user.pills = activePills;

// //   // ---------- APPOINTMENTS ----------
// //   const activeAppointments = [];

// //   for (let appt of user.appointments) {
// //     const apptDateTime = new Date(`${appt.date}T${appt.time}`);

// //     if (apptDateTime < now) {
// //       user.appointmentHistory.push(appt);
// //     } else {
// //       activeAppointments.push(appt);
// //     }
// //   }

// //   user.appointments = activeAppointments;

// //   await user.save();
// // };
// // router.get('/medicine-history', getUserIdFromToken, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.userId);

// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found.' });
// //     }

// //     const now = new Date();
// //     let hasMoved = false;

// //     const activePills = [];

// //     for (let pill of user.pills) {
// //       const endDate = new Date(pill.endDate);

// //       // If pill expired → move to medicineHistory
// //       if (endDate < now) {
// //         user.medicineHistory.push(pill);
// //         hasMoved = true;
// //       } else {
// //         activePills.push(pill);
// //       }
// //     }

// //     // Update pills array
// //     if (hasMoved) {
// //       user.pills = activePills;
// //       await user.save();
// //     }

// //     res.status(200).json(user.medicineHistory);

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       message: "Server error occurred",
// //       error: error.message
// //     });
// //   }
// // });

// // router.get('/missed-dosages', getUserIdFromToken, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.userId).select('missedDosages');
// //     if (!user) return res.status(404).json({ message: 'User not found.' });

// //     res.status(200).json(user.missedDosages);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // });

// // // router.get('/missed-dosages', getUserIdFromToken, async (req, res) => {
// // //   try {
// // //     const user = await User.findById(req.userId).select('missedDosages');
// // //     if (!user) return res.status(404).json({ message: 'User not found.' });

// // //     res.status(200).json(user.missedDosages);
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // });

// // //new routes for yes/no 
// // router.get('/respond/yes/:userId/:pillId', async (req, res) => {
// //   try {
// //     const { userId, pillId } = req.params;

// //     const user = await User.findById(userId);

// //     if (!user) {
// //       return res.status(404).send('User not found');
// //     }

// //     const pill = user.pills.id(pillId);

// //     if (!pill) {
// //       return res.status(404).send('Medicine not found');
// //     }

// //     pill.responseStatus = 'yes';
// //     pill.responseDeadline = null;

// //     await user.save();

// //     return res.send(`
// //       <h2 style="color:green;font-family:Arial">
// //         ✅ Great! Medicine marked as taken.
// //       </h2>
// //     `);

// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).send('Server Error');
// //   }
// // });


// // /* USER CLICKED NO */
// // router.get('/respond/no/:userId/:pillId', async (req, res) => {
// //   try {
// //     const { userId, pillId } = req.params;

// //     const user = await User.findById(userId);

// //     if (!user) {
// //       return res.status(404).send('User not found');
// //     }

// //     const pill = user.pills.id(pillId);

// //     if (!pill) {
// //       return res.status(404).send('Medicine not found');
// //     }

// //     /* Move to missed dosages */
// //     user.missedDosages.push({
// //       pillName: pill.pillName,
// //       startDate: pill.startDate,
// //       endDate: pill.endDate,
// //       frequency: pill.frequency,
// //       timing: pill.timing,
// //       beforeAfterMeal: pill.beforeAfterMeal,
// //       quantityYouHave: pill.quantityYouHave,
// //       description: pill.description
// //     });

// //     pill.responseStatus = 'no';
// //     pill.responseDeadline = null;

// //     await user.save();

// //     return res.send(`
// //       <h2 style="color:red;font-family:Arial">
// //         ❌ Marked as missed dosage.
// //       </h2>
// //     `);

// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).send('Server Error');
// //   }
// // });


// // module.exports = router;




// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const { MessagingResponse } = require('twilio').twiml;
// const jwtSecret = 'ankaeshika';

// /* ---------------- TOKEN MIDDLEWARE ---------------- */
// const getUserIdFromToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Token missing' });
//   }

//   const tokenValue = token.split(' ')[1];

//   try {
//     const decoded = jwt.verify(tokenValue, jwtSecret);
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// /* ---------------- DATE FORMATTER ---------------- */
// /* converts full ISO date -> yyyy-mm-dd */
// const formatDateOnly = (date) => {
//   if (!date) return null;
//   return new Date(date).toISOString().split('T')[0];
// };

// /* ---------------- ADD PILL ---------------- */
// router.post('/add-pill', getUserIdFromToken, async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.userId,
//       { $push: { pills: req.body } },
//       { new: true }
//     );

//     res.status(200).json({
//       message: 'Pill added successfully',
//       user: updatedUser
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: 'Server error',
//       error: error.message
//     });
//   }
// });

// /* ---------------- UPDATE PILL ---------------- */
// router.patch('/pills/:pillId', getUserIdFromToken, async (req, res) => {
//   try {
//     const { pillId } = req.params;

//     const updatedUser = await User.findOneAndUpdate(
//       { _id: req.userId, 'pills._id': pillId },
//       {
//         $set: {
//           'pills.$': req.body
//         }
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({
//         message: 'Pill not found'
//       });
//     }

//     res.status(200).json({
//       message: 'Updated successfully'
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: 'Server error',
//       error: error.message
//     });
//   }
// });

// /* ---------------- GET ALL PILLS ---------------- */
// router.get('/pills', getUserIdFromToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);

//     if (!user) {
//       return res.status(404).json({
//         message: 'User not found'
//       });
//     }

//     const pills = user.pills.map(pill => ({
//       ...pill.toObject(),
//       startDate: formatDateOnly(pill.startDate),
//       endDate: formatDateOnly(pill.endDate)
//     }));

//     res.status(200).json(pills);

//   } catch (error) {
//     res.status(500).json({
//       message: 'Server error',
//       error: error.message
//     });
//   }
// });

// /* ---------------- GET SINGLE PILL ---------------- */
// router.get('/pills/:pillId', getUserIdFromToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);

//     const pill = user.pills.id(req.params.pillId);

//     if (!pill) {
//       return res.status(404).json({
//         message: 'Pill not found'
//       });
//     }

//     const response = {
//       ...pill.toObject(),
//       startDate: formatDateOnly(pill.startDate),
//       endDate: formatDateOnly(pill.endDate)
//     };

//     res.status(200).json(response);

//   } catch (error) {
//     res.status(500).json({
//       message: 'Server error',
//       error: error.message
//     });
//   }
// });

// /* ---------------- DELETE PILL ---------------- */
// router.delete('/pills/:pillId', getUserIdFromToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);

//     user.pills = user.pills.filter(
//       p => p._id.toString() !== req.params.pillId
//     );

//     await user.save();

//     res.status(200).json({
//       message: 'Deleted successfully'
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: 'Server error',
//       error: error.message
//     });
//   }
// });


// router.get(
//   '/pending-reminders',
//   getUserIdFromToken,
//   async (req, res) => {

//     try {

//       const user = await User.findById(req.userId);

//       if (!user) {
//         return res.status(404).json({
//           message: 'User not found'
//         });
//       }

//       const pending = user.pills.filter(
//         p => !p.responseStatus ||
//              p.responseStatus === 'pending'
//       );

//       return res.status(200).json(pending);

//     } catch (err) {

//       console.log(err);

//       return res.status(500).json({
//         message: err.message
//       });

//     }

// });

// // router.post(
// // '/pill/:pillId/taken',
// // getUserIdFromToken,
// // async(req,res)=>{

// //  try{

// //    const user = await User.findById(req.userId);

// //    if(!user){
// //      return res.status(404).json({
// //        message:'User not found'
// //      });
// //    }

// //    const pill = user.pills.id(req.params.pillId);

// //    if(!pill){
// //      return res.status(404).json({
// //        message:'Pill not found'
// //      });
// //    }

// //    pill.responseStatus = 'yes';

// //    await user.save();

// //    return res.status(200).json({
// //      message:'Medicine marked as taken'
// //    });

// //  }
// //  catch(err){

// //    console.log(err);

// //    return res.status(500).json({
// //      message:err.message
// //    });

// //  }

// // });
// router.post(
//   '/pill/:pillId/taken',
//   getUserIdFromToken,
//   async(req,res)=>{

//     try{

//       const user =
//         await User.findById(req.userId);

//       const pill =
//         user.pills.id(req.params.pillId);

//       if(!pill){
//         return res.status(404).json({
//           message:'Pill not found'
//         });
//       }

//       pill.responseStatus = "yes";
//       // alert(pill.responseStatus);
//       console.log(pill.responseStatus);

//       await user.save();
//       // console.log(res);

//       return res.status(200).json({
//         message:'Medicine marked as taken'
//       });

//     }
//     catch(err){

//       return res.status(500).json({
//         message:err.message
//       });

//     }

// });


// router.post(
//   '/pill/:pillId/missed',
//   getUserIdFromToken,
//   async(req,res)=>{

//     try{

//       const user =
//         await User.findById(req.userId);

//       const pill =
//         user.pills.id(req.params.pillId);

//       if(!pill){
//         return res.status(404).json({
//           message:'Pill not found'
//         });
//       }

//       user.missedDosages.push({

//         pillName: pill.pillName,
//         startDate: pill.startDate,
//         endDate: pill.endDate,
//         frequency: pill.frequency,
//         timing: pill.timing,
//         beforeAfterMeal: pill.beforeAfterMeal,
//         quantityYouHave: pill.quantityYouHave,
//         description: pill.description

//       });

//       pill.responseStatus = "no";

//       const totalMissed =
//         user.missedDosages.length;

//       if(
//         totalMissed >= 3 &&
//         user.familyMemberPhone &&
//         !user.familyAlertSent
//       ){

//         await sendSMS(
//           user.familyMemberPhone,
//           `${user.fullName} has missed 3 or more medicines. Please check on them.`
//         );

//         user.familyAlertSent = true;
//       }

//       await user.save();

//       return res.status(200).json({
//         message:'Medicine marked as missed'
//       });

//     }
//     catch(err){

//       return res.status(500).json({
//         message:err.message
//       });

//     }

// });


// // router.post('/sms-reply', async (req, res) => {
// //   const twiml = new MessagingResponse();

// //   try {
// //     console.log("Webhook hit");
// //     console.log(req.body);

// //     const msg = req.body.Body.trim().toUpperCase();
// //     const from = req.body.From.replace('+91', '');

// //     const user = await User.findOne({ phone: from });

// //     if (!user) {
// //       twiml.message("User not found.");
// //       return res.type('text/xml').send(twiml.toString());
// //     }

// //     const pill = user.pills.find(
// //       p => p.responseStatus === "pending"
// //     );

// //     if (!pill) {
// //       twiml.message("No pending medicine reminder found.");
// //       return res.type('text/xml').send(twiml.toString());
// //     }

// //     if (msg === "YES") {
// //       pill.responseStatus = "yes";
// //       pill.responseDeadline = null;

// //       await user.save();

// //       twiml.message(`✅ ${pill.pillName} marked as taken.`);
// //     }

// //     else if (msg === "NO") {

// //       user.missedDosages.push({
// //         pillName: pill.pillName,
// //         timing: pill.timing
// //       });

// //       pill.responseStatus = "no";
// //       pill.responseDeadline = null;

// //       await user.save();

// //       twiml.message(`❌ ${pill.pillName} marked as missed.`);
// //     }

// //     else {
// //       twiml.message("Reply YES if taken or NO if missed.");
// //     }

// //     res.type('text/xml').send(twiml.toString());

// //   } catch (err) {
// //     console.log(err);
// //     twiml.message("Something went wrong.");
// //     res.type('text/xml').send(twiml.toString());
// //   }
// // });

// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = 'ankaeshika';

/* ---------------- TOKEN MIDDLEWARE ---------------- */
const getUserIdFromToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token missing' });

  const tokenValue = token.split(' ')[1];
  try {
    const decoded = jwt.verify(tokenValue, jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

/* ---------------- DATE FORMATTER ---------------- */
const formatDateOnly = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};

/* ---------------- ADD PILL ---------------- */
router.post('/add-pill', getUserIdFromToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $push: { pills: req.body } },
      { new: true }
    );
    res.status(200).json({ message: 'Pill added successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ---------------- UPDATE PILL ---------------- */
router.patch('/pills/:pillId', getUserIdFromToken, async (req, res) => {
  try {
    const { pillId } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId, 'pills._id': pillId },
      { $set: { 'pills.$': req.body } },
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'Pill not found' });
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ---------------- GET ALL PILLS ---------------- */
router.get('/pills', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const pills = user.pills.map(pill => ({
      ...pill.toObject(),
      startDate: formatDateOnly(pill.startDate),
      endDate: formatDateOnly(pill.endDate)
    }));
    res.status(200).json(pills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ---------------- GET SINGLE PILL ---------------- */
router.get('/pills/:pillId', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const pill = user.pills.id(req.params.pillId);
    if (!pill) return res.status(404).json({ message: 'Pill not found' });

    res.status(200).json({
      ...pill.toObject(),
      startDate: formatDateOnly(pill.startDate),
      endDate: formatDateOnly(pill.endDate)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ---------------- DELETE PILL ---------------- */
router.delete('/pills/:pillId', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.pills = user.pills.filter(p => p._id.toString() !== req.params.pillId);
    await user.save();
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* ---------------- PENDING REMINDERS ---------------- */
router.get('/pending-reminders', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const pending = user.pills.filter(
      p => !p.responseStatus || p.responseStatus === 'pending'
    );
    return res.status(200).json(pending);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* ---------------- MARK TAKEN ---------------- */
router.post('/pill/:pillId/taken', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const pill = user.pills.id(req.params.pillId);

    if (!pill) return res.status(404).json({ message: 'Pill not found' });

    pill.responseStatus = 'yes';
    await user.save();

    return res.status(200).json({ message: 'Medicine marked as taken' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* ---------------- MARK MISSED ---------------- */
router.post('/pill/:pillId/missed', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const pill = user.pills.id(req.params.pillId);

    if (!pill) return res.status(404).json({ message: 'Pill not found' });

    // Push to missedDosages
    user.missedDosages.push({
      pillName: pill.pillName,
      startDate: pill.startDate,
      endDate: pill.endDate,
      frequency: pill.frequency,
      timing: pill.timing,
      beforeAfterMeal: pill.beforeAfterMeal,
      quantityYouHave: pill.quantityYouHave,
      description: pill.description
    });

    pill.responseStatus = 'no';

    const totalMissed = user.missedDosages.length;

    // Family alert if missed >= 3
    if (totalMissed >= 3 && user.familyMemberPhone && !user.familyAlertSent) {
      const sendSMS = require('../utils/sendSMS');
      await sendSMS(
        user.familyMemberPhone,
        `Alert: ${user.fullName} has missed ${totalMissed} or more medicines. Please check on them.`
      );
      user.familyAlertSent = true;
    }

    await user.save();

    return res.status(200).json({
      message: 'Medicine marked as missed',
      totalMissed,
      familyAlerted: user.familyAlertSent
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* ---------------- MISSED DOSAGES LIST ---------------- */
router.get('/missed-dosages', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const missed = user.missedDosages.map(pill => ({
      ...pill.toObject(),
      startDate: formatDateOnly(pill.startDate),
      endDate: formatDateOnly(pill.endDate)
    }));
    return res.status(200).json(missed);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* ---------------- MEDICINE HISTORY ---------------- */
// Returns pills whose endDate has passed → auto-moves them from pills → medicineHistory
router.get('/medicine-history', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const now = new Date();
    let hasMoved = false;
    const activePills = [];

    for (const pill of user.pills) {
      const endOfDay = new Date(pill.endDate);
      endOfDay.setHours(23, 59, 59, 999);

      if (endOfDay < now) {
        // Expired → move to history
        user.medicineHistory.push(pill.toObject());
        hasMoved = true;
      } else {
        activePills.push(pill);
      }
    }

    if (hasMoved) {
      user.pills = activePills;
      await user.save();
    }

    const history = user.medicineHistory.map(pill => ({
      ...pill.toObject(),
      startDate: formatDateOnly(pill.startDate),
      endDate: formatDateOnly(pill.endDate)
    }));

    return res.status(200).json(history);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;