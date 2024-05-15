import productJoi from "../Validations/productsValidation.js";
import Product from "../models/productsSchema.js";

// Create Product
export const createProduct = async (req, res, next) => {
    try {
        const values = req.body
        // const values =await productJoi.validate(req.body);

        // if (values.error) {
        // return res.status(400).json({ message: "Validation failed", details: error.details });
        // }

        const newProduct = new Product({
            title: values.title,
            description: values.description,
            price: values.price,
            productImage: req.cloudinaryImageUrl,
            category: values.category
        });
        await newProduct.save();
        res.status(201).json({ message: "product added successfully" });

    } catch (error) {
        return next(error);
    }
};

// View all products

export const allProductView = async (req, res, next) => {
    try {
        const products = await Product.find();

        if (!products) {
            res.status(404).json({ message: "Products not found" });
        }
        res.status(200).json({ message: "successfully fetched products", data: products });
    } catch (error) {
        return next(error)
    }
};

// View a specific product by Id

export const specificProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(404).json({ message: "ID not found" });
        }

        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "successfully fetched product", data: product });

    } catch (error) {
        return next(error);
    }
};

// Remove a specific product by Id

export const removeProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "successfully deleted product" });

    } catch (error) {
        return next(error);
    }
};



