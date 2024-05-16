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

// View a specific user data by ID

export const viewspecificuser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "successfully fetched user data", data: user });
    } catch (error) {
        next(error);
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
            res.status(404).json({ message: "User's not found" });
        }
        res.status(200).json({ message: "successfully fetched user data", data: user });

    } catch (error) {
        next(error);
    }
};

// User block and unblock

export const userBlockandUnblock = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: "user not found" });
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
        next(error);
    }
};