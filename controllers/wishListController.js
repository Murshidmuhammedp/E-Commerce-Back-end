import Product from "../models/productsSchema";
import User from "../models/userSchema";
import wishList from "../models/wishListSchema";

export const addWishList = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;

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
        if(wishListItem){
            res.status(400).json({ message: "Product already added in the Wishlist" });
        };
        


    } catch (error) {
        next(error)
    }
};