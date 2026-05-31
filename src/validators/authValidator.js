import Joi from 'joi'

const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(8).max(100).required(),
}).unknown(false)

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required(),
}).unknown(false)

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
}).unknown(false)

export { registerSchema, loginSchema, refreshTokenSchema }