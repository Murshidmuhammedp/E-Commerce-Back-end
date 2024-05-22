import express from "express";
import { allProductView, createProduct, removeProduct, specificProduct, updateproduct, viewcategorywise } from "../controllers/adminProductController.js";
import uploadImage from "../middlewares/uploadImage.js";
import { adminLogin, userBlockandUnblock, viewUserNameWise, viewalluser, viewspecificuser } from "../controllers/adminUserController.js";
const router = express.Router();

// router.use()

// Admin Login
router.post('/login', adminLogin);

// Product controller

router.post('/addproducts', uploadImage, createProduct);
router.get('/viewproducts', allProductView);
router.get('/viewproduct/:id', specificProduct);
router.get('/viewproducts/:category', viewcategorywise);
router.patch('/updateproduct/:id', updateproduct);
router.delete('/removeproduct/:id', removeProduct);

// User controller

router.get('/usersdata', viewalluser);
router.get('/userdata/:id', viewspecificuser);
router.get('/username/:name', viewUserNameWise);
router.patch('/user/B&U/:id', userBlockandUnblock);

export default router;