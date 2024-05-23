import Jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export const admintoken = (req, res, next) => {
    try {
        const token = req.header["authorization"];

        if (!token) {
            res.status(403).json({ message: "Token is not provided" });
        }

        Jwt.verify(token, process.env.ADMIN_JWT_SECRET_KEY, (err, decode) => {
            if (err) {
                res.status(401).json({ message: "Unauthorized" });
            }
            req.email = decode.email;
            next();
        });
    } catch (error) {
        return next(error)
    }
};