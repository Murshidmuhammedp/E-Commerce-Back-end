import userjoi from "../Validations/joiValidation.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt"

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


