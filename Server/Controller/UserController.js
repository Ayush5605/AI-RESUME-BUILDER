import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Model/User.js";

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// ========================= REGISTER =========================
// POST /api/users/register

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required.",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser._id);

        const user = newUser.toObject();
        delete user.password;

        return res.status(201).json({
            message: "User registered successfully.",
            token,
            user,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// ========================= LOGIN =========================
// POST /api/users/login

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required.",
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid email or password.",
            });
        }

        // If comparePassword exists in your schema
        const isMatch = await existingUser.comparePassword(password);

        // OR use this instead if you don't have comparePassword:
        // const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password.",
            });
        }

        const token = generateToken(existingUser._id);

        const user = existingUser.toObject();
        delete user.password;

        return res.status(200).json({
            message: "Login successful.",
            token,
            user,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// ========================= GET USER =========================
// GET /api/users/data

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        return res.status(200).json({
            user,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};