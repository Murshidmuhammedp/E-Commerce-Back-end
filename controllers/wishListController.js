import Product from "../models/productsSchema.js";
import User from "../models/userSchema.js";
import wishList from "../models/wishListSchema.js";

// Add wishlist
export const addWishList = async (req, res, next) => {
    try {
        const userId = req.params.userid;
        const productId = req.params.productid;

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // Find product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }

        let wishListItem = await wishList.findOne({ userId: user._id, productId: product._id });
        if (wishListItem) {
            return res.status(400).json({ message: "Product already added in the Wishlist" });
        } else {
            wishListItem = await wishList.create({
                userId: user._id,
                productId: product._id,
                quantity: 1,
            });
            user.wishList.push(wishListItem._id);
            await user.save();
            return res.status(200).json({ message: "product added to wishlist successfully" });
        }
    } catch (error) {
        return next(error)
    }
};

// View user wishList

export const viewWishList = async (req, res, next) => {
    try {
        const userid = req.params.userid;
        if (!userid) {
            return res.status(404).json({ message: "not get the userid" });
        }

        const user = await User.findById(userid).populate({
            path: 'wishList',
            populate: { path: 'productId' }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isDeleted == true) {
            return res.status(400).json({ message: "Your account is suspended" });
        }
        if (!user.wishList || user.wishList.length === 0) {
            return res.status(200).json({ message: "WishList is empty" });
        }
        return res.status(200).json(user.wishList);

    } catch (error) {
        return next(error);
    }
};

// Remove Wishlist items

export const removeWishlist = async (req, res, next) => {
    try {
        const userid = req.params.userid;
        const productid = req.params.productid;

        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        const product = await Product.findById(productid);

        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }

        const updatedWishList = await wishList.findOneAndDelete({ userId: user._id, productId: product._id });
        if (!updatedWishList) {
            return res.status(404).json({ message: "product not found in the wishlist" });
        }
        const wishlistItemIndex = await user.wishList.findIndex(item => item.equals(updatedWishList._id));

        if (wishlistItemIndex !== -1) {
            user.wishList.splice(wishlistItemIndex, 1);
            await user.save();
        }
        return res.status(200).json({ message: "Product removed successfully" });


    } catch (error) {
        return next(error)
    }
};