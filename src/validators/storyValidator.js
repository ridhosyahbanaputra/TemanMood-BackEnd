import Joi from "joi"

const storySchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    mood: Joi.string().max(10).required(),
    is_anonymous: Joi.boolean()
})

export default storySchema ;