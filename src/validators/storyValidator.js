import Joi from "joi"

export const storySchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    mood: Joi.string().max(10).required(),
    is_anonymous: Joi.boolean()
})
