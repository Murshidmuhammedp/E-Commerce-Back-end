import express from "express";
import { allProductView, createProduct, removeProduct, specificProduct, viewcategorywise } from "../controllers/adminProductController.js";
import uploadImage from "../middlewares/uploadImage.js";
import { viewUserNameWise, viewalluser, viewspecificuser } from "../controllers/adminUserController.js";
const router = express.Router();

// Product controller

router.post('/addproducts', uploadImage, createProduct);
router.get('/viewproducts', allProductView);
router.get('/viewproduct/:id', specificProduct);
router.get('/viewproducts/:category', viewcategorywise);
router.delete('/removeproduct/:id', removeProduct);

// User controller

router.get('/usersdata', viewalluser);
router.get('/userdata/:id', viewspecificuser);
router.get('/username/:name', viewUserNameWise);

export default router;