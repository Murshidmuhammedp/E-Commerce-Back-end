import express from "express";
import { allProductView, categoryWise, specificProduct } from "../controllers/userProductController.js";
import { addWishList, removeWishlist, viewWishList } from "../controllers/wishListController.js";
import { addCart } from "../controllers/cartController.js";

const router = express.Router();


// Products routes
router.get('/products', allProductView);
router.get('/products/:id', specificProduct);
router.get('/products/category/:category', categoryWise);

// Cart routes
router.post('/:userid/cart/:productid', addCart);

// WishList routes
router.post('/:userid/wishlist/:productid', addWishList);
router.get('/wishlist/:userid', viewWishList);
router.delete('/:userid/wishlist/:productid/remove', removeWishlist);

export default router;