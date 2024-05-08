import Joi from "joi"

const userjoi = Joi.object({
    username: Joi.string(),
    image: Joi.string(),
    email: Joi.string(),
    password: Joi.string()
})

export default userjoi;