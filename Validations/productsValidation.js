import Joi from "joi";

const productJoi = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    // productImage: Joi.string(),
    category: Joi.string()
});

export default productJoi;