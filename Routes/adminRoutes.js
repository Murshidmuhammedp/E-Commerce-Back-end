import express from "express";
import { allProductView, createProduct, removeProduct, specificProduct } from "../controllers/adminProductController.js";
import uploadImage from "../middlewares/uploadImage.js";
const router = express.Router();

router.post('/addproducts', uploadImage, createProduct);
router.get('/viewproducts', allProductView);
router.get('/viewproduct/:id', specificProduct);
router.delete('/removeproduct/:id', removeProduct);

export default router;