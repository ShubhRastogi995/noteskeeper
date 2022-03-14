const asyncHandler = require("express-async-handler");
const User = require("../models/usermodel");
const generateToken = require("../utils/generatetoken");

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password, profpic } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    profpic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      profpic: user.profpic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      profpic: user.profpic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or password");
  }
});

const updateProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)
  if(user){
    user.username = req.body.user.username || user.username
    user.email = req.body.user.email || user.email
    user.profpic = req.body.user.profpic || user.profpic

    if(req.body.password)
      user.password = req.body.password
    const updateduser = await user.save()
    res.json({
      _id: user._id,
      username: updateduser.username,
      email: updateduser.email,
      password: updateduser.password,
      isAdmin: updateduser.isAdmin,
      profpic: updateduser.profpic,
      token: generateToken(updateduser._id),
    });
  } else {
    res.status(404)
    throw new Error("User not found") 
  }
})

module.exports = { userRegister, userLogin, updateProfile };
