import express from "express";
import { allProductView, categoryWise, specificProduct } from "../controllers/userProductController.js";

const router = express.Router();


// Products routes
router.get('/products', allProductView);
router.get('/products/:id', specificProduct);
router.get('/products/category/:category', categoryWise);

export default router;
