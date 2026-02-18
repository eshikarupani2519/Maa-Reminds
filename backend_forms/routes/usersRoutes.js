const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Path to your User model
const jwt = require('jsonwebtoken'); // You need to install this: npm install jsonwebtoken

// This is your secret key. You should ideally store this in an environment variable.
const jwtSecret = 'ankaeshika'; 
router.patch('/pills/:pillId', async (req, res) => {
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

    const pillData = req.body;

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
    const user = await User.findById(userId).select('pills');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user.pills);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});
router.delete('/pills/:pillId', async (req, res) => {
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

    // Use $pull to remove the pill with the specified _id from the pills array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { pills: { _id: pillId } } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if a pill was actually removed
    const wasPillRemoved = updatedUser.pills.some(p => p._id.toString() === pillId);
    if (!wasPillRemoved) {
        return res.status(404).json({ message: 'Pill not found for this user.' });
    }

    res.status(200).json({ message: 'Pill deleted successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});
router.get('/pills/:pillId', async (req, res) => {
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

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user.appointments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});
module.exports = router;