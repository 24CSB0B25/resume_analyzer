const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Database:", mongoose.connection.db.databaseName);
        console.log("Checking email:", email);

        const userExists = await User.findOne({ email });

        console.log("Found:", userExists);
        console.log("Type:", typeof userExists);
        console.log("Boolean:", Boolean(userExists));

        console.log("Before if");
        
        if (userExists) {
        return res.status(400).json({
            message: "User already exists",
        });
        }

        console.log("Passed duplicate check");

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Password hashed");

        const user = await User.create({
        name,
        email,
        password: hashedPassword,
        });

        console.log("User created:", user);

        res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        });
    } catch (error) {
        console.log("ERROR:", error);

        res.status(500).json({
        message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

            console.log("Checking email:", email);

    const userExists = await User.findOne({ email });

    console.log("Found:", userExists);

        if (
        userExists &&
        (await bcrypt.compare(password, userExists.password))
        ) {
        const token = jwt.sign(
            {
            id: userExists._id,
            },
            process.env.JWT_SECRET,
            {
            expiresIn: "7d",
            }
        );

        return res.json({
            token,
            user: {
                id: userExists._id,
                name: userExists.name,
                email: userExists.email,
            },
        });
        }

        res.status(401).json({
        message: "Invalid credentials",
        });
    } catch (error) {
        res.status(500).json({
        message: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};