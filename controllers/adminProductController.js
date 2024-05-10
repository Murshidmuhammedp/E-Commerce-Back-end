import productJoi from "../Validations/productsValidation.js";
import Product from "../models/productsSchema.js";

// Create Product
export const createProduct = async (req, res, next) => {
    try {
        const { values, error } = productJoi.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation failed", details: error.details });
        }
        console.log(req.body,"end");

        const { title, description, price, productImage, category } = req.body;
        const newProduct = new Product({
            title,
            description,
            price,
            productImage: req.cloudinaryImageUrl,
            category
        });
        await newProduct.save();

        res.status(201).json({ message: "product added successfully" });

    } catch (error) {
        return next(error);
    }
};

// View all products

