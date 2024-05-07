const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config();
const PORT = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.send("hello user")
})


// DB connecting

mongoose.connect(process.env.db)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log(error));

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});