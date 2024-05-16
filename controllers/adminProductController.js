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
            res.status(404).json({ message: "products not found" });
        }
        res.status(200).json({ message: "successfully fetched categories", data: product });

    } catch (error) {
        next(error);
    }
};

// Update product

export const updateproduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
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
        res.status(200).json({ message: "updated successfully" });

    } catch (error) {
        return next(error);
    }
};

// Delete  product

export const removeProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "successfully deleted product" });

    } catch (error) {
        return next(error);
    }
};



