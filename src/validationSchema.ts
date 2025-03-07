import Joi from "joi"

export const userCreateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

export const idSchema = Joi.object({
    id: Joi.number().integer().positive().required()
})

export const userSchema = Joi.object().keys({
    id: Joi.number().integer().positive(),
    email: Joi.string().email()
}).or('id', 'email')

export const addressSchema = Joi.object({
    houseNumber: Joi.string()
        .pattern(/^\d+(\/\d+)?$/)
        .allow(null),
    street: Joi.string()
        .pattern(/^[a-zA-Z0-9\s\-,.]+$/)
        .allow(null),
    area: Joi.string()
        .allow(null),
    city: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .allow(null),
    country: Joi.string()
        .pattern(/^[a-zA-Z]+$/)
        .allow(null),
    pincode: Joi.string()
        .pattern(/^\d+$/)
        .allow(null)
})