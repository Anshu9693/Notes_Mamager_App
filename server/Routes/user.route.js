const express = require('express');

const { registerUser, loginUser, verifyUser, logoutUser } = require('../controllers/User.controller');
const UserRouter = express.Router();

//ragister route 
UserRouter.post('/register', registerUser);
// login route
UserRouter.post('/login',loginUser);

// user verify route
UserRouter.get("/verify", verifyUser);


// user logout route
UserRouter.get("/logout", logoutUser);

module.exports = UserRouter; 