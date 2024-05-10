import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userrouter from "./Routes/userRouter.js";
import bodyParser from "body-parser";
import productrouter from "./Routes/adminRoutes.js"
const app = express();
dotenv.config();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
app.use(express.json());



// User 
app.use("/user/api", userrouter);

// Product
app.use("/admin/api", productrouter);

// DB connecting

mongoose.connect(process.env.db)
    .then(() => console.log("DataBase connected"))
    .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});