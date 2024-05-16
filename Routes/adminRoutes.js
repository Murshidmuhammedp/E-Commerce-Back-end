import express from "express";
import { allProductView, createProduct, removeProduct, specificProduct, viewcategorywise } from "../controllers/adminProductController.js";
import uploadImage from "../middlewares/uploadImage.js";
const router = express.Router();

// Product controller

router.post('/addproducts', uploadImage, createProduct);
router.get('/viewproducts', allProductView);
router.get('/viewproduct/:id', specificProduct);
router.get('/viewproducts/:category', viewcategorywise);
router.delete('/removeproduct/:id', removeProduct);

export default router;