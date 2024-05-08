import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.send("hello user")
})


// DB connecting

mongoose.connect(process.env.db)
    .then(() => console.log("DataBase connected"))
    .catch((error) => console.log(error));

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});