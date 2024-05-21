import express from "express";
import { allProductView, categoryWise, specificProduct } from "../controllers/userProductController.js";
import { addWishList, removeWishlist, viewWishList } from "../controllers/wishListController.js";
import { addCart, decrementItemQuantity, incrementItemQuantity, removecart, viewcart } from "../controllers/cartController.js";
import { usertoken } from "../middlewares/userJwtToken.js";
import { userPayment } from "../controllers/userPaymentController.js";

const router = express.Router();

// router.use(usertoken);

// Products routes
router.get('/products', allProductView);
router.get('/products/:id', specificProduct);
router.get('/products/category/:category', categoryWise);

// Cart routes
router.post('/:userid/cart/:productid', addCart);
router.get('/cart/:userid', viewcart);
router.delete('/:userid/cart/:productid/remove', removecart);
router.post('/:userid/cart/:productid/increment', incrementItemQuantity);
router.post('/:userid/cart/:productid/decrement', decrementItemQuantity);

// WishList routes
router.post('/:userid/wishlist/:productid', addWishList);
router.get('/wishlist/:userid', viewWishList);
router.delete('/:userid/wishlist/:productid/remove', removeWishlist);

// Payment routes
router.post('/:id/payment', userPayment);

export default router;