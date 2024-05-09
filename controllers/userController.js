import userjoi from "../Validations/joiValidation.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt"

export const signup = async (req, res, next) => {
    try {

        const { value, error } = userjoi.validate(req.body);
        console.log(value);
        if (error) {
            return res.status(400).json({ Details: error })
        }

        const { username, email, profileImg, password } = value;
        console.log("password ", password);

        //If the user is Already registered 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            profileImg,
            password: hashedPassword
        });
        //  Save the user
        await newUser.save();

        return res.status(201).json({ message: "user created successfully", data: newUser });
    } catch (error) {
        res.status(422).json({ message: "validation error", Details: error })

        next(error);
    };
};

