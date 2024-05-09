import Joi from "joi";

const userjoi = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    profileImg: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});
export default userjoi;
