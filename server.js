import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userrouter from "./Routes/userRouter.js";
import adminrouter from "./Routes/adminRoutes.js";
import productrouter from "./Routes/productsRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());


// User 
app.use("/user/api", userrouter);
app.use("/user/api", productrouter);

// Product
app.use("/admin/api", adminrouter);


// DB connecting

mongoose.connect(process.env.db)
    .then(() => console.log("DataBase connected"))
    .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});