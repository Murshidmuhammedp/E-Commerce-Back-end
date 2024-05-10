import express from "express"
import { login, signup } from "../controllers/userController.js";
import uploadImage from "../middlewares/uploadImage.js";
const router = express.Router();

router.post("/register", uploadImage, signup);
router.post("/login", login)

export default router;