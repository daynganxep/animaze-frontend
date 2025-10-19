import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email không được để trống",
            "string.email": "Email không hợp lệ",
            "any.required": "Email là trường bắt buộc",
        }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "any.required": "Mật khẩu là trường bắt buộc",
    }),
});

export const registerSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email không được để trống",
            "string.email": "Email không hợp lệ",
            "any.required": "Email là trường bắt buộc",
        }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "any.required": "Mật khẩu là trường bắt buộc",
    }),
});

export const forgotPasswordStep1Schema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email không được để trống",
            "string.email": "Email không hợp lệ",
            "any.required": "Email là trường bắt buộc",
        }),
});

export const forgotPasswordStep2Schema = Joi.object({
    code: Joi.string().required().min(6).max(6).messages({
        "string.empty": "Mã xác nhận không được để trống",
        "string.min": "Mã xác nhận phải có đủ 6 ký tự",
        "string.max": "Mã xác nhận chỉ được 6 ký tự",
        "any.required": "Mã xác nhận là trường bắt buộc",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Mật khẩu mới không được để trống",
        "string.min": "Mật khẩu mới phải có ít nhất {#limit} ký tự",
        "any.required": "Mật khẩu mới là trường bắt buộc",
    }),
    confirmNewPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "string.empty": "Xác nhận mật khẩu không được để trống",
            "any.only": "Xác nhận mật khẩu không khớp",
            "any.required": "Xác nhận mật khẩu là trường bắt buộc",
        }),
});
