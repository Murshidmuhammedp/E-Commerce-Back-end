import Product from "../models/productsSchema";

// View the products
export const productView = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products) {
            res.status(404).json({ message: "Products not found" });
        }
        res.status(200).json({ message: "successfully fetched products", data: products });
    } catch (error) {
        next(error)
    }
};

// View a specific product

export const specificProduct = async (req, res) => {
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
        next(error)
    }
};

// View the products by category

export const categoryWise = async (req, res) => {
    try {
        const category = req.params.category;
        if (!category) {
            res.status(404).json({ message: "category not found" });
        }
        const categories = await Product.find(category);
        if (!categories) {
            res.status(404).json({ message: "category wise not found" });
        }
        res.status(200).json({ message: "successfully fetched categories", data: categories });
        
    } catch (error) {
        next(error)
    }
};