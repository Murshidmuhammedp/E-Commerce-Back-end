import Product from "../models/productsSchema.js";

// View all the products
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

// View the products by category

export const categoryWise = async (req, res, next) => {
    try {

        const category = req.params.category;

        if (!category) {
            res.status(404).json({ message: "category not found" });
        }

        const categories = await Product.find({
            $or: [
                { title: { $regex: new RegExp(category, "i") } },
                { category: { $regex: new RegExp(category, "i") } }
            ]
        });

        if (categories.length==0) {
            res.status(404).json({ message: "products not found" });
        }
        res.status(200).json({ message: "successfully fetched categories", data: categories });

    } catch (error) {
        return next(error)
    }
};