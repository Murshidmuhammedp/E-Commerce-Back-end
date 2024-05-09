import express from "express"
import { signup } from "../controllers/userController.js";
import uploadimage from "../middlewares/uploadImage.js";
const router = express.Router();

router.post("/register", uploadimage, signup);

export default router;