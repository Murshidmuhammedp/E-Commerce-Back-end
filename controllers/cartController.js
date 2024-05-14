import cart from "../models/cartSchema.js";
import Product from "../models/productsSchema.js";
import User from "../models/userSchema.js";

// Add cart
export const addCart = async (req, res, next) => {
    try {
        const userid = req.params.userid;
        const productid = req.params.productid;

        const user = await User.findById(userid);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        if (user.isDeleted == true) {
            res.status(400).json({ message: "Your account is suspended" })
        }
        const product = await Product.findById(productid);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }
        let cartItem = await cart.findOne({ userId: user._id, productId: product._id });
        if (cartItem) {
            res.status(404).json({ message: "Product already added in the cart" })
        } else {
            cartItem = await cart.create({
                userId: user._id,
                productId: product._id,
                quantity: 1
            });
            user.cart.push(cartItem._id);
            await user.save()
            res.status(200).json({ message: "product added to cart successfully" });
        }
    } catch (error) {
        next(error);
    }
};

// View the user cart
export const viewcart = async (req, res, next) => {
    try {
        const id = req.params.userid;
        const user = await User.findById(id).populate({
            path: 'cart',
            populate: { path: 'productId' }
        })
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        if (!user.cart || user.cart.length === 0) {
            res.status(200).json({ message: "Cart is empty" });
        }
        res.status(200).json(user.cart);
    } catch (error) {
        next(error)
    }
};
