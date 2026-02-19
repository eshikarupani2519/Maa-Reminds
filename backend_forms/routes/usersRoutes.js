const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const jwt = require('jsonwebtoken'); 
const jwtSecret = 'ankaeshika';

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

router.patch('/pills/:pillId', getUserIdFromToken, async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'Authorization token not found.' });
      }
  
      const tokenValue = token.split(' ')[1];
      let userId;
      try {
        const decodedToken = jwt.verify(tokenValue, jwtSecret);
        userId = decodedToken.id; 
      } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
      }
  
      const { pillId } = req.params;
      const updatedPillData = req.body;
  
      // Find the user and update the specific pill within the pills array
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId, 'pills._id': pillId }, // Find the user and the specific pill
        { 
          $set: {
            // Use the positional operator '$' to update the matched pill in the array
            'pills.$': updatedPillData 
          }
        },
        { new: true, runValidators: true } // Return the updated document and run Mongoose validators
      );
  
      if (!updatedUser) {
        // If updatedUser is null, it means either the user or the pill was not found
        return res.status(404).json({ message: 'Pill or User not found.' });
      }
  
      res.status(200).json({ message: 'Pill updated successfully.', user: updatedUser });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
});
router.post('/add-pill', async (req, res) => {
  console.log("Received request to add pill with data:", req.body);
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authorization token not found.' });
    }

    const tokenValue = token.split(' ')[1];
    console.log("Received token:", tokenValue);

    let userId;
    try {
      const decodedToken = jwt.verify(tokenValue, jwtSecret);
      userId = decodedToken.id; 
       console.log("Decoded user ID from token:", userId);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
   

    const pillData = req.body;
    console.log("Received pill data:", pillData);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { pills: pillData } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Pill added successfully.', user: updatedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});
// 
router.get('/pills', async (req, res) => {
  console.log("in pills");
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authorization token not found.' });
    }

    const tokenValue = token.split(' ')[1];

    let userId;
    try {
      const decodedToken = jwt.verify(tokenValue, jwtSecret);
      userId = decodedToken.id; 
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    // Find the user by ID and select only the 'pills' field
    // const user = await User.findById(userId).select('pills');


    const user = await User.findById(userId);

if (!user) {
  return res.status(404).json({ message: 'User not found.' });
}

await checkAndMoveExpiredData(user);

res.status(200).json(user.pills);

    // if (!user) {
    //   return res.status(404).json({ message: 'User not found.' });
    // }

    // res.status(200).json(user.pills);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

router.delete('/pills/:pillId', async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Authorization token not found.' });

    const tokenValue = token.split(' ')[1];
    let userId;
    try {
      const decodedToken = jwt.verify(tokenValue, jwtSecret);
      userId = decodedToken.id; 
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    const { pillId } = req.params;

    // Find user first
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Check if pill exists
    const pillExists = user.pills.some(p => p._id.toString() === pillId);
    if (!pillExists) return res.status(404).json({ message: 'Pill not found for this user.' });

    // Remove the pill
    user.pills = user.pills.filter(p => p._id.toString() !== pillId);
    await user.save();

    res.status(200).json({ message: 'Pill deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

router.get('/pills/:pillId', async (req, res) => {
  console.log("in get single pill");
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authorization token not found.' });
    }
    const tokenValue = token.split(' ')[1];
    let userId;
    try {
      const decodedToken = jwt.verify(tokenValue, jwtSecret);
      userId = decodedToken.id; 
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    const { pillId } = req.params;
    console.log("Received request for pill ID:", pillId, "for user ID:", userId);           

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Find the specific pill in the user's pills array
    const pill = user.pills.find(p => p._id.toString() === pillId);

    if (!pill) {
      return res.status(404).json({ message: 'Pill not found for this user.' });
    }

    res.status(200).json(pill);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});
router.get('/appointments', async (req, res) => {
try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authorization token not found.' });
    }
    const tokenValue = token.split(' ')[1];
    let userId;
    try {
      const decodedToken = jwt.verify(tokenValue, jwtSecret);
      userId = decodedToken.id; 
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    const user = await User.findById(userId).select('appointments');
    // const user = await User.findById(userId);

if (!user) {
  return res.status(404).json({ message: 'User not found.' });
}

await checkAndMoveExpiredData(user);

res.status(200).json(user.appointments);


    // if (!user) {
    //   return res.status(404).json({ message: 'User not found.' });
    // }

    // res.status(200).json(user.appointments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

const checkAndMoveExpiredData = async (user) => {
  const now = new Date();

  // ---------- PILLS ----------
  const activePills = [];

  for (let pill of user.pills) {
    const endDate = new Date(pill.endDate);

    if (endDate < now) {
      user.medicineHistory.push(pill);
    } else {
      activePills.push(pill);
    }
  }

  user.pills = activePills;

  // ---------- APPOINTMENTS ----------
  const activeAppointments = [];

  for (let appt of user.appointments) {
    const apptDateTime = new Date(`${appt.date}T${appt.time}`);

    if (apptDateTime < now) {
      user.appointmentHistory.push(appt);
    } else {
      activeAppointments.push(appt);
    }
  }

  user.appointments = activeAppointments;

  await user.save();
};
router.get('/medicine-history', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const now = new Date();
    let hasMoved = false;

    const activePills = [];

    for (let pill of user.pills) {
      const endDate = new Date(pill.endDate);

      // If pill expired → move to medicineHistory
      if (endDate < now) {
        user.medicineHistory.push(pill);
        hasMoved = true;
      } else {
        activePills.push(pill);
      }
    }

    // Update pills array
    if (hasMoved) {
      user.pills = activePills;
      await user.save();
    }

    res.status(200).json(user.medicineHistory);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error occurred",
      error: error.message
    });
  }
});

router.get('/missed-dosages', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('missedDosages');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.status(200).json(user.missedDosages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/missed-dosages', getUserIdFromToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('missedDosages');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.status(200).json(user.missedDosages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;