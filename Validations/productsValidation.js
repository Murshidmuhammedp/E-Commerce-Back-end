import Joi from "joi";

const productJoi = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(1),
    category: Joi.string().required()
});

export default productJoi;