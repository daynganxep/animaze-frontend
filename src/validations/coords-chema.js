import Joi from "joi";

export const coordsSchema = Joi.object({
    z: Joi.number().integer(),
    x: Joi.number().integer(),
    y: Joi.number().integer(),
});