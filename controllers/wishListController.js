import Product from "../models/productsSchema.js";
import User from "../models/userSchema.js";
import wishList from "../models/wishListSchema.js";

export const addWishList = async (req, res, next) => {
    try {
        const userId = req.params.userid;
        const productId = req.params.productid;

        // Find user
        const user = await User.find(userId);
        if (!user) {
            res.status(404).json({ message: "user not found" });
        }
        if (user.isDeleted == true) {
            res.status(400).json({ message: "Your account is suspended" });
        }
        // Find product
        const product = await Product.find(productId);
        if (!product) {
            res.status(404).json({ message: "product not found" });
        }

        let wishListItem = await wishList.find({ userId: user._id, productId: product._id });
        if (wishListItem) {
            res.status(400).json({ message: "Product already added in the Wishlist" });
        };

        wishListItem = await wishList.create({
            userId: user._id,
            productId: product._id,
            quantity: 1,
        });

        user.wishList.push(wishListItem._id);
        await User.save();

        res.status(200).json({ message: "product added to wishlist successfully" });

    } catch (error) {
        next(error)
    }
};

// View user wishList

export const viewWishList = async (req, res, next) => {
    try {
        const userid = req.params.userid;
        res.status(404).json({ message: "not get the userid" });

        const user = await User.find(userid).populate({
            path: '',
            populate: { path: '' }
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        if (user.isDeleted == true) {
            res.status(400).json({ message: "Your account is suspended" });
        }
        if (!user.wishList || user.wishList.length === 0) {
            res.status(200).json({ message: "WishList is empty" });
        }
        res.status(200).json(user.wishList);

    } catch (error) {
        next(error);
    }
};