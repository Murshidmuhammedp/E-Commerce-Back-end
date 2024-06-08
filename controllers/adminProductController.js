import productJoi from "../Validations/productsValidation.js";
import Product from "../models/productsSchema.js";

// Create Product

export const createProduct = async (req, res, next) => {
    try {
        const values = await productJoi.validateAsync(req.body);

        const newProduct = new Product({
            title: values.title,
            description: values.description,
            price: values.price,
            productImage: req.cloudinaryImageUrl,
            category: values.category
        });
        await newProduct.save();
        return res.status(200).json({ message: "product added successfully" });

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
        return res.status(200).json({ message: "successfully fetched products", data: products });
    } catch (error) {
        return next(error)
    }
};

// View a specific product by Id

export const specificProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(404).json({ message: "ID not found" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "successfully fetched product", data: product });

    } catch (error) {
        return next(error);
    }
};

// View the product by category

export const viewcategorywise = async (req, res, next) => {
    try {

        const name = req.params.category;

        const product = await Product.find({
            $or: [
                { title: { $regex: new RegExp(name, "i") } },
                { category: { $regex: new RegExp(name, "i") } }
            ]
        });
        if (product.length == 0) {
            return res.status(404).json({ message: "products not found" });
        }
        return res.status(200).json({ message: "successfully fetched categories", data: product });

    } catch (error) {
        return next(error);
    }
};

// Update product

export const updateproduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const { title, description, price, category } = req.body;

        if (title) {
            product.title = title
        };
        if (description) {
            product.description = description
        };
        if (price) {
            product.price = price
        };
        if (req.cloudinaryImageUrl) {
            product.productImage = req.cloudinaryImageUrl
        };
        if (category) {
            product.category = category
        };

        await product.save();
        return res.status(200).json({ message: "updated successfully" });

    } catch (error) {
        return next(error);
    }
};

// Delete  product

export const removeProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        await Product.findByIdAndDelete(id);

        return res.status(200).json({ message: "successfully deleted product" });

    } catch (error) {
        return next(error);
    }
};



