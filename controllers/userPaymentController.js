import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../models/userSchema.js";
import Orders from "../models/orderSchema.js";
dotenv.config();
const stripeInstance = Stripe(process.env.STRIPE_KEY);

let Svalue = {};

export const userPayment = async (req, res, next) => {
    try {
        const userid = req.params.id;
        const user = await User.findById(userid).populate({
            path: "cart",
            populate: {
                path: "productId"
            }
        });
        if (!user || user.length === 0) {
            res.status(404).json({ message: "user not found" });
        }
        const usercart = user.cart;

        if (usercart.length === 0) {
            res.status(404).json({ message: "Cart is empty" });
        }
        let totalamount = 0;
        let totalquantity = 0;

        const totals = usercart.map((item) => {
            totalamount += item.productId.price * item.quantity;
            totalquantity += item.quantity;
            return {
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: item.productId.title,
                        description: item.productId.description
                    },
                    unit_amount: Math.round(item.productId.price * 100),
                },
                quantity: item.quantity,
            };
        });

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_type: ["card"],
            line_items: totals,
            mode: "payment",
            success_url: "http://example.com/success",
            cancel_url: "http://example.com/cancel",
        });

        if (!session) {
            res.status(500).json({ message: "Error occurred while creating session" });
        }

        Svalue = {
            userId,
            user,
            session,
        };
        res.status(200).json({
            message: "Stripe payment session created successfully",
            url: success.url, totalamount, totalquantity,
        });
    } catch (error) {
        console.error("error:", error);
        next(error)
    }
};

// Payment success

export const success = async (req, res, next) => {
    try {
        const { userId, user, session } = Svalue;

        const cartItems = user.cart;
        const productItems = cartItems.map((item) => item.productId._id.toString());

        const order = await Orders.create({
            userId: userId,
            ProductId: productItems,
            orderId: session.id,
            totalPrice: session.amount_total / 100,
            paymentId: `demo ${Date.now()}`,
        });

        const orderId = order._id;
        const userUpdate = await User.findOneAndUpdate(
            { _id: userId },
            {
                $push: { Orders: orderId },
                $set: { cart: [] },
            },
            { new: true }
        );

        if (!userUpdate) {
            res.status(500).json({ message: "Failed to update user data" });
        }
        await User.deleteMany({ _id: { $in: cartItems.map(item => item._id) } });
        res.status(200).json({ message: "Payment successful" });

    } catch (error) {
        console.error("error:", error);
        next(error)
    }
};

// Payment cancel

export const cancel = async (req, res, next) => {
    res.status(204).json({ message: "payment canceled" })
};