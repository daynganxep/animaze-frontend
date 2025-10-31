import Joi from "joi";
import { FRAMES_COUNT, WORLD_DIMENSION } from "@/configs/env.config";

export const importPixelsSchema = Joi.object({
    x: Joi.number().integer().min(0).max(WORLD_DIMENSION).required().messages({
        "number.base": "Tọa độ X phải là một số",
        "number.min": "Tọa độ X không được nhỏ hơn 0",
        "number.max": `Tọa độ X không được lớn hơn ${WORLD_DIMENSION}`,
        "any.required": "Tọa độ X là bắt buộc",
    }),
    y: Joi.number().integer().min(0).max(WORLD_DIMENSION).required().messages({
        "number.base": "Tọa độ Y phải là một số",
        "number.min": "Tọa độ Y không được nhỏ hơn 0",
        "number.max": `Tọa độ Y không được lớn hơn ${WORLD_DIMENSION}`,
        "any.required": "Tọa độ Y là bắt buộc",
    }),
    f: Joi.number().integer().min(0).max(FRAMES_COUNT - 1).required(),
    file: Joi.any().required().invalid(null).messages({
        "any.required": "Vui lòng chọn một tệp",
    }),
});
