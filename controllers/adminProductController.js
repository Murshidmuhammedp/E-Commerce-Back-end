import productJoi from "../Validations/productsValidation.js";
import Product from "../models/productsSchema.js";

// Create Product
export const createProduct = async (req, res, next) => {
    try {
        const values =req.body
        // const values =await productJoi.validate(req.body);

        // if (values.error) {
        //     return res.status(400).json({ message: "Validation failed", details: error.details });
        // }
        
        const newProduct = new Product({
            title:values.title,
            description:values.description,
            price:values.price,
            productImage: req.cloudinaryImageUrl,
            category:values.category
        });
        await newProduct.save();
        res.status(201).json({ message: "product added successfully" });

    } catch (error) {
        return next(error);
    }
};

// View all products
