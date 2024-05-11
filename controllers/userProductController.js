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

