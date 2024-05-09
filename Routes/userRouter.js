import express from "express"
import { login, signup } from "../controllers/userController.js";
import uploadimage from "../middlewares/uploadImage.js";
const router = express.Router();

router.post("/register", uploadimage, signup);
router.post("/login", login)

export default router;