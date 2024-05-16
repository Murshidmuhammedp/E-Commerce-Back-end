import User from "../models/userSchema.js";

// view all user's data
export const viewalluser = async (req, res, next) => {
    try {

        const user = await User.find();

        if (!user) {
            res.status(404).json({ message: "User's not found" });
        }
        res.status(200).json({ message: "successfully fetched user's data", data: user });
    } catch (error) {
        next(error);
    }
};