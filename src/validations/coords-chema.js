import { MAX_ZOOM, MIN_VISIBLE_ZOOM } from "@/configs/const.config";
import { WORLD_DIMENSION } from "@/configs/env.config";
import Joi from "joi";

export const coordsSchema = Joi.object({
    z: Joi.number().min(MIN_VISIBLE_ZOOM).max(MAX_ZOOM),
    x: Joi.number().integer().min(0).max(WORLD_DIMENSION),
    y: Joi.number().integer().min(0).max(WORLD_DIMENSION),
});