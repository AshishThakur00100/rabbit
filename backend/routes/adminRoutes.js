const express = require('express');
const User = require('../models/User');
const {protect, admin} = require('../middleware/authMiddleware'); 

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users (admin only) 
// @access Private/Admin

router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//@route Post/api/admin/users 
// @desc Create a new user (admin only)
// @access Private/Admin


router.post('/', protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
   let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // if user does not exist, create a new user
    user = new User({ name, email, password, role: role || "customer" });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
//route put /api/admin/users/:id
// @desc Update user information like name , email and role (admin only)
// @access Private/Admin

router.put('/:id', protect, admin, async (req, res) => {
  
  try {
    const user = await User.findById(req.params.id);
   if(user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
     
    }
    const updatedUser = await user.save();
    res.json({
      message: 'User updated successfully', user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
);
// @route DELETE /api/admin/users/:id
// @desc Delete a user (admin only)
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user) {
      await user.deleteOne();
      res.json({ message: 'User removed successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;