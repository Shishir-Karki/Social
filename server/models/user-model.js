const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: { 
        type: String, 
        required: true,
    },
    email: { 
        type: String,          
        required: true,
        unique: true, // Ensure email is unique
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

// Hash password before saving to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(); // Return to avoid further execution if password not modified
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); // Call next when done
    } catch (error) {
        next(error); // Pass the error to next middleware
    }
});

// Compare user-entered password with stored password
userSchema.methods.comparepass = function (password) {
    return bcrypt.compare(password, this.password);
};

// Generate JWT Token
userSchema.methods.generateToken = function() {
    return jwt.sign(
        {
            userID: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.TOKEN_KEY_VALUE,
        { expiresIn: "30d" } // Token valid for 30 days
    );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
