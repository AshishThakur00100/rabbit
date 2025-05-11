const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
// here i will write the code to handle the user registration

// route will be a post request i.e. @route POST/api/users/register
//it will register a new user

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    user = new User({ name, email, password });
    await user.save();

    // now i am going to create at first json web token payload
    const payload = { user: { id: user._id, role: user.role } };

    // sign and return the token along with the user data

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "100h" },
      (err, token) => {
        if (err) throw err;

        // now here i am sending the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// Now i will create the login route
// this will be also a post request i.e. /api/users/login
// Description :-- Authenticate user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // here i will find the user by it's email id
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid Credentials!!!" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

   

    // sign and return the token along with the user data
    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "100h" },
      (err, token) => {
        if (err) throw err;

        // now here i am sending the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// now i am going to create the route for the user profile 

// this will be a get request 
// /api/users/profile
// this will  be a protected route and access will be private 
router.get("/profile",protect , async(req , res) =>{
  res.json(req.user);
});

module.exports = router;
