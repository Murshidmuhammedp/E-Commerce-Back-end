import userjoi from "../Validations/joiUserValidation.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
    try {

        // Validate the incoming request using the Joi schema

        const { value, error } = userjoi.validate(req.body);

        // Handle validation error

        if (error) {
            return res.status(400).json({ Details: error })
        }

        // extract data

        const { username, email, profileImg, password } = value;

        // Check if user already exists 

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash Password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save it to the database

        const newUser = new User({
            username,
            email,
            profileImg: req.cloudinaryImageUrl,
            password: hashedPassword
        });

        //  Save the new user

        await newUser.save();

        // Successfully created the user

        return res.status(201).json({ message: "user created successfully", data: newUser });
    } catch (error) {
        res.status(422).json({ message: "validation error", Details: error })

        next(error);
    };
};


// user login

export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        // Using findOne to get a single user document

        const validUser = await User.findOne({ email });
        if (!validUser) {
            res.status(404).json({ message: "User not found" });
        }

        //Check if the account is blocked

        if (validUser.isDeleted == true) {
            res.status(400).json({ message: "Your account is suspended" });
        }

        // Compare the provided password with the hashed password

        const isValid = bcrypt.compareSync(password, validUser.password);
        if (!isValid) {
            res.status(401).json({ message: "Password incorrect" });
        }

        // JWT setting

        const token = Jwt.sign({ id: validUser._id }, process.env.USER_JWT_SECRET_KEY);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 60 * 1000);

        // cookie setting 
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate });
        res.status(200).json({ message: "successfully login", data: rest });
    } catch (error) {
        next(error);
    }

};