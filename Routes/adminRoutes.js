import express from "express";
import { createProduct } from "../controllers/adminProductController.js";
import uploadImage from "../middlewares/uploadImage.js";
const router = express.Router();

router.post('/addproducts', createProduct, uploadImage);

export default router;