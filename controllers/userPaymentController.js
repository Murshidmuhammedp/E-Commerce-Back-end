import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../models/userSchema.js";
dotenv.config();
const stripeInstance = Stripe(process.env.STRIPE_KEY);

export const userPayment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate({
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
            success_url:
                cancel_url:
        });

        if (!session) {
            res.status(500).json({ message: "Error occurred while creating session" });
        }



        
    } catch (error) {
        next(error)
    }
};