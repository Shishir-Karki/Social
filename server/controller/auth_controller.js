const User = require("../models/user-model");
const jwt = require('jsonwebtoken');

// Homepage
const home = async (req, res) => {
    res.status(200).send("Welcome to the controllers part");
};

// Register a user
const register = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "Email is already in use" });
        }

        // Create and save the new user
        const userCreated = await User.create({ username, email, password, phone });

        // Generate token
        const token = await userCreated.generateToken();
        
        res.status(201).json({
            msg: "Registration Successful",
            token,
            userID: userCreated._id.toString()
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error in sending data", error: error.message });
    }
};

// Login a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare password
        const isMatch = await userExist.comparepass(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate token
        const token = await userExist.generateToken();

        res.status(200).json({
            msg: "Login Successful",
            token,
            userID: userExist._id.toString()
        });
        
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userID).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { home, register, login, getUserProfile };
