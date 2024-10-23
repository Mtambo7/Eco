import Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().default("user"),
    address: Joi.string()
})


export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})