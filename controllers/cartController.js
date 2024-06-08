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
            return res.status(404).json({ message: "User not found" });
        }
        if (user.isDeleted == true) {
            return res.status(400).json({ message: "Your account is suspended" })
        }
        const product = await Product.findById(productid);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        let cartItem = await cart.findOne({ userId: user._id, productId: product._id });
        if (cartItem) {
            return res.status(200).json({ message: "Product already added in the cart" })
        } else {
            cartItem = await cart.create({
                userId: user._id,
                productId: product._id,
                quantity: 1
            });
            user.cart.push(cartItem._id);
            await user.save()
            return res.status(200).json({ message: "Product has been successfully added to your cart." });
        }
    } catch (error) {
        return next(error);
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
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.cart || user.cart.length === 0) {
            return res.status(200).json({ message: "Cart is empty" });
        }
        return res.status(200).json(user.cart);
    } catch (error) {
        return next(error)
    }
};

// Remove a cart

export const removecart = async (req, res, next) => {
    try {
        const userid = req.params.userid;
        const productid = req.params.productid;

        const user = await User.findById(userid)
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const product = await Product.findById(productid);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        const cartitem = await cart.findOneAndDelete({ userId: user._id, productId: product._id });
        if (!cartitem) {
            return res.status(404).json({ message: "product not found in the cart" })
        }
        const cartItemIndex = await user.cart.findIndex(item => item.equals(cartitem._id));
        if (cartItemIndex !== -1) {
            user.cart.splice(cartItemIndex, 1)
            await user.save();
        }
        return res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
        return next(error);
    };
};

// Quantity Increment in the cart

export const incrementItemQuantity = async (req, res, next) => {
    try {
        const userid = req.params.userid;
        const productid = req.params.productid;
        const { ItemQuantity } = req.body;

        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const product = await Product.findById(productid);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const Item = await cart.findOne({ userId: user._id, productId: product._id });
        if (Item) {
            Item.quantity += ItemQuantity;
            await Item.save();
            return res.status(200).json({ message: "Quantity Incremented" });
        } else {
            return res.status(404).json({ message: "product not found in the cart" });
        }

    } catch (error) {
        return next(error)
    }
};

// Quantity decrement in the cart

export const decrementItemQuantity = async (req, res, next) => {
    try {
        const userid = req.params.userid;
        const productid = req.params.productid;
        const { ItemQuantity } = req.body;

        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const product = await Product.findById(productid);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        const Item = await cart.findOne({ userId: user._id, productId: product._id });
        if (Item) {
            Item.quantity -= ItemQuantity;
            await Item.save();
            return res.status(200).json({ message: "Quantity decremented" });
        } else {
            return res.status(404).json({ message: "product not found in the cart" });
        }

    } catch (error) {
        return next(error);
    }
};