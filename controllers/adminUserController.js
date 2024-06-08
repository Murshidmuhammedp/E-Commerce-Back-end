import Jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import dotenv from "dotenv";
dotenv.config();

// Admin Login

export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = Jwt.sign({ email }, process.env.ADMIN_JWT_SECRET_KEY);

            res.cookie('access_token', token, { httpOnly: true })
                .status(200).json({ message: "admin login successfully", token });

        } else {
            return res.status(404).json({ message: "Unauthorized" });
        }

    } catch (error) {
        return next(error);
    }
};

// view all user's data
export const viewalluser = async (req, res, next) => {
    try {

        const user = await User.find();

        if (!user || user.length == 0) {
            return res.status(404).json({ message: "User's not found" });
        }
        return res.status(200).json({ message: "successfully fetched user's data", data: user });
    } catch (error) {
        return next(error);
    }
};

// View a specific user data by ID

export const viewspecificuser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "successfully fetched user data", data: user });
    } catch (error) {
        return next(error);
    }
};

// view a user data by name

export const viewUserNameWise = async (req, res, next) => {
    try {

        const name = req.params.name;

        const user = await User.find({
            username: { $regex: new RegExp(name, "i") }
        });
        if (user.length == 0) {
            return res.status(404).json({ message: "User's not found" });
        }
        return res.status(200).json({ message: "successfully fetched user data", data: user });

    } catch (error) {
        return next(error);
    }
};

// User block and unblock

export const userBlockandUnblock = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        if (user.isDeleted == false) {
            (user.isDeleted = true);
            await user.save();
            return res.status(200).json({ message: "Blocked!!" })
        } else {
            (user.isDeleted = false);
            await user.save();
            return res.status(200).json({ message: "Unblocked!!" });
        }

    } catch (error) {
        return next(error);
    }
};