import Joi from "joi";

export const createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number().required(),
})

export const updateProductSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number(),
})